export default function BubblePanel({ title, src, image, onClose, onPrev, onNext, activeBubbleIndex, totalBubbles }) {
  const canGoUp   = activeBubbleIndex > 0
  const canGoDown = activeBubbleIndex < totalBubbles - 1

  const btnBase = {
    fontSize: 10,
    background: "none",
    border: "1px solid #7f5af0",
    borderRadius: 4,
    cursor: "pointer",
    padding: "2px 8px",
    transition: "color 0.2s, border-color 0.2s",
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(0, 0, 0, 0.5)",
        }}
      >
      <div
        onClick={e => e.stopPropagation()}
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
          {src && (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#c4b5fd", fontSize: 12, textDecoration: "none", border: "1px solid #7f5af0", borderRadius: 4, padding: "2px 10px" }}
            >
              ↗ visit site
            </a>
          )}

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

        {image ? (
          <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0620" }}>
            <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ) : (
          <iframe
            src={src}
            width="100%"
            height="100%"
            style={{ border: "none", flex: 1 }}
            allow="fullscreen"
          />
        )}

        {/* Footer nav */}
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
          <button
            onClick={canGoUp ? onPrev : undefined}
            disabled={!canGoUp}
            style={{ ...btnBase, color: canGoUp ? "#ffffff" : "#4a3a6a", borderColor: canGoUp ? "#7f5af0" : "#3d2a7a" }}
          >
            ↑ prev project
          </button>
          <span style={{ color: "#ffffff", fontSize: 10 }}>scroll to navigate</span>
          <button
            onClick={canGoDown ? onNext : undefined}
            disabled={!canGoDown}
            style={{ ...btnBase, color: canGoDown ? "#ffffff" : "#4a3a6a", borderColor: canGoDown ? "#7f5af0" : "#3d2a7a" }}
          >
            next project ↓
          </button>
        </div>
      </div>
      </div>
    </>
  )
}
