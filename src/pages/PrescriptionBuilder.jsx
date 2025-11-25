import React, { useState, useRef } from 'react'
import MedicineSearch from '../components/MedicineSearch'
import { QRCodeSVG } from 'qrcode.react'

const initialPatient = { name: '', dob: '', age: '', gender: '' }

export default function PrescriptionBuilder() {
  const [patient, setPatient] = useState(initialPatient)
  const [symptoms, setSymptoms] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [medicines, setMedicines] = useState([])
  const [tests, setTests] = useState('')
  const [advice, setAdvice] = useState('')
  const [followUp, setFollowUp] = useState('')
  const [qrValue, setQrValue] = useState('')
  const printRef = useRef()

  const handleAddMedicine = (med) => {
    setMedicines(prev => [...prev, med])
  }

  const handleRemoveMedicine = (index) => {
    setMedicines(prev => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = () => {
    const summary = {
      patient,
      symptoms,
      diagnosis,
      medicines,
      tests,
      advice,
      followUp,
      createdAt: new Date().toISOString()
    }
    setQrValue(JSON.stringify(summary))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container" style={{ paddingTop: 30, maxWidth: 1000 }}>
      <div className="card">
        <h1>Modern Prescription Builder</h1>
        <p style={{ color: '#6b7280' }}>Fill patient details, add medicines, tests and generate a QR code or print-ready view.</p>
      </div>

      <div className="card" ref={printRef}>
        <h2>1. Patient Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input placeholder="Name" value={patient.name} onChange={(e)=>setPatient({...patient, name: e.target.value})} />
          <input placeholder="Age or DOB" value={patient.age || patient.dob} onChange={(e)=>setPatient({...patient, age: e.target.value})} />
          <input placeholder="Gender (optional)" value={patient.gender} onChange={(e)=>setPatient({...patient, gender: e.target.value})} />
        </div>

        <h2 style={{ marginTop: 18 }}>2. Symptoms & Diagnosis</h2>
        <textarea placeholder="Symptoms" value={symptoms} onChange={(e)=>setSymptoms(e.target.value)} />
        <textarea placeholder="Diagnosis" value={diagnosis} onChange={(e)=>setDiagnosis(e.target.value)} />

        <h2 style={{ marginTop: 18 }}>3. Medicines</h2>
        <MedicineSearch onAdd={handleAddMedicine} />

        <div style={{ marginTop: 12 }}>
          <h4>Added medicines</h4>
          {medicines.length === 0 && <p style={{ color: '#6b7280' }}>No medicines added yet.</p>}
          <ul>
            {medicines.map((m, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{m.name}</strong> — {m.form} — {m.strength} — {m.dose} — {m.duration}
                    <div style={{ color: '#6b7280', fontSize: 13 }}>{m.generic && `Generic: ${m.generic}`}</div>
                  </div>
                  <div>
                    <button className="btn-secondary" onClick={()=>handleRemoveMedicine(i)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <h2 style={{ marginTop: 18 }}>4. Tests & Advice</h2>
        <input placeholder="Recommended lab tests (comma separated)" value={tests} onChange={(e)=>setTests(e.target.value)} />
        <textarea placeholder="Doctor advice / precaution" value={advice} onChange={(e)=>setAdvice(e.target.value)} />

        <h2 style={{ marginTop: 18 }}>5. Follow-up</h2>
        <input placeholder="Follow-up date or duration" value={followUp} onChange={(e)=>setFollowUp(e.target.value)} />

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn-primary" onClick={handleGenerate}>Generate Prescription & QR</button>
          <button className="btn-secondary" onClick={handlePrint}>Print</button>
        </div>

        {qrValue && (
          <div style={{ marginTop: 18 }}>
            <h3>QR Code</h3>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <QRCodeSVG value={qrValue} size={160} level="H" includeMargin={true} />
              <div style={{ maxWidth: 520, wordBreak: 'break-all', background: '#f9fafb', padding: 10, borderRadius: 8 }}>
                <pre style={{ margin: 0, fontSize: 12 }}>{qrValue}</pre>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <button className="btn-primary" onClick={()=>{navigator.clipboard.writeText(qrValue)}}>Copy QR Data</button>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h3>Print-ready Preview</h3>
        <div style={{ padding: 12, background: '#fff', borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ margin: 0 }}>{patient.name || 'Patient Name'}</h4>
              <div style={{ color: '#6b7280' }}>{patient.age ? `Age: ${patient.age}` : ''} {patient.gender ? ` • ${patient.gender}` : ''}</div>
            </div>
            {qrValue && <QRCodeSVG value={qrValue} size={100} level="H" includeMargin={true} />}
          </div>

          <hr />
          <div>
            <h5>Diagnosis</h5>
            <div style={{ color: '#111' }}>{diagnosis || '-'}</div>
          </div>

          <div style={{ marginTop: 8 }}>
            <h5>Medicines</h5>
            <ol>
              {medicines.map((m, i) => (
                <li key={i}>{m.name} — {m.dose} — {m.duration}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
