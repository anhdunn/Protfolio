// import "./Navbar.css";

// const NAV_LINKS = [
//   { label: "Home", id: "Home" },
//   { label: "About", id: "About" },
//   { label: "Tech Stack", id: "Skills" },
//   { label: "Projects", id: "Projects" },
//   { label: "Contact", id: "Contact" },
// ];

// export default function Navbar({ active, scrolled, menuOpen, setMenuOpen, scrollTo }) {
//   return (
//     <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
//       <div className="nav__logo" onClick={() => scrollTo("Home")}>
//         <span className="logo-dot" />
//         <span></span>
//       </div>
//       <ul className={`nav__links ${menuOpen ? "open" : ""}`}>
//         {NAV_LINKS.map((l) => (
//           <li key={l.id}>
//             <button
//               className={`nav__link ${active === l.id ? "active" : ""}`}
//               onClick={() => scrollTo(l.id)}
//             >
//               {l.label}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button
//         className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
//         onClick={() => setMenuOpen(!menuOpen)}
//         aria-label="menu"
//       >
//         <span />
//         <span />
//         <span />
//       </button>
//     </nav>
//   );
// }

import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", id: "Home" },
  { label: "About", id: "About" },
  { label: "Tech Stack", id: "Skills" },
  { label: "Projects", id: "Projects" },
  { label: "Contact", id: "Contact" },
];

export default function Navbar({ active, scrolled, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__logo" onClick={() => scrollTo("Home")}>
          <span className="logo-dot" />
          <span></span>
        </div>

        <ul className="nav__links">
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
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* FULL-SCREEN MOBILE MENU */}
      <div className={`nav-overlay ${menuOpen ? "nav-overlay--open" : ""}`}>
        <div className="nav-overlay__glow" />
        <ul className="nav-overlay__links">
          {NAV_LINKS.map((l, i) => (
            <li
              key={l.id}
              className={active === l.id ? "active" : ""}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : "0ms" }}
            >
              <span className="nav-overlay__index">0{i + 1}</span>
              <button onClick={() => scrollTo(l.id)}>{l.label}</button>
            </li>
          ))}
        </ul>

        <div className="nav-overlay__footer">
          <span>Trần Ngọc Ánh Dương</span>
          <span>© 2026</span>
        </div>
      </div>
    </>
  );
}