# ⚡ Quick Start Guide - 5 Minutes to Demo

## 🎯 Goal
Get BlockMed running for supervisor demo in under 5 minutes.

---

## Step 1: Install Everything (1 min)
```bash
npm install
```

---

## Step 2: Start Local Blockchain (30 sec)
Open **Terminal 1**:
```bash
npm run blockchain
```

**✅ Success:** You'll see 20 accounts with private keys. Leave this running!

**Copy Account #0 private key** - you'll need it for MetaMask.

---

## Step 3: Deploy Contract (30 sec)
Open **Terminal 2**:
```bash
npm run deploy
```

**✅ Success:** You'll see:
```
✅ BlockMed contract deployed successfully!
📍 Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Copy this address!**

---

## Step 4: Update Config (30 sec)
Edit `src/utils/config.js`:
```javascript
export const CONTRACT_ADDRESS = 'PASTE_YOUR_ADDRESS_HERE'
```

---

## Step 5: Configure MetaMask (1 min)

### Add Network:
- Network Name: **Hardhat Local**
- RPC URL: **http://127.0.0.1:8545**
- Chain ID: **31337**
- Currency: **ETH**

### Import Account:
- Click account icon → **Import Account**
- Paste **Account #0 private key** from Terminal 1

---

## Step 6: Start Frontend (30 sec)
Open **Terminal 3**:
```bash
npm run dev
```

**✅ Success:** Opens browser at http://localhost:3000

---

## Step 7: Test the App! (1 min)

### 7.1 Connect Wallet
1. Click **"Connect MetaMask"**
2. Accept connection
3. See "Connected ✅"

### 7.2 Create Prescription
1. Click **"Create New Prescription"**
2. Enter:
   - Patient Hash: `patient_demo_001`
   - IPFS Hash: `QmDemoHashForSupervisor123`
3. Click **"Submit Prescription"**
4. Confirm in MetaMask
5. Wait for success message

### 7.3 Verify QR Code
- QR code appears automatically
- Scan with phone to verify data

---

## 🎉 You're Ready for Demo!

**Three terminals running:**
1. `npm run blockchain` - Local blockchain
2. (deployment completed)
3. `npm run dev` - Frontend server

**Browser:**
- Connected to MetaMask
- App working at localhost:3000

---

## 🐛 Quick Fixes

**"Please install MetaMask"**
→ Install from https://metamask.io

**"Transaction failed"**
→ Check MetaMask is on "Hardhat Local" network

**"Invalid contract address"**
→ Re-check Step 4, make sure address is correct

**QR not showing**
→ Wait for transaction to confirm (check MetaMask)

---

## 📋 Demo Script

### Opening (10 sec)
*"This is BlockMed - a blockchain prescription system using MetaMask and smart contracts."*

### Connection (20 sec)
- Show connect button
- Click connect
- *"Doctor authenticates via MetaMask wallet"*

### Create Prescription (40 sec)
- Fill form with demo data
- Click submit
- Show MetaMask popup
- *"Transaction goes to blockchain"*
- Confirm and wait
- *"Prescription stored immutably on-chain"*

### Show Results (30 sec)
- Point to transaction hash
- *"This proves blockchain storage"*
- Show QR code
- *"QR contains prescription data"*
- Scan with phone (if possible)

### Closing (20 sec)
*"Next phase: patient portal, pharmacy verification, and blockchain QR validation."*

---

## ✅ Pre-Demo Checklist

- [ ] All three npm commands work
- [ ] MetaMask connected to Hardhat Local
- [ ] Test account has ETH (should show ~10000 ETH)
- [ ] Created at least one test prescription
- [ ] QR code generated successfully
- [ ] No errors in browser console
- [ ] Phone ready to scan QR (optional)

---

**Need help?** Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting.

**You got this! 🚀**
