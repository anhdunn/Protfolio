import { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import avatarImg from "./images/avatar.jpg";
import { FaReact, FaJs, FaFigma, FaNodeJs, FaUserGraduate, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiHappycow, SiPostman } from "react-icons/si";
import { MdWork } from "react-icons/md";
import ParticlesBackground from "./ParticlesBackground";
import { SiAntdesign } from "react-icons/si";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const SKILLS = [
  { name: "React", icon: FaReact, cat: "Frontend", color: "#61dafb", level: 60 },
  { name: "JavaScript", icon: FaJs, cat: "Frontend", color: "#f7df1e", level: 70 },
  { name: "TypeScript", icon: SiTypescript, cat: "Frontend", color: "#3178c6", level: 50 },
  { name: "Tailwind CSS", icon: SiTailwindcss, cat: "Frontend", color: "#38bdf8", level: 70 },
  { name: "Node.js", icon: FaNodeJs, cat: "Backend", color: "#68a063", level: 48 },
  { name: "SQL Server", icon: FaDatabase, cat: "Backend", color: "#cc2927", level: 60 },
  { name: "REST API", icon: SiPostman, cat: "Backend", color: "#ff6c37", level: 40 },
  { name: "Figma", icon: FaFigma, cat: "Design", color: "#a259ff", level: 70 },
  { name: "Ant Design", icon: SiAntdesign, cat: "Frontend", color: "#cc2927", level: 60},
];

const PROJECTS = [
  // {
  //   title: "Web tuyển dụng FamilyMart",
  //   desc: "Dự án thực tập tại FamilyMart Vietnam — xây dựng giao diện trang web tuyển dụng cho Family Mart",
  //   tags: ["React", "Ant Design", "Node.js", "MySQL"],
  //   color: "#e8f0fe",
  //   accent: "#4285f4",
  //   icon: "🏪",
  //   link: "#",
  // },
  // {
  //   title: "E-COMMERCE WEBSITE FOR ONLINE FLOWER SHOPPING",
  //   desc: "Ứng dụng mua sắm trực tuyến với giỏ hàng, trang sản phẩm, quản lý đơn hàng và giao diện quản trị đơn giản. Đồ án nhóm 2 người.",
  //   tags: ["JavaScript", "CSS", "Node.js", "MongoDB", "Bootstrap"],
  //   color: "#f0e8fe",
  //   accent: "#7c3aed",
  //   icon: "🛒",
  //   link: "#",
  // },
  // {
  //   title: "ATTENDANCE APPLICATION INTEGRATED WITH AI-BASED FACIAL RECOGNITION",
  //   desc: "Giao diện quản lý nhân viên, chấm công và bảng lương với biểu đồ thống kê trực quan theo tháng. Đồ án nhóm 2 người.",
  //   tags: ["React", "Chart.js", "Express", "SQLServer"],
  //   color: "#e8fef0",
  //   accent: "#059669",
  //   icon: "📊",
  //   link: "#",
  // },
];

function useInView(threshold = 0.15) {
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


export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroIn] = useInView(0.1);
  const [aboutRef, aboutIn] = useInView(0.1);
  const [skillsRef, skillsIn] = useInView(0.1);
  const [projRef, projIn] = useInView(0.05);
  const [ctaRef, ctaIn] = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <ParticlesBackground />
      <Navbar
        active={active}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

        <section id="home" className="hero" ref={heroRef}>
          <div className={`hero__content ${heroIn ? "fade-up" : "pre-anim"}`}>
          <p className="hero__greeting">Hi, I'm</p>
          <h1 className="hero__name">Trần Ngọc Ánh Dương</h1>
          <h2 className="hero__role">
            <span className="role-highlight">Frontend Developer</span>
          </h2>
          {/* <p className="hero__desc">
            A student who has just completed an intership at <strong>FamilyMart Vietnam</strong>. Passionate
            about building beautiful and user-friendly interfaces. Currently seeking an opportunity as a{" "}
            <strong>Fresher Frontend Developer</strong>.
          </p> */}
          <div className="hero__cta">
            <button
              className="btn btn--primary"
              onClick={() => window.open("/TranNgocAnhDuong_Frontend_CV.pdf", "_blank")}
            >
              View CV
            </button>
            <button className="btn btn--outline" onClick={() => scrollTo("Contact")}>
              Contact Me
            </button>
          </div>
          <div className="hero__socials">
            {[
              { Icon: FaGithub, url: "https://github.com/anhdunn" },
              { Icon: FaLinkedin, url: "https://www.linkedin.com/in/tr%E1%BA%A7n-ng%E1%BB%8Dc-%C3%A1nh-d%C6%B0%C6%A1ng-undefined-166997403/?skipRedirect=true" },
              { Icon: FaFacebook , url: "https://www.facebook.com/duong0907" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.url}
                className="social-link"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "1.5rem", display: "flex" }}
              >
                <s.Icon />
              </a>
            ))}
          </div>
        </div>
        <div className={`hero__avatar-wrap ${heroIn ? "fade-up-delay" : "pre-anim"}`}>
          <div className="hero__avatar">
            <div className="avatar-inner">
              <img src={avatarImg} alt="Trần Ngọc Ánh Dương" />
            </div>
            <div className="avatar-ring" />
          </div>
          <div className="floating-badge badge-1">
            <span className="badge-text">ReactJS</span>
            <span className="badge-icon">
              <FaReact />
            </span>
          </div>

          <div className="floating-badge badge-2">
            <span className="badge-text">UI/UX Designer</span>
            <span className="badge-icon">
              <FaFigma />
            </span>
          </div>

          {/* <div className="floating-badge badge-3">
            <span className="badge-text"></span>
            <span className="badge-icon">
              <HiOutlineCode />
            </span>
          </div> */}

          <div className="floating-badge badge-4">
            <span className="badge-text">JavaScript</span>
            <span className="badge-icon">
              <FaJs />
            </span>
          </div>

          <div className="floating-badge badge-5">
            <span className="badge-text">TypeScript</span>
            <span className="badge-icon">
              <SiTypescript />
            </span>
          </div>

          <div className="floating-badge badge-6">
            <span className="badge-text">Tailwind CSS</span>
            <span className="badge-icon">
              <SiTailwindcss />
            </span>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll Down</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about section" ref={aboutRef}>
        <div className={`section__inner ${aboutIn ? "fade-up" : "pre-anim"}`}>
        <div className="section__tag-inline">
          <span className="spin-icon"><SiHappycow /></span>
          About Me
        </div>
          <div className="about__timeline-layout">
            <div className="about__intro">
              <h2 className="about__intro-title">Trần Ngọc Ánh Dương - 2004</h2>
              <p className="about__intro-role">Frontend Developer</p>
              <p className="about__intro-desc">
                I am a final-year student majoring Information Technology with a {" "}
                <strong>strong passion for web interface development and </strong> 
                <strong> user experience design. </strong>{" "}
              </p>
              <p className="about__intro-desc"> I have knowledge {" "} 
                <strong>JavaScript, ReactJS, TailwindCSS, </strong> {" "}
                along with an understanding frontend development principles. 
                </p>
              <p className="about__intro-desc">
                Currently seeking an opportunity as a{" "}
                <strong>Fresher Frontend Developer</strong>{" "}
                to continue growing my skills.
              </p>
            </div>

            <div className="about__timeline">
              <div className="tl-item">
                <div className="tl-icon"><FaUserGraduate /></div>
                <div className="tl-line" />
                <div className="tl-content">
                  <span className="tl-tag">Education</span>
                  <h4 className="tl-title">HO CHI MINH CITY UNIVERSITY OF TECHNOLOGY (HUTECH)</h4>
                  <p className="tl-sub">Information Technology · 09/2022 — Present</p>
                  <p className="tl-detail">Expected graduation: 08/2026</p>
                  <p className="tl-detail">GPA: 3.15 / 4.0</p>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-icon"><MdWork /></div>
                <div className="tl-line" />
                <div className="tl-content">
                  <span className="tl-tag">Experience</span>
                  <h4 className="tl-title">Frontend Developer Intern</h4>
                  <p className="tl-sub">FamilyMart Company Vietnam · 2 months (04/05/2026 - 04/07/2026)</p>
                </div>
              </div>
              {/* <div className="tl-item tl-item--last">
                <div className="tl-icon"><FaAward /></div>
                <div className="tl-content">
                  <span className="tl-tag">Achievements</span>
                  <h4 className="tl-title">Highlights</h4>
                  <ul className="tl-list">
                    <li>Completed Frontend Internship at FamilyMart Vietnam</li>
                    <li>Built multiple academic & personal web projects</li>
                    <li>Hands-on experience with ReactJS & modern UI design</li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills section section--alt" ref={skillsRef}>
        <div className={`section__inner ${skillsIn ? "fade-up" : "pre-anim"}`}>
          <div className="section__tag-inline">
            <span className="spin-icon"><SiHappycow /></span>
            My Tech Stack
          </div>
          {["Frontend", "Backend", "Design"].map((cat) => (
            <div key={cat} className="skill-cat">
              <h3 className="skill-cat__title">{cat}</h3>
              <div className="skill-icons-grid">
                {SKILLS.filter((s) => s.cat === cat).map((s) => (
                  <div key={s.name} className="skill-icon-row">
                    <div className="skill-icon-wrap" style={{ color: s.color }}>
                      <s.icon />
                    </div>
                    <span className="skill-icon-name">{s.name}</span>
                    <div className="skill-icon-bar-wrap">
                      <div
                        className="skill-icon-bar"
                        style={{
                          width: skillsIn ? `${s.level}%` : "0%",
                          background: s.color,
                        }}
                      />
                    </div>
                    <span className="skill-icon-pct">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects section" ref={projRef}>
        <div className={`section__inner ${projIn ? "fade-up" : "pre-anim"}`}>
          <div className="section__tag-inline">
            <span className="spin-icon"><SiHappycow /></span>
            Projects
          </div>
          <div className="projects__grid">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className="project-card"
                style={{
                  "--card-color": p.color,
                  "--card-accent": p.accent,
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                <div className="project-card__icon">{p.icon}</div>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <a href={p.link} className="project-card__link" style={{ color: p.accent }}>
                  View more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact section section--alt" ref={ctaRef}>
        <div className={`section__inner ${ctaIn ? "fade-up" : "pre-anim"}`}>
          <div className="section__tag-inline">
            <span className="spin-icon"><SiHappycow /></span>
            Contact
          </div>
          <div className="contact__layout">
            <div className="contact__info">
              <div className="info-card">
                <div>
                  <p className="info-label">Email</p>
                  <p className="info-val">tranngocanhduong0907@gmail.com</p>
                </div>
              </div>
              <div className="info-card">
                <div>
                  <p className="info-label">Phone Number</p>
                  <p className="info-val">+84 947 279 205</p>
                </div>
              </div>
              <div className="info-card">
                <div>
                  <p className="info-label">Address</p>
                  <p className="info-val">28 Huỳnh Tịnh Của, Phường Thạnh Mỹ Tây</p>
                </div>
              </div>
              {/* <div className="info-card">
                <div>
                  <p className="info-label">Status</p>
                  <p className="info-val">Đang tìm việc — Fresher</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} />
    </div>
  );
}
