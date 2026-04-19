import { useState, useRef } from "react"
import Scene from "./Components/Scene"
import Chat from "./Components/Chat/Chat"
import BubblePanel from "./Components/Bubbles/BubblePanel"
import TreeMenu from "./Components/Tree/TreeMenu"
import NextBtn from "./Components/Tree/NextBtn"
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
  const treeNext2Ref = useRef(null)
  const treeNext3Ref = useRef(null)
  const resetCameraRef = useRef(null)
  const [showNextBtn, setShowNextBtn] = useState(false)
  const [showNext2Btn, setShowNext2Btn] = useState(false)
  const [showNext3Btn, setShowNext3Btn] = useState(false)

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
        onTreeNext2Ready={(fn) => { treeNext2Ref.current = fn }}
        onTreeNext3Ready={(fn) => { treeNext3Ref.current = fn }}
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
        <NextBtn onClick={() => { treeNextRef.current?.(); setShowNextBtn(false); setShowNext2Btn(true) }} />
      )}
      {showNext2Btn && (
        <NextBtn onClick={() => { treeNext2Ref.current?.(); setShowNext2Btn(false); setShowNext3Btn(true) }} />
      )}
      {showNext3Btn && (
        <NextBtn onClick={() => { treeNext3Ref.current?.(); setShowNext3Btn(false) }} />
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
