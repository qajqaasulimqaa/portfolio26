export default function BubblePanel({ title, src, onClose, activeBubbleIndex, totalBubbles }) {
  const canGoUp   = activeBubbleIndex > 0
  const canGoDown = activeBubbleIndex < totalBubbles - 1

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "transparent",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 660,
          height: 460,
          background: "#1a0a2e",
          border: "1px solid #7f5af0",
          borderRadius: 16,
          overflow: "hidden",
          fontFamily: "sans-serif",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            background: "#2d1b69",
          }}
        >
          <span style={{ color: "#c4b5fd", fontSize: 14, fontWeight: 600 }}>
            {title}
          </span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#c4b5fd", cursor: "pointer", fontSize: 18 }}
          >
            ✕
          </button>
        </div>

        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: "none", flex: 1 }}
          allow="fullscreen"
        />

        {/* Scroll hint footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
            padding: "7px 16px",
            background: "#2d1b69",
            borderTop: "1px solid #3d2a7a",
            fontSize: 12,
            userSelect: "none",
          }}
        >
          <span style={{ color: canGoUp ? "#ffffff" : "#4a3a6a", transition: "color 0.2s" }}>
            ↑ prev project
          </span>
          <span style={{ color: "#ffffff", fontSize: 10 }}>scroll to navigate</span>
          <span style={{ color: canGoDown ? "#c4b5fd" : "#4a3a6a", transition: "color 0.2s" }}>
            next project ↓
          </span>
        </div>
      </div>
    </>
  )
}
