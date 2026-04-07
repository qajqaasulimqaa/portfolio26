export default function BubblePanel({ title, src, onClose }) {
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
      </div>
    </>
  )
}
