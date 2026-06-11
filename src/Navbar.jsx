const NAV_LINKS = [
  { label: "Home", id: "Home" },
  { label: "About", id: "About" },
  { label: "Tech Stack", id: "Skills" },
  { label: "Projects", id: "Projects" },
  { label: "Contact", id: "Contact" },
];

export default function Navbar({ active, scrolled, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__logo" onClick={() => scrollTo("Home")}>
        <span className="logo-dot" />
        <span></span>
      </div>
      <ul className={`nav__links ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <li key={l.id}>
            <button
              className={`nav__link ${active === l.id ? "active" : ""}`}
              onClick={() => scrollTo(l.id)}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}