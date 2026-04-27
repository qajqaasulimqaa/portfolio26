import { useState, useRef } from "react"
import Scene from "./Components/Scene"
import Chat from "./Components/Chat/Chat"
import BubblePanel from "./Components/Bubbles/BubblePanel"
import TreeMenu from "./Components/Tree/TreeMenu"
import NextBtn from "./Components/Tree/NextBtn"
import { BUBBLE_COUNT } from "./Components/Bubbles/BubbleManager"
import WelcomePage from "./Components/WelcomePage"
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
  const treeContactRef = useRef(null)
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
      <style>{`
        @keyframes wiggle {
          0%   { transform: translateX(0); }
          30%  { transform: translateX(12px); }
          70%  { transform: translateX(-12px); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <img
        src="/mouse.svg"
        alt="mouse"
        style={{
          position: "fixed",
          left: "25%",
          width: 80,
          height: "auto",
          zIndex: 200,
          animation: "wiggle 4s ease-in-out infinite",
          borderRadius: 8,
          scale: "0.3",
        }}
      />

      {welcomeOpen && <WelcomePage onEnter={() => setWelcomeOpen(false)} />}

     //Burger Menu
      {!welcomeOpen && (
        <button
          onClick={() => setTreeMenuOpen(true)}
          onMouseEnter={e => { e.currentTarget.style.background = "#7f5af0" }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(26,10,46,0.85)" }}
          style={{
            position: "fixed", top: "5%", right:200, transform: "translateY(-50%)", zIndex: 100,
            width: 44, height: 44, borderRadius: 10,
            background: "rgba(26,10,46,0.85)", border: "1px solid #7f5af0",
            cursor: "pointer", transition: "background 0.2s",
            boxShadow: "0 0 16px rgba(127,90,240,0.25)",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: "block", width: 20, height: 2, background: "#c4b5fd", borderRadius: 2 }} />
          ))}
        </button>
      )}

      {/* Help button — always visible once scene is entered */}
      {!welcomeOpen && (
        <button
          onClick={() => setWelcomeOpen(true)}
          onMouseEnter={e => { e.currentTarget.style.background = "#7f5af0"; e.currentTarget.style.color = "#fff" }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(26,10,46,0.85)"; e.currentTarget.style.color = "#c4b5fd" }}
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 100,
            width: 38, height: 38, borderRadius: "50%",
            background: "rgba(26,10,46,0.85)", border: "1px solid #7f5af0",
            color: "#c4b5fd", fontSize: 17, fontWeight: 700, fontFamily: "sans-serif",
            cursor: "pointer", transition: "background 0.2s, color 0.2s",
            boxShadow: "0 0 16px rgba(127,90,240,0.25)",
          }}
        >
          ?
        </button>
      )}

      <Scene
        onBubbleClick={handleBubbleClick}
        onBubbleReady={(fn) => { bubbleNavigateRef.current = fn }}
        activeBubbleIndex={activeBubbleIndex}
        onTreeClick={() => setTreeMenuOpen(true)}
        onTreeReady={(fn) => { treeAboutRef.current = fn }}
        onTreeResetReady={(fn) => { resetCameraRef.current = fn }}
        onTreeNextReady={(fn) => { treeNextRef.current = fn }}
        onTreeNext2Ready={(fn) => { treeNext2Ref.current = fn }}
        onTreeNext3Ready={(fn) => { treeNext3Ref.current = fn }}
        onTreeContactReady={(fn) => { treeContactRef.current = fn }}
        onPrincessClick={() => setChatOpen(true)}
      />
      {treeMenuOpen && (
        <TreeMenu
          onClose={() => setTreeMenuOpen(false)}
          onAbout={() => { setTreeMenuOpen(false); treeAboutRef.current?.(() => setShowNextBtn(true)) }}
          onPortfolio={() => { setTreeMenuOpen(false); bubbleNavigateRef.current?.(0) }}
          onContact={() => { setTreeMenuOpen(false); treeContactRef.current?.() }}
        />
      )}
      {showNextBtn && (
        <NextBtn onClick={() => { treeNextRef.current?.(); setShowNextBtn(false); setShowNext2Btn(true) }} />
      )}
      {showNext2Btn && (
        <NextBtn onClick={() => { treeNext2Ref.current?.(); setShowNext2Btn(false); setShowNext3Btn(true) }} />
      )}
      {showNext3Btn && (
        <NextBtn onClick={() => { setShowNext3Btn(false); resetCameraRef.current?.() }} />
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
