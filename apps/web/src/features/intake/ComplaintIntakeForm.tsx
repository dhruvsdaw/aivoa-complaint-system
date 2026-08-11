import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  complaintSubmitted,
  type ComplaintIntake,
} from './complaintIntakeSlice'
import type { RootState } from '../../app/store'

const emptyIntake: ComplaintIntake = {
  source: 'Email',
  customerName: '',
  productName: '',
  productStrength: '',
  batchNumber: '',
  manufacturingDate: '',
  expiryDate: '',
  quantityAffected: '',
  quantityUnit: 'kg',
  complaintType: '',
  complaintDate: '',
  description: '',
  initialSeverity: '',
  priority: '',
}

export function ComplaintIntakeForm() {
  const dispatch = useDispatch()
  const latestSubmission = useSelector(
    (state: RootState) => state.complaintIntake.latestSubmission,
  )
  const [intake, setIntake] = useState<ComplaintIntake>(emptyIntake)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setIntake((current) => ({ ...current, [name]: value }))
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(complaintSubmitted(intake))
    setHasSubmitted(true)
  }

  return (
    <section className="intake-layout" aria-labelledby="intake-title">
      <header className="page-heading">
        <div>
          <p className="eyebrow">API &amp; FDF Quality Assurance Module</p>
          <h1 id="intake-title">Record a customer complaint</h1>
          <p>Capture and review the complaint before triage and AI assessment.</p>
        </div>
        <span className="status-badge">Pending Triage</span>
      </header>

      {hasSubmitted && latestSubmission && (
        <div className="success-message" role="status">
          Complaint saved locally with a Pending Triage status. Backend submission and AI assessment will be connected next.
        </div>
      )}

      <form className="complaint-form" onSubmit={submitForm}>
        <FormSection title="1. Origin & customer details">
          <Field label="Source" required htmlFor="source">
            <select id="source" name="source" value={intake.source} onChange={updateField} required>
              <option>Email</option>
              <option>Customer portal</option>
              <option>Phone call</option>
              <option>Sales representative</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Customer name" required htmlFor="customerName">
            <input id="customerName" name="customerName" value={intake.customerName} onChange={updateField} required />
          </Field>
        </FormSection>

        <FormSection title="2. Product & batch identification">
          <Field label="Product name" required htmlFor="productName">
            <input id="productName" name="productName" value={intake.productName} onChange={updateField} required />
          </Field>
          <Field label="Product strength/grade" htmlFor="productStrength">
            <input id="productStrength" name="productStrength" value={intake.productStrength} onChange={updateField} />
          </Field>
          <Field label="Batch / lot number" required htmlFor="batchNumber">
            <input id="batchNumber" name="batchNumber" value={intake.batchNumber} onChange={updateField} required />
          </Field>
          <Field label="Manufacturing date" htmlFor="manufacturingDate">
            <input id="manufacturingDate" name="manufacturingDate" type="date" value={intake.manufacturingDate} onChange={updateField} />
          </Field>
          <Field label="Expiry date" htmlFor="expiryDate">
            <input id="expiryDate" name="expiryDate" type="date" value={intake.expiryDate} onChange={updateField} />
          </Field>
          <Field label="Quantity affected" htmlFor="quantityAffected">
            <div className="input-with-unit">
              <input id="quantityAffected" name="quantityAffected" type="number" min="0" step="any" value={intake.quantityAffected} onChange={updateField} />
              <select aria-label="Quantity unit" name="quantityUnit" value={intake.quantityUnit} onChange={updateField}>
                <option>kg</option>
                <option>g</option>
                <option>L</option>
                <option>Units</option>
              </select>
            </div>
          </Field>
        </FormSection>

        <FormSection title="3. Complaint details">
          <Field label="Complaint type" required htmlFor="complaintType">
            <select id="complaintType" name="complaintType" value={intake.complaintType} onChange={updateField} required>
              <option value="" disabled>Select complaint type</option>
              <option>Product quality</option>
              <option>Packaging</option>
              <option>Labelling</option>
              <option>Adverse event</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Complaint date" required htmlFor="complaintDate">
            <input id="complaintDate" name="complaintDate" type="date" value={intake.complaintDate} onChange={updateField} required />
          </Field>
          <Field label="Complaint description" required htmlFor="description" fullWidth>
            <textarea id="description" name="description" rows={6} placeholder="Record the detailed complaint description." value={intake.description} onChange={updateField} required />
          </Field>
        </FormSection>

        <FormSection title="4. Initial assessment & priority">
          <Field label="Initial severity" required htmlFor="initialSeverity">
            <select id="initialSeverity" name="initialSeverity" value={intake.initialSeverity} onChange={updateField} required>
              <option value="" disabled>Select initial severity</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </Field>
          <Field label="Priority" required htmlFor="priority">
            <select id="priority" name="priority" value={intake.priority} onChange={updateField} required>
              <option value="" disabled>Select priority</option>
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </Field>
        </FormSection>

        <div className="form-actions">
          <button type="reset" className="secondary-button" onClick={() => { setIntake(emptyIntake); setHasSubmitted(false) }}>Reset form</button>
          <button type="submit">Save complaint</button>
          <p>Fields marked <span aria-hidden="true">*</span> are required.</p>
        </div>
      </form>
    </section>
  )
}

type FieldProps = {
  label: string
  htmlFor: string
  required?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

function Field({ label, htmlFor, required, fullWidth, children }: FieldProps) {
  return (
    <div className={fullWidth ? 'field field-full' : 'field'}>
      <label htmlFor={htmlFor}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
    </div>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="form-section">
      <legend>{title}</legend>
      <div className="field-grid">{children}</div>
    </fieldset>
  )
}
