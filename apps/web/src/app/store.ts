import { configureStore } from '@reduxjs/toolkit'

import { copilotReducer } from '../features/copilot/copilotSlice'
import { complaintIntakeReducer } from '../features/intake/complaintIntakeSlice'

export const store = configureStore({
  reducer: {
    copilot: copilotReducer,
    complaintIntake: complaintIntakeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
