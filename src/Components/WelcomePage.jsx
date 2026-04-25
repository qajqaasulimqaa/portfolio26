import { useState, useEffect, useRef } from "react"

export default function WelcomePage({ onEnter }) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(null)

  function handleEnter() {
    setLoading(true)
  }

  useEffect(() => {
    if (!loading) return

    const duration = 2200
    const startTime = performance.now()

    function animate(now) {
      const elapsed = now - startTime
      // Ease-out so it slows near 100%
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2)
      const p = eased * 100
      setProgress(p)

      if (p < 100) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        onEnter()
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [loading])

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "radial-gradient(ellipse at center, #cf6fe2 0%, #0a0514 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      fontFamily: "sans-serif",
    }}>

      <div style={{ color: "#c4b5fd", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
        Welcome to my Portfolio
      </div>

      <div style={{
        background: "rgba(53, 19, 53, 0.85)",
        border: "1px solid #7f5af0",
        borderRadius: 16,
        padding: "24px 36px",
        boxShadow: "0 0 40px rgba(127,90,240,0.2)",
        color: "rgba(196,181,253,0.7)",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 2,
      }}>
        Click the <span style={{ color: "#c4b5fd", fontWeight: 600 }}>tree</span> to explore about me, portfolio & contact<br />
        Click <span style={{ color: "#c4b5fd", fontWeight: 600 }}>Lumpy</span> to chat with me<br />
        Click the <span style={{ color: "#c4b5fd", fontWeight: 600 }}>floating bubbles</span> to browse my projects
      </div>

      {loading ? (
        <div style={{ width: 280, marginTop: 8 }}>
          <div style={{
            width: "100%",
            height: 8,
            background: "rgba(127,90,240,0.2)",
            borderRadius: 99,
            border: "1px solid #7f5af0",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7f5af0, #c4b5fd)",
              borderRadius: 99,
              transition: "width 0.05s linear",
              boxShadow: "0 0 8px rgba(196,181,253,0.6)",
            }} />
          </div>
          <div style={{
            color: "rgba(196,181,253,0.6)",
            fontSize: 12,
            textAlign: "center",
            marginTop: 8,
            letterSpacing: 1,
          }}>
            Loading environment... {Math.round(progress)}%
          </div>
        </div>
      ) : (
        <button
          onClick={handleEnter}
          onMouseEnter={e => { e.target.style.background = "#7f5af0"; e.target.style.color = "#fff" }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#c4b5fd" }}
          style={{
            marginTop: 8,
            background: "none",
            border: "1px solid #7f5af0",
            borderRadius: 12,
            color: "#c4b5fd",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "sans-serif",
            padding: "12px 48px",
            cursor: "pointer",
            letterSpacing: 2,
            transition: "background 0.2s, color 0.2s",
          }}
        >
          Enter!
        </button>
      )}
    </div>
  )
}
