import React, { useState, useEffect } from 'react'

const MetaMaskConnect = ({ account, setAccount }) => {
  const [isConnecting, setIsConnecting] = useState(false)

  // Check if MetaMask is already connected on component mount
  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        return
      }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      
      if (accounts.length > 0) {
        setAccount(accounts[0])
        console.log('Connected wallet:', accounts[0])
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
    }
  }

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert('Please install MetaMask!')
        window.open('https://metamask.io/download/', '_blank')
        return
      }

      setIsConnecting(true)

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        console.log('Connected wallet:', accounts[0])
        alert(`✅ Connected successfully!\n\nAddress: ${accounts[0]}`)
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error)
      
      if (error.code === 4001) {
        alert('Connection request rejected. Please try again.')
      } else {
        alert('Failed to connect to MetaMask. Please try again.')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          console.log('Account changed to:', accounts[0])
        } else {
          setAccount(null)
          console.log('Wallet disconnected')
        }
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [setAccount])

  if (account) {
    return (
      <div className="text-center">
        <button className="btn-success" disabled>
          Connected ✅
        </button>
        <p style={{ marginTop: '10px', color: '#059669', fontWeight: '600' }}>
          {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <button 
        className="btn-primary" 
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : '🦊 Connect MetaMask'}
      </button>
      {!window.ethereum && (
        <p style={{ marginTop: '10px', color: '#ef4444', fontSize: '14px' }}>
          MetaMask not detected. Please install MetaMask extension.
        </p>
      )}
    </div>
  )
}

export default MetaMaskConnect
