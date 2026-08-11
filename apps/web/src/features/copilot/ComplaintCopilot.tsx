import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '../../app/store'
import { messageSent } from './copilotSlice'

export function ComplaintCopilot() {
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.copilot.messages)
  const [draftMessage, setDraftMessage] = useState('')
  const [attachmentNames, setAttachmentNames] = useState<string[]>([])

  function selectAttachments(event: ChangeEvent<HTMLInputElement>) {
    setAttachmentNames(Array.from(event.target.files ?? []).map((file) => file.name))
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = draftMessage.trim()

    if (!content && attachmentNames.length === 0) {
      return
    }

    dispatch(messageSent({
      id: crypto.randomUUID(),
      role: 'user',
      content: content || 'Please extract the complaint information from these attachments.',
      attachmentNames,
    }))
    setDraftMessage('')
    setAttachmentNames([])
    event.currentTarget.reset()
  }

  return (
    <aside className="copilot-panel" aria-labelledby="copilot-title">
      <header className="copilot-header">
        <div>
          <p className="eyebrow">AI assistant</p>
          <h2 id="copilot-title">Complaint Copilot</h2>
        </div>
        <span className="copilot-status">Ready</span>
      </header>

      <div className="chat-history" aria-live="polite" aria-label="Conversation history">
        {messages.map((message) => (
          <article className={`chat-message chat-message-${message.role}`} key={message.id}>
            <p className="message-role">{message.role === 'assistant' ? 'AIVOA Copilot' : 'You'}</p>
            <p>{message.content}</p>
            {message.attachmentNames && message.attachmentNames.length > 0 && (
              <ul className="chat-attachments" aria-label="Attached files">
                {message.attachmentNames.map((name) => <li key={name}>{name}</li>)}
              </ul>
            )}
          </article>
        ))}
      </div>

      <form className="chat-composer" onSubmit={sendMessage}>
        <label className="upload-control" htmlFor="copilot-attachments">
          <span>Attach complaint material</span>
          <small>PDF, email, or image</small>
          <input id="copilot-attachments" type="file" multiple accept=".pdf,.eml,.msg,image/*" onChange={selectAttachments} />
        </label>

        {attachmentNames.length > 0 && (
          <ul className="pending-attachments" aria-label="Selected files">
            {attachmentNames.map((name) => <li key={name}>{name}</li>)}
          </ul>
        )}

        <label className="sr-only" htmlFor="copilot-message">Complaint details</label>
        <textarea
          id="copilot-message"
          rows={4}
          value={draftMessage}
          onChange={(event) => setDraftMessage(event.target.value)}
          placeholder="Paste or type the customer complaint details…"
        />
        <button type="submit">Send to Copilot</button>
      </form>
    </aside>
  )
}
