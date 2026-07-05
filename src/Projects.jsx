import "./Projects.css";

const PROJECTS = [
  {
    title: "Recruitment Website",
    desc: "Frontend internship project at FamilyMart Vietnam. Developed responsive recruitment pages using ReactJS and Ant Design.",
    tags: ["React", "Ant Design", "JavaScript"],
    image: "/images/project1.png",
    github: "#",
    demo: "#",
  },

  {
    title: "Online Flower Shop",
    desc: "E-commerce website with shopping cart, product management, order tracking and authentication.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/project2.png",
    github: "#",
    demo: "#",
  },

  {
    title: "AI Attendance System",
    desc: "Attendance management integrated with facial recognition and dashboard statistics.",
    tags: ["React", "Express", "SQL Server"],
    image: "/images/project3.png",
    github: "#",
    demo: "#",
  },
];

export default function Projects({ projRef, projIn }) {
  return (
    <section id="projects" className="projects section" ref={projRef}>
      <div className={`section__inner ${projIn ? "fade-up" : "pre-anim"}`}>

        <div className="section__tag-inline">
          Projects
        </div>

        <h2 className="projects-title">
          Featured Projects
        </h2>

        <p className="projects-subtitle">
          Some personal and academic projects that helped me improve my frontend skills.
        </p>

        <div className="projects-grid">

          {PROJECTS.map((project, index) => (

            <div
              className="project-card"
              key={index}
            >

              <div className="project-image">

                <img
                  src={project.image}
                  alt={project.title}
                />

              </div>

              <div className="project-content">

                <h3>{project.title}</h3>

                <p>{project.desc}</p>

                <div className="project-tags">

                  {project.tags.map(tag => (

                    <span key={tag}>
                      {tag}
                    </span>

                  ))}

                </div>

                <div className="project-buttons">

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}