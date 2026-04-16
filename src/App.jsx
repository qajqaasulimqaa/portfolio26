import { useState, useRef } from "react"
import Scene from "./Components/Scene"
import Chat from "./Components/Chat/Chat"
import BubblePanel from "./Components/Bubbles/BubblePanel"
import TreeMenu from "./Components/Tree/TreeMenu"
import WelcomeModal from "./Components/WelcomeModal/WelcomeModal"
import { BUBBLE_COUNT } from "./Components/Bubbles/BubbleManager"

export default function App() {
  const [welcomeOpen, setWelcomeOpen] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [panel, setPanel] = useState(null) // { title, src }
  const [activeBubbleIndex, setActiveBubbleIndex] = useState(null)
  const [treeMenuOpen, setTreeMenuOpen] = useState(false)
  const bubbleNavigateRef = useRef(null)
  const treeAboutRef = useRef(null)
  const treeNextRef = useRef(null)
  const resetCameraRef = useRef(null)
  const [showNextBtn, setShowNextBtn] = useState(false)

  function handleBubbleClick(title, src, index, image) {
    setPanel({ title, src, image })
    setActiveBubbleIndex(index)
  }

  function handlePanelClose() {
    setPanel(null)
    setActiveBubbleIndex(null)
  }

  return (
    <>
      {welcomeOpen && <WelcomeModal onClose={() => setWelcomeOpen(false)} />}
      <Scene
        onPrincessClick={() => setChatOpen(true)}
        onBubbleClick={handleBubbleClick}
        onBubbleReady={(fn) => { bubbleNavigateRef.current = fn }}
        activeBubbleIndex={activeBubbleIndex}
        onTreeClick={() => setTreeMenuOpen(true)}
        onTreeReady={(fn) => { treeAboutRef.current = fn }}
        onTreeResetReady={(fn) => { resetCameraRef.current = fn }}
        onTreeNextReady={(fn) => { treeNextRef.current = fn }}
        onFloorClick={() => resetCameraRef.current?.()}
      />
      {treeMenuOpen && (
        <TreeMenu
          onClose={() => setTreeMenuOpen(false)}
          onAbout={() => { setTreeMenuOpen(false); treeAboutRef.current?.(() => setShowNextBtn(true)) }}
          onPortfolio={() => { setTreeMenuOpen(false); bubbleNavigateRef.current?.(0) }}
          onContact={() => { setTreeMenuOpen(false); alert("Contact") }}
        />
      )}
      {showNextBtn && (
        <button
          onClick={() => { treeNextRef.current?.(); setShowNextBtn(false) }}
          style={{
            position: "fixed",
            bottom: 40,
            right: 40,
            zIndex: 200,
            background: "none",
            border: "1px solid #7f5af0",
            borderRadius: 8,
            color: "#c4b5fd",
            fontSize: 15,
            fontFamily: "sans-serif",
            fontWeight: 600,
            padding: "12px 36px",
            cursor: "pointer",
            letterSpacing: 1,
          }}
          onMouseEnter={e => { e.target.style.background = "#7f5af0"; e.target.style.color = "#fff" }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#c4b5fd" }}
        >
          Next →
        </button>
      )}
      {chatOpen && <Chat onClose={() => setChatOpen(false)} />}
      {panel && (
        <BubblePanel
          title={panel.title}
          src={panel.src}
          image={panel.image}
          onClose={handlePanelClose}
          onPrev={() => bubbleNavigateRef.current?.(activeBubbleIndex - 1)}
          onNext={() => bubbleNavigateRef.current?.(activeBubbleIndex + 1)}
          activeBubbleIndex={activeBubbleIndex}
          totalBubbles={BUBBLE_COUNT}
        />
      )}
    </>
  )
}
