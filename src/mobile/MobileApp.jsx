import { useState, useEffect, useRef } from "react";
import "./MobileApp.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import avatarImg from "../images/avatar.jpg";
import ParticlesBackground from "../components/ParticlesBackground";
import {
  FaReact,
  FaJs,
  FaFigma,
  FaNodeJs,
  FaUserGraduate,
  FaDatabase,
  FaGithub,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiHappycow, SiPostman } from "react-icons/si";
import { MdWork } from "react-icons/md";
import antLogo from "../images/ant-design-logo.png";

const SKILLS = [
  { name: "React", icon: FaReact, cat: "Frontend", color: "#61dafb", level: 60 },
  { name: "JavaScript", icon: FaJs, cat: "Frontend", color: "#f7df1e", level: 70 },
  { name: "TypeScript", icon: SiTypescript, cat: "Frontend", color: "#3178c6", level: 50 },
  { name: "Tailwind CSS", icon: SiTailwindcss, cat: "Frontend", color: "#38bdf8", level: 70 },
  { name: "Node.js", icon: FaNodeJs, cat: "Backend", color: "#68a063", level: 48 },
  { name: "SQL Server", icon: FaDatabase, cat: "Backend", color: "#cc2927", level: 60 },
  { name: "REST API", icon: SiPostman, cat: "Backend", color: "#ff6c37", level: 40 },
  { name: "Figma", icon: FaFigma, cat: "Design", color: "#a259ff", level: 70 },
  { name: "Ant Design", image: antLogo, cat: "Frontend", level: 60 },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function MobileApp() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [heroRef, heroIn] = useInView(0.1);
  const [aboutRef, aboutIn] = useInView(0.1);
  const [skillsRef, skillsIn] = useInView(0.1);
  const [projRef, projIn] = useInView(0.05);
  const [ctaRef, ctaIn] = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(id.charAt(0).toUpperCase() + id.slice(1));
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <div className="mobile-app">
      <ParticlesBackground />
      <Navbar
        active={active}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      {/* HERO */}
      <section id="home" className="m-hero" ref={heroRef}>
        <div className={`m-hero__avatar-wrap ${heroIn ? "m-fade-up" : "m-pre"}`}>
          <div className="m-avatar-ring">
            <img src={avatarImg} alt="Trần Ngọc Ánh Dương" className="m-avatar" />
          </div>

          <div className="m-badge m-badge-1"><FaReact /></div>
          <div className="m-badge m-badge-2"><FaFigma /></div>
          <div className="m-badge m-badge-3"><FaJs /></div>
          <div className="m-badge m-badge-4"><SiTypescript /></div>
          <div className="m-badge m-badge-5"><SiTailwindcss /></div>
        </div>

        <div className={`m-hero__content ${heroIn ? "m-fade-up-delay" : "m-pre"}`}>
          <p className="m-hero__greeting">Hi, I'm</p>
          <h1 className="m-hero__name">Trần Ngọc Ánh Dương</h1>
          <h2 className="m-hero__role">Frontend Developer</h2>

          <div className="m-hero__cta">
            <button
              className="m-btn m-btn--primary"
              onClick={() => window.open("/TranNgocAnhDuong_Frontend_CV (ENG).pdf", "_blank")}
            >
              View CV
            </button>
            <button className="m-btn m-btn--outline" onClick={() => scrollTo("Contact")}>
              Contact Me
            </button>
          </div>

          <div className="m-hero__socials">
            {[
              { Icon: FaGithub, url: "https://github.com/anhdunn" },
              {
                Icon: FaLinkedin,
                url: "https://www.linkedin.com/in/%C3%A1nh-d%C6%B0%C6%A1ng-tr%E1%BA%A7n-ng%E1%BB%8Dc-166997403/",
              },
              { Icon: FaFacebook, url: "https://www.facebook.com/duong0907" },
            ].map((s, i) => (
              <a key={i} href={s.url} className="m-social-link" target="_blank" rel="noreferrer">
                <s.Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="m-scroll-hint">
          <span>Scroll Down</span>
          <div className="m-scroll-arrow" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="m-section" ref={aboutRef}>
        <div className={`m-section__inner ${aboutIn ? "m-fade-up" : "m-pre"}`}>
          <div className="m-tag">
            <span className="m-spin"><SiHappycow /></span>
            About Me
          </div>

          <h3 className="m-name-year">Trần Ngọc Ánh Dương — 2004</h3>
          <p className="m-role">Frontend Developer</p>

          <p className="m-desc">
            I graduated with a major in <strong>Information Technology</strong> and have a{" "}
            <strong>strong passion for web interface development and UX design</strong>.
          </p>
          <p className="m-desc">
            I have knowledge of <strong>JavaScript, ReactJS, TailwindCSS</strong>, along with an
            understanding of frontend development principles.
          </p>
          <p className="m-desc">
            Currently seeking an opportunity as a <strong>Fresher Frontend Developer</strong>.
          </p>

          <div className="m-timeline">
            <div className="m-tl-item">
              <div className="m-tl-icon"><FaUserGraduate /></div>
              <div className="m-tl-line" />
              <div className="m-tl-content">
                <span className="m-tl-tag">Education</span>
                <h4 className="m-tl-title">HUTECH</h4>
                <p className="m-tl-sub">Information Technology · 09/2022 — 09/2026</p>
                <p className="m-tl-detail">GPA: 3.20 / 4.0</p>
              </div>
            </div>

            <div className="m-tl-item m-tl-item--last">
              <div className="m-tl-icon"><MdWork /></div>
              <div className="m-tl-content">
                <span className="m-tl-tag">Experience</span>
                <h4 className="m-tl-title">Frontend Developer Intern</h4>
                <p className="m-tl-sub">FamilyMart Vietnam · 2 months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="m-section m-section--alt" ref={skillsRef}>
        <div className={`m-section__inner ${skillsIn ? "m-fade-up" : "m-pre"}`}>
          <div className="m-tag">
            <span className="m-spin"><SiHappycow /></span>
            My Tech Stack
          </div>

          {["Frontend", "Backend", "Design"].map((cat) => (
            <div key={cat} className="m-skill-cat">
              <h4 className="m-skill-cat__title">{cat}</h4>
              {SKILLS.filter((s) => s.cat === cat).map((s) => (
                <div key={s.name} className="m-skill-row">
                  <div className="m-skill-icon">
                    {s.image ? (
                      <img src={s.image} alt={s.name} />
                    ) : (
                      <s.icon style={{ color: s.color }} />
                    )}
                  </div>
                  <div className="m-skill-info">
                    <div className="m-skill-top">
                      <span>{s.name}</span>
                      <span>{s.level}%</span>
                    </div>
                    <div className="m-skill-bar-wrap">
                      <div
                        className="m-skill-bar"
                        style={{
                          width: skillsIn ? `${s.level}%` : "0%",
                          background: s.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS (dùng chung component) */}
      <Projects projRef={projRef} projIn={projIn} />

      {/* CONTACT */}
      <section id="contact" className="m-section m-section--alt" ref={ctaRef}>
        <div className={`m-section__inner ${ctaIn ? "m-fade-up" : "m-pre"}`}>
          <div className="m-tag">
            <span className="m-spin"><SiHappycow /></span>
            Contact
          </div>

          <div className="m-info-card">
            <p className="m-info-label">Email</p>
            <p className="m-info-val">tranngocanhduong0907@gmail.com</p>
          </div>
          <div className="m-info-card">
            <p className="m-info-label">Phone Number</p>
            <p className="m-info-val">+84 947 279 205</p>
          </div>
          <div className="m-info-card">
            <p className="m-info-label">Address</p>
            <p className="m-info-val">Ho Chi Minh City</p>
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} />
    </div>
  );
}