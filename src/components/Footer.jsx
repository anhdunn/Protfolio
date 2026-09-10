const NAV_LINKS = ["Facebook", "Github", "LinkedIn"];

export default function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>© 2026 · MADE BY TRAN NGOC ANH DUONG</p>
        <div className="footer__links">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}



