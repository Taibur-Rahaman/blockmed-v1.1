import React from 'react'

const DoctorManagement = ({ account }) => {
  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: '800px' }}>
      <div className="card">
        <h1>👨‍⚕️ Doctor Management</h1>
        <p style={{ color: '#6b7280' }}>Manage doctor approvals and registrations (placeholder page).</p>
        <p style={{ marginTop: '12px' }}>
          Connected account: {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Not connected'}
        </p>
      </div>
    </div>
  )
}

export default DoctorManagement
