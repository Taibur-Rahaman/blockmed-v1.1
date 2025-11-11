import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ account, setAccount }) => {
  const navigate = useNavigate()

  const handleDisconnect = () => {
    setAccount(null)
  }

  const handleCreatePrescription = () => {
    navigate('/add-prescription')
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>🏥 BlockMed Dashboard</h1>
            <p style={{ color: '#6b7280' }}>Doctor Portal - Prescription Management</p>
          </div>
          <button className="btn-secondary" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      </div>

      {/* Wallet Info Card */}
      <div className="card">
        <h2>👨‍⚕️ Connected Wallet</h2>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
          borderRadius: '8px',
          color: 'white'
        }}>
          <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
            Doctor Address
          </p>
          <p style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            wordBreak: 'break-all',
            fontFamily: 'monospace'
          }}>
            {account}
          </p>
        </div>
      </div>

      {/* Main Action Card */}
      <div className="card text-center">
        <h2>📝 Prescription Management</h2>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          Create and manage blockchain-secured prescriptions
        </p>
        
        <button 
          className="btn-primary" 
          onClick={handleCreatePrescription}
          style={{ fontSize: '18px', padding: '16px 32px' }}
        >
          ➕ Create New Prescription
        </button>
      </div>

      {/* Features Info */}
      <div className="card">
        <h3>✨ System Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>🔒 Blockchain Secured</h4>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              All prescriptions are immutably stored on the blockchain
            </p>
          </div>
          <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>📱 QR Code Generation</h4>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Instant QR codes for easy prescription sharing
            </p>
          </div>
          <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>✅ Verification System</h4>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Built-in verification for pharmacies and patients
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
