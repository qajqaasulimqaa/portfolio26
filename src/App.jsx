import { useState } from "react"
import Scene from "./Components/Scene"
import Chat from "./Components/Chat/Chat"

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)  // ← here!

  return (
    <>
      <Scene onPrincessClick={() => setChatOpen(true)} />
      {chatOpen && <Chat onClose={() => setChatOpen(false)} />}
    </>
  )
}