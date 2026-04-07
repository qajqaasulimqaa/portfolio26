import { useState } from "react"
import Scene from "./Components/Scene"
import Chat from "./Components/Chat/Chat"
import BubblePanel from "./Components/Bubbles/BubblePanel"
import { BUBBLE_COUNT } from "./Components/Bubbles/BubbleManager"

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [panel, setPanel] = useState(null) // { title, src }
  const [activeBubbleIndex, setActiveBubbleIndex] = useState(null)

  function handleBubbleClick(title, src, index) {
    setPanel({ title, src })
    setActiveBubbleIndex(index)
  }

  function handlePanelClose() {
    setPanel(null)
    setActiveBubbleIndex(null)
  }

  return (
    <>
      <Scene
        onPrincessClick={() => setChatOpen(true)}
        onBubbleClick={handleBubbleClick}
        activeBubbleIndex={activeBubbleIndex}
      />
      {chatOpen && <Chat onClose={() => setChatOpen(false)} />}
      {panel && (
        <BubblePanel
          title={panel.title}
          src={panel.src}
          onClose={handlePanelClose}
          activeBubbleIndex={activeBubbleIndex}
          totalBubbles={BUBBLE_COUNT}
        />
      )}
    </>
  )
}
