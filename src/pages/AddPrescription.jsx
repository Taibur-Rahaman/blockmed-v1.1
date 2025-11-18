import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import { QRCodeSVG } from 'qrcode.react'
import contractABI from '../utils/contractABI.json'
import { CONTRACT_ADDRESS } from '../utils/config'

const AddPrescription = ({ account }) => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    patientHash: '',
    ipfsHash: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [prescriptionId, setPrescriptionId] = useState(null)
  const [qrValue, setQrValue] = useState('')
  const qrRef = React.useRef(null)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.patientHash.trim()) {
      setError('Patient hash cannot be empty')
      return false
    }
    if (!formData.ipfsHash.trim()) {
      setError('IPFS hash cannot be empty')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      alert('Please fill all fields')
      return
    }

    // Check MetaMask
    if (!window.ethereum) {
      alert('Please install MetaMask!')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Connect to Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // Create contract instance
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signer
      )

      console.log('Submitting prescription to blockchain...')
      console.log('Patient Hash:', formData.patientHash)
      console.log('IPFS Hash:', formData.ipfsHash)

      // Call smart contract function
      const tx = await contract.addPrescription(
        formData.patientHash,
        formData.ipfsHash
      )

      console.log('Transaction sent:', tx.hash)
      setTxHash(tx.hash)

      // Wait for transaction confirmation
      const receipt = await tx.wait()
      console.log('Transaction confirmed:', receipt)

      // Get prescription ID from the event or contract
      const currentCount = await contract.prescriptionCount()
      const idString = currentCount.toString()
      setPrescriptionId(idString)

      // Generate QR code value (include prescription ID for verification)
      const qrData = JSON.stringify({
        prescriptionId: idString,
        patientHash: formData.patientHash,
        ipfsHash: formData.ipfsHash
      })
      setQrValue(qrData)

      alert('✅ Transaction Successful!\n\nYour prescription has been saved to the blockchain.')

    } catch (err) {
      console.error('Error submitting prescription:', err)
      
      if (err.code === 'ACTION_REJECTED') {
        setError('Transaction rejected by user')
      } else if (err.message.includes('invalid address')) {
        setError('Invalid contract address. Please check configuration.')
      } else {
        setError(err.message || 'Failed to submit prescription')
      }
      
      alert(`❌ Error: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const handleCreateAnother = () => {
    setFormData({ patientHash: '', ipfsHash: '' })
    setTxHash('')
    setPrescriptionId(null)
    setQrValue('')
    setError('')
  }

  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: '800px' }}>
      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>📝 Create New Prescription</h1>
            <p style={{ color: '#6b7280' }}>Doctor: {account?.substring(0, 10)}...{account?.substring(account.length - 4)}</p>
          </div>
          <button className="btn-secondary" onClick={handleBackToDashboard}>
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="card">
        <h2>Prescription Details</h2>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientHash">
              Patient Hash ID <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              id="patientHash"
              name="patientHash"
              value={formData.patientHash}
              onChange={handleInputChange}
              placeholder="e.g., hash123 or patient_0x1234..."
              disabled={isSubmitting || !!txHash}
              required
            />
            <small style={{ color: '#6b7280', fontSize: '13px' }}>
              Unique identifier for the patient
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="ipfsHash">
              IPFS Hash <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              id="ipfsHash"
              name="ipfsHash"
              value={formData.ipfsHash}
              onChange={handleInputChange}
              placeholder="e.g., QmXyz123... or ipfs://QmAbc..."
              disabled={isSubmitting || !!txHash}
              required
            />
            <small style={{ color: '#6b7280', fontSize: '13px' }}>
              IPFS hash of the prescription document
            </small>
          </div>

          {!txHash && (
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%', marginTop: '10px' }}
            >
              {isSubmitting ? '⏳ Submitting to Blockchain...' : '✅ Submit Prescription'}
            </button>
          )}
        </form>

        {/* Transaction Success */}
        {txHash && (
          <div className="alert alert-success mt-20">
            <h3 style={{ color: '#065f46', marginBottom: '10px' }}>✅ Transaction Successful!</h3>
            <p style={{ marginBottom: '8px' }}>
              <strong>Prescription ID:</strong> #{prescriptionId}
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Transaction Hash:</strong>
            </p>
            <p style={{ 
              wordBreak: 'break-all', 
              fontFamily: 'monospace', 
              fontSize: '13px',
              background: '#fff',
              padding: '8px',
              borderRadius: '4px'
            }}>
              {txHash}
            </p>
          </div>
        )}

        {/* QR Code Display */}
        {qrValue && (
          <div className="mt-20">
            <h3 className="text-center">📱 Prescription QR Code</h3>
            <div className="qr-container">
              <div ref={qrRef}>
                <QRCodeSVG 
                  value={qrValue} 
                  size={180}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
            <p className="text-center" style={{ color: '#6b7280', fontSize: '14px', marginTop: '10px' }}>
              Scan this QR code to view prescription details
            </p>
            <div style={{ 
              background: '#f9fafb', 
              padding: '12px', 
              borderRadius: '8px', 
              marginTop: '10px',
              fontSize: '13px',
              wordBreak: 'break-all'
            }}>
              {qrValue}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button
                className="btn-primary"
                onClick={() => {
                  try {
                    const svg = qrRef.current.querySelector('svg')
                    const serializer = new XMLSerializer()
                    const svgStr = serializer.serializeToString(svg)
                    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `prescription_${prescriptionId || 'qr'}.svg`
                    document.body.appendChild(a)
                    a.click()
                    a.remove()
                    URL.revokeObjectURL(url)
                  } catch (e) {
                    alert('Failed to download QR')
                  }
                }}
              >
                ⬇️ Download QR (SVG)
              </button>

              <button
                className="btn-secondary"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(qrValue)
                    alert('QR data copied to clipboard')
                  } catch (e) {
                    alert('Failed to copy QR data')
                  }
                }}
              >
                📋 Copy QR Data
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {txHash && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
              className="btn-primary" 
              onClick={handleCreateAnother}
              style={{ flex: 1 }}
            >
              ➕ Create Another
            </button>
            <button 
              className="btn-secondary" 
              onClick={handleBackToDashboard}
              style={{ flex: 1 }}
            >
              🏠 Back to Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="card">
        <h3>ℹ️ Important Notes</h3>
        <ul style={{ color: '#6b7280', lineHeight: '1.8', marginLeft: '20px' }}>
          <li>Ensure MetaMask is connected to the correct network</li>
          <li>Patient hash should be a unique identifier for privacy</li>
          <li>IPFS hash must contain the actual prescription document</li>
          <li>Transactions are irreversible once confirmed on blockchain</li>
          <li>Save the QR code for patient/pharmacy verification</li>
        </ul>
      </div>
    </div>
  )
}

export default AddPrescription
