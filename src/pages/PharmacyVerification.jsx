import React, { useState } from 'react'
import { ethers } from 'ethers'
import contractABI from '../utils/contractABI.json'
import { CONTRACT_ADDRESS } from '../utils/config'

const PharmacyVerification = ({ account }) => {
  const [inputId, setInputId] = useState('')
  const [loading, setLoading] = useState(false)
  const [prescription, setPrescription] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setInputId(e.target.value)
    setMessage('')
    setError('')
  }

  const loadPrescription = async (id) => {
    if (!id) return
    if (!window.ethereum) {
      setError('MetaMask not detected')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider)

      const parsedId = Number(id)
      const result = await contract.getPrescription(parsedId)

      // result shape: [id, patientHash, ipfsHash, doctor, timestamp, verified]
      const pres = {
        id: result[0].toString(),
        patientHash: result[1],
        ipfsHash: result[2],
        doctor: result[3],
        timestamp: new Date(Number(result[4]) * 1000).toLocaleString(),
        verified: result[5]
      }

      setPrescription(pres)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to load prescription')
      setPrescription(null)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!prescription) return
    if (!window.ethereum) {
      setError('MetaMask not detected')
      return
    }

    try {
      setLoading(true)
      setError('')
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer)

      const tx = await contract.verifyPrescription(Number(prescription.id))
      await tx.wait()

      setMessage('✅ Prescription verified successfully')
      // reload prescription to update verified flag
      await loadPrescription(prescription.id)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleScanPlaceholder = () => {
    // Placeholder for QR scanning integration; user can paste scanned ID
    alert('QR scanning not implemented in this demo. Please paste the Prescription ID.')
  }

  const handleLoadClick = () => loadPrescription(inputId)

  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: '800px' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>🏪 Pharmacy Verification Portal</h1>
            <p style={{ color: '#6b7280' }}>Verify prescriptions by ID or QR code</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Verify a Prescription</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="form-group">
          <label>Prescription ID</label>
          <input
            type="text"
            placeholder="e.g., 1"
            value={inputId}
            onChange={handleInputChange}
            disabled={loading}
          />
          <small style={{ color: '#6b7280' }}>You can paste the ID from a scanned QR code</small>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button className="btn-primary" onClick={handleLoadClick} disabled={loading || !inputId}>
            {loading ? '⏳ Loading...' : '🔎 Load Prescription'}
          </button>
          <button className="btn-secondary" onClick={handleScanPlaceholder}>
            📷 Scan QR (placeholder)
          </button>
        </div>

        {prescription && (
          <div style={{ marginTop: '20px' }}>
            <h3>Prescription Details</h3>
            <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
              <p><strong>ID:</strong> #{prescription.id}</p>
              <p><strong>Patient Hash:</strong> {prescription.patientHash}</p>
              <p><strong>IPFS Hash:</strong> {prescription.ipfsHash}</p>
              <p><strong>Doctor:</strong> {prescription.doctor}</p>
              <p><strong>Timestamp:</strong> {prescription.timestamp}</p>
              <p><strong>Verified:</strong> {prescription.verified ? 'Yes' : 'No'}</p>
            </div>

            {!prescription.verified && (
              <div style={{ marginTop: '12px' }}>
                <button className="btn-primary" onClick={handleVerify} disabled={loading}>
                  {loading ? '⏳ Verifying...' : '✅ Verify Prescription'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PharmacyVerification
