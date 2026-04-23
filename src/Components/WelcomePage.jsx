export default function WelcomePage({ onEnter }) {
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

      <button
        onClick={onEnter}
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
    </div>
  )
}
