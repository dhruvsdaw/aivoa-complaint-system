import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ComplaintIntake = {
  source: string
  customerName: string
  productName: string
  productStrength: string
  batchNumber: string
  manufacturingDate: string
  expiryDate: string
  quantityAffected: string
  quantityUnit: string
  complaintType: string
  complaintDate: string
  description: string
  initialSeverity: string
  priority: string
}

type IntakeState = {
  latestSubmission: ComplaintIntake | null
}

const initialState: IntakeState = {
  latestSubmission: null,
}

const complaintIntakeSlice = createSlice({
  name: 'complaintIntake',
  initialState,
  reducers: {
    complaintSubmitted: (state, action: PayloadAction<ComplaintIntake>) => {
      state.latestSubmission = action.payload
    },
  },
})

export const { complaintSubmitted } = complaintIntakeSlice.actions
export const complaintIntakeReducer = complaintIntakeSlice.reducer
