import { useState, useEffect } from "react"

export default function WelcomePage({ onEnter }) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!loading) return
    if (progress >= 100) {
      const t = setTimeout(onEnter, 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setProgress(p => Math.min(p + Math.random() * 12 + 4, 100)), 80)
    return () => clearTimeout(t)
  }, [loading, progress, onEnter])

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
        <div style={{ width: 220, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{
            width: "100%",
            height: 10,
            background: "rgba(127,90,240,0.2)",
            borderRadius: 8,
            border: "1px solid #7f5af0",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7f5af0, #c442bb)",
              borderRadius: 8,
              transition: "width 0.08s linear",
            }} />
          </div>
          <div style={{ color: "rgba(196,181,253,0.6)", fontSize: 12, letterSpacing: 1 }}>
            {progress < 100 ? "Loading..." : "Ready!"}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setLoading(true)}
          onMouseEnter={e => { e.target.style.background = "#68b0e8"; e.target.style.color = "#c442bb" }}
          onMouseLeave={e => { e.target.style.background = "#1a3d58"; e.target.style.color = "#c05ed1" }}
          style={{
            marginTop: 8,
            background: "#7f5af0",
            border: "1px solid #7f5af0",
            borderRadius: 12,
            color: "#b215d9",
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
