import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CopilotMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
  attachmentNames?: string[]
}

type CopilotState = {
  messages: CopilotMessage[]
}

const initialState: CopilotState = {
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Share the customer complaint below or attach a PDF/email. I will extract the details for your review.',
    },
  ],
}

const copilotSlice = createSlice({
  name: 'copilot',
  initialState,
  reducers: {
    messageSent: (state, action: PayloadAction<CopilotMessage>) => {
      state.messages.push(action.payload)
    },
  },
})

export const { messageSent } = copilotSlice.actions
export const copilotReducer = copilotSlice.reducer
