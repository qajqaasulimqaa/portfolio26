export default function NextBtn({ onClick, label = "Next →" }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: 40,
        right: 40,
        zIndex: 200,
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
      }}
      onMouseEnter={e => { e.target.style.background = "#7f5af0"; e.target.style.color = "#fff" }}
      onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#c4b5fd" }}
    >
      {label}
    </button>
  )
}
