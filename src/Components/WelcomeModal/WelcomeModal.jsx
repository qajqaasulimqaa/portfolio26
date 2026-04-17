export default function WelcomeModal({ onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(5, 2, 18, 0.75)",
          backdropFilter: "blur(4px)",
          zIndex: 300,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 301,
          background: "rgba(15, 5, 36, 0.96)",
          border: "1px solid #7f5af0",
          borderRadius: 20,
          padding: "44px 52px",
          maxWidth: 480,
          width: "90vw",
          boxShadow: "0 0 60px rgba(127, 90, 240, 0.35)",
          fontFamily: "sans-serif",
          color: "#e2d9f3",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 26,
            fontWeight: 700,
            color: "#c4b5fd",
            letterSpacing: 1,
          }}
        >
          Welcome
        </h1>
        {/* Message */}
        <p style={{ margin: "0 0 28px", fontSize: 15, lineHeight: 1.7, color: "#b8acd4" }}>
          This portfolio is still being built, things may look unfinished :()
        </p>

        {/* Instructions */}
        <div
          style={{
            background: "rgba(127, 90, 240, 0.08)",
            border: "1px solid #7f5af033",
            borderRadius: 12,
            padding: "18px 20px",
            marginBottom: 32,
            textAlign: "left",
          }}
        >
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "#c4b5fd", letterSpacing: 1, textTransform: "uppercase" }}>
            How to explore
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 2, color: "#b8acd4" }}>
            <li>Click the <strong style={{ color: "#c4b5fd" }}>tree</strong> to open the menu</li>
            <li>Click the <strong style={{ color: "#c4b5fd" }}>floating orbs</strong> to view projects</li>
            <li>Click the <strong style={{ color: "#c4b5fd" }}>character</strong> to start a chat</li>
            <li>Click the <strong style={{ color: "#c4b5fd" }}>floor</strong> to reset the camera</li>
          </ul>
        </div>

        {/* Enter button */}
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "1px solid #7f5af0",
            borderRadius: 8,
            color: "#c4b5fd",
            fontSize: 15,
            fontWeight: 600,
            padding: "12px 48px",
            cursor: "pointer",
            letterSpacing: 1,
            transition: "background 0.2s, color 0.2s",
            width: "100%",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#7f5af0"; e.currentTarget.style.color = "#fff" }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#c4b5fd" }}
        >
          Enter
        </button>
      </div>
    </>
  )
}
