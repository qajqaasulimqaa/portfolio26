export default function TreeMenu({ onClose, onAbout, onContact, onPortfolio }) {
  const btnStyle = {
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
    transition: "background 0.2s, color 0.2s",
    width: "100%",
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
        }}
      />

      {/* Menu */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          background: "rgba(26, 10, 46, 0.92)",
          border: "1px solid #7f5af0",
          borderRadius: 16,
          padding: "32px 40px",
          minWidth: 220,
          boxShadow: "0 0 40px rgba(127, 90, 240, 0.3)",
        }}
      >
        <button
          style={btnStyle}
          onMouseEnter={e => { e.target.style.background = "#7f5af0"; e.target.style.color = "#fff" }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#c4b5fd" }}
          onClick={onAbout}
        >
          About Me
        </button>
        <button
          style={btnStyle}
          onMouseEnter={e => { e.target.style.background = "#7f5af0"; e.target.style.color = "#fff" }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#c4b5fd" }}
          onClick={onPortfolio}
        >
          Portfolio
        </button>
        <button
          style={btnStyle}
          onMouseEnter={e => { e.target.style.background = "#7f5af0"; e.target.style.color = "#fff" }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#c4b5fd" }}
          onClick={onContact}
        >
          Contact
        </button>
      </div>
    </>
  )
}
