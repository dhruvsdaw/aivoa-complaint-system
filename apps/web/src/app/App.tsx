import { ComplaintCopilot } from '../features/copilot/ComplaintCopilot'
import { ComplaintIntakeForm } from '../features/intake/ComplaintIntakeForm'

export function App() {
  return (
    <main className="app-shell">
      <div className="workspace-layout">
        <ComplaintIntakeForm />
        <ComplaintCopilot />
      </div>
    </main>
  )
}
