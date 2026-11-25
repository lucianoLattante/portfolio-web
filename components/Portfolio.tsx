import career from "../content/career.json";
import { projects } from "../content/projects";
import { localePath, resumePath } from "../content/site";
import type { Locale } from "./Layout";
import { ThemeToggle } from "./ThemeToggle";

const labels = {
  es: {
    skip: "Saltar al contenido", work: "Proyectos", experience: "Experiencia", contact: "Contacto",
    cv: "Descargar CV", code: "Ver código", design: "Arquitectura", tests: "Pruebas",
    workTitle: "Backend en práctica", workIntro: "Proyectos personales con decisiones de diseño y pruebas que podés revisar.",
    current: "Actualmente en Mercado Libre", visualLabel: "Flujo de pedidos en CommerceFlow",
    diagram: [["API REST", "Recibe una orden"], ["MySQL + outbox", "Guarda la orden y el evento"], ["Kafka", "Publica el evento"], ["Consumidor", "Deduplica el procesamiento"]],
    diagramNote: "Una orden, desde la reserva de stock hasta la publicación del evento.",
    team: "Trabajo en equipo", teamProject: "OT167 - API para ONG", teamInfo: "Proyecto colaborativo de Alkemy, con aportes a Swagger y mejoras de autenticación y permisos.",
    contactTitle: "Hablemos", contactInfo: "Para conversar sobre un rol backend o sobre alguno de estos proyectos.",
    light: "Tema claro", primary: "Ver proyectos", nav: "Navegación principal", languages: "Idioma",
  },
  en: {
    skip: "Skip to content", work: "Projects", experience: "Experience", contact: "Contact",
    cv: "Download résumé", code: "View code", design: "Architecture", tests: "Tests",
    workTitle: "Backend projects", workIntro: "Personal projects with design decisions and test results you can review.",
    current: "Currently at Mercado Libre", visualLabel: "Order flow in CommerceFlow",
    diagram: [["REST API", "Receives an order"], ["MySQL + outbox", "Stores the order and event"], ["Kafka", "Publishes the event"], ["Consumer", "Deduplicates processing"]],
    diagramNote: "An order, from stock reservation to event publication.",
    team: "Team work", teamProject: "OT167 - NGO API", teamInfo: "An Alkemy team project, with contributions to Swagger and authentication and authorization improvements.",
    contactTitle: "Get in touch", contactInfo: "To discuss a backend role or any of these projects.",
    light: "Light theme", primary: "View projects", nav: "Main navigation", languages: "Language",
  },
} as const;

export function Portfolio({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const content = career[locale];
  const pdf = resumePath(locale);

  return (
    <>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="wordmark" href={localePath(locale)} aria-label={career.name}>
            <span className="monogram" aria-hidden="true">LL</span><span className="wordmark-name">{career.name}</span>
          </a>
          <nav className="nav" aria-label={copy.nav}>
            <a href="#projects">{copy.work}</a><a href="#experience">{copy.experience}</a><a href="#contact">{copy.contact}</a>
          </nav>
          <div className="controls">
            <nav className="languages" aria-label={copy.languages}>
              <a href={localePath("es")} hrefLang="es" lang="es" aria-label="Español" aria-current={locale === "es" ? "page" : undefined}>ES</a>
              <a href={localePath("en")} hrefLang="en" lang="en" aria-label="English" aria-current={locale === "en" ? "page" : undefined}>EN</a>
            </nav>
            <ThemeToggle label={copy.light} />
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="wrap hero" aria-labelledby="name">
          <div className="hero-copy">
            <p className="eyebrow">{content.location}</p>
            <h1 id="name">Luciano <span>Lattante</span></h1>
            <p className="role">{content.role}</p>
            <p className="lead">{content.intro}</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">{copy.primary}</a>
              <a className="button secondary" href={pdf} download>{copy.cv}</a>
            </div>
            <p className="current">{copy.current}</p>
          </div>

          <figure className="flow-panel" aria-label={copy.visualLabel}>
            <div className="flow-heading"><span className="flow-dot" aria-hidden="true" />CommerceFlow</div>
            <ol className="flow-list">
              {copy.diagram.map(([name, description]) => (
                <li className="flow-step" key={name}>
                  <span className="flow-node" aria-hidden="true" />
                  <span><strong>{name}</strong><small>{description}</small></span>
                </li>
              ))}
            </ol>
            <figcaption>{copy.diagramNote}</figcaption>
          </figure>
        </section>

        <section className="wrap section" id="projects" aria-labelledby="project-title">
          <p className="eyebrow">{content.projects}</p>
          <h2 id="project-title">{copy.workTitle}</h2>
          <p className="section-subtitle">{copy.workIntro}</p>
          <div className="project-grid">
            {projects.map(project => (
              <article className="project-card" key={project.name}>
                <p className="project-scope">{project[locale].scope}</p>
                <h3>{project.name}</h3>
                <p className="project-desc">{project[locale].description}</p>
                <ul className="stack" aria-label={locale === "es" ? "Tecnologías" : "Technologies"}>
                  {project.stack.map(tool => <li key={tool}>{tool}</li>)}
                </ul>
                <a className="proof" href={project.verification}>{project[locale].proof}</a>
                <div className="project-links">
                  <a href={project.href} aria-label={`${copy.code}, ${project.name}`}>{copy.code}</a>
                  <a href={project.detail} aria-label={`${copy.design}, ${project.name}`}>{copy.design}</a>
                  <a href={project.caseStudy} aria-label={`${project[locale].caseStudyLabel}, ${project.name}`}>
                    {project[locale].caseStudyLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="team">
            <div><p className="eyebrow">{copy.team}</p><a href={career.github + "/OT167-Java-server"}>{copy.teamProject}</a></div>
            <p>{copy.teamInfo}</p>
          </div>
        </section>

        <section className="wrap section experience" id="experience" aria-labelledby="career-title">
          <h2 id="career-title">{content.experience}</h2>
          <ol className="career-path">
            {content.jobs.map(([company, title, dates, summary, stack]) => (
              <li className="career-item" key={company}>
                <p className="dates">{dates}</p>
                <div>
                  <h3>{company}</h3><p className="career-role">{title}</p><p className="career-summary">{summary}</p><p className="career-stack">{stack}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="contact-section section" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-inner">
            <div><h2 id="contact-title">{copy.contactTitle}</h2><p>{copy.contactInfo}</p></div>
            <div className="contact-links">
              <a href={`mailto:${career.email}`}>{career.email}</a><a href={career.linkedin}>LinkedIn</a><a href={career.github}>GitHub</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap footer"><span>{career.name}</span><span>{content.location}</span></footer>
    </>
  );
}
