/*
 * 01. FUNCIONES DE APOYO. La URL base y las funciones tags y link crean etiquetas y
 * enlaces reutilizables. Este archivo contiene datos y plantillas, no los eventos de clic.
 */
const github = "https://github.com/";
const tags = (items) =>
  /* HTML */ `<div class="tags">
    ${items.map((x) => /* HTML */ `<span>${x}</span>`).join("")}
  </div>`;
const link = (url, label) =>
  /* HTML */ `<a
    class="link-btn"
    href="${url}"
    target="_blank"
    rel="noopener noreferrer"
    >${label}</a
  >`;
/*
 * 02. DATOS DE PROYECTOS. Edita name, text, stack y repo para actualizar la información.
 * repo es propietario/repositorio, sin la URL base. La pared tiene cuatro espacios; para
 * agregar más también adapta app.js y el tamaño del letrero en style.css.
 */
const projects = [
  {
    n: "01",
    name: "Rutta",
    type: "E-COMMERCE · PROYECTO EN EQUIPO",
    text: "Una experiencia de compra para amantes del senderismo. Participé en la investigación de usuarios, definición de requisitos y planeación del producto. Esta versión del frontend incluye catálogo, filtros, favoritos y carrito; el backend con Java, Spring Boot y SQL forma parte de la arquitectura planeada.",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    repo: "Sofiaacastillo/Proyecto-Rutta",
  },
  {
    n: "02",
    name: "Gryffindor Resistance",
    type: "HACKATHON · FRONTEND",
    text: "Portal temático de reclutamiento desarrollado en equipo. Mi aportación: lógica para renderizar tarjetas de personajes, diseño responsivo y correcciones en la integración de estilos. Colaboración mediante ramas y pull requests.",
    stack: ["JavaScript", "Bootstrap", "Git", "GitHub"],
    repo: "DanielCastroPerez/Gryffindor-Resistance",
  },
  {
    n: "03",
    name: "Ocarina of Time",
    type: "SITIO WEB · PROYECTO ACADÉMICO",
    text: "Un sitio de recomendación sobre The Legend of Zelda: Ocarina of Time. Práctica de HTML semántico, diseño adaptable, tarjetas, navegación y modales de Bootstrap con una identidad visual temática.",
    stack: ["HTML5", "CSS3", "Bootstrap"],
    repo: "ChrisPort12/ocarina-of-time",
  },
  {
    n: "04",
    name: "Catálogo con API",
    type: "LABORATORIO · JAVASCRIPT ASÍNCRONO",
    text: "Práctica de consumo de una API para mostrar productos y consultar sus detalles en un modal. Trabajo con módulos, programación asíncrona, manipulación del DOM y delegación de eventos.",
    stack: ["JavaScript", "API", "DOM"],
    repo: "ChrisPort12/async",
  },
];
/*
 * 03. TRAYECTORIA Y PANELES. checkpoint construye una entrada de la línea del tiempo.
 * panels reúne el contenido que la terminal puede mostrar. Las plantillas con acentos
 * graves permiten insertar valores usando ${...}.
 */
const checkpoint = (date, title, text) =>
  /* HTML */ `<article class="checkpoint">
    <small>${date}</small>
    <h3>${title}</h3>
    <p>${text}</p>
  </article>`;
const panels = {
  projects: {
    code: "01 / MISSION LOG",
    title: "Proyectos",
    body: /* HTML */ `<p class="lead">
        Ideas llevadas al código. Una selección de mi trabajo y aprendizaje.
      </p>
      ${projects
        .map(
          (p) =>
            /* HTML */ `<article class="project">
              <div class="project-meta">
                <span>${p.n}</span><span>${p.type}</span>
              </div>
              <h3>${p.name}</h3>
              <p>${p.text}</p>
              ${tags(p.stack)}${link(github + p.repo, "Ver repositorio")}
            </article>`,
        )
        .join("")}${link(
        github + "ChrisPort12?tab=repositories",
        "Explorar todos los repositorios",
      )}`,
  },

  /*
   * INVENTARIO COMPLETO. Incluye conocimientos técnicos, herramientas, habilidades blandas e
   * idiomas; es más amplio que las seis placas de la pared.
   */

  skills: {
    code: "02 / INVENTARIO",
    title: "Mi stack & habilidades",
    body: /* HTML */ `<p class="lead">
        Herramientas que uso y conocimientos que sigo desarrollando como Java
        Full Stack Jr.
      </p>
      <section class="skill-group">
        <h3>Backend & datos</h3>
        ${tags(["Java", "Spring Boot", "SQL"])}
      </section>
      <section class="skill-group">
        <h3>Frontend</h3>
        ${tags([
          "HTML5",
          "CSS3",
          "JavaScript",
          "Bootstrap",
          "Diseño responsivo",
          "DOM",
          "localStorage",
        ])}
      </section>
      <section class="skill-group">
        <h3>Herramientas de desarrollo</h3>
        ${tags(["Git", "GitHub", "VS Code", "IntelliJ IDEA", "WSL / Ubuntu"])}
      </section>
      <section class="skill-group">
        <h3>Conocimientos complementarios</h3>
        ${tags([
          "Excel avanzado",
          "Office 365",
          "Redes y dispositivos",
          "Ciberseguridad",
          "Servidores",
          "Videovigilancia",
        ])}
      </section>
      <section class="skill-group">
        <h3>Cómo trabajo</h3>
        ${tags([
          "Adaptabilidad",
          "Trabajo en equipo",
          "Escucha activa",
          "Gestión del tiempo",
          "Resolución de conflictos",
        ])}
      </section>
      <section class="skill-group">
        <h3>Idiomas</h3>
        ${tags(["Español · Nativo", "Inglés · A2"])}
      </section>`,
  },

  /*
   * PERFIL. Presentación profesional, objetivo y enlaces al CV y LinkedIn.
   */

  about: {
    code: "03 / PLAYER PROFILE",
    title: "Hola, soy Christian.",
    body: /* HTML */ `<div class="bio">
      <p>
        Soy Ingeniero en Sistemas Computacionales y desarrollador Java Full
        Stack Jr., desde Metepec, Estado de México.
      </p>
      <p>
        Mi experiencia en gestión de procesos, control de información y soporte
        tecnológico me enseñó a entender las necesidades de las personas antes
        de proponer una solución. Hoy llevo ese enfoque al desarrollo web.
      </p>
      <p>
        Me interesa participar en todo el proceso: investigar el problema,
        planear funcionalidades, construir interfaces y colaborar para convertir
        una idea en una aplicación útil.
      </p>
      <h3>Mi siguiente misión</h3>
      <p>
        Incorporarme a un equipo como desarrollador junior, aportar mi capacidad
        de análisis y aprender buenas prácticas mientras construyo soluciones
        funcionales.
      </p>
      ${tags([
        "Pensamiento analítico",
        "Aprendizaje continuo",
        "Colaboración",
      ])}<a class="link-btn" href="assets/Christian-Pinal-CV.pdf" download
        >Descargar mi CV</a
      >${link(
        "https://www.linkedin.com/in/christian-pinal-cordero-575a60327/",
        "Ver LinkedIn",
      )}
    </div>`,
  },

  /*
   * TRAYECTORIA. Formación, experiencia y cursos ordenados mediante checkpoint.
   */

  career: {
    code: "04 / CHECKPOINTS",
    title: "Mi trayectoria",
    body: /* HTML */ `<p class="lead">
        De resolver necesidades operativas a construir productos digitales.
      </p>
      <div class="timeline">
        ${checkpoint(
          "JULIO 2026 — ACTUALIDAD",
          "Java Full Stack · Generation México",
          "Formación intensiva en desarrollo web. Aplicación de conocimientos técnicos y colaboración en proyectos de equipo como Rutta.",
        )}${checkpoint(
          "SEPTIEMBRE 2026",
          "Hackathon · Gryffindor Resistance",
          "Desarrollo frontend: tarjetas dinámicas, diseño responsivo e integración de estilos con control de versiones.",
        )}${checkpoint(
          "2023 — 2025",
          "Ingeniería en Sistemas Computacionales",
          "Universidad Tecnológica Latinoamericana (UTEL). Titulado.",
        )}${checkpoint(
          "AGOSTO 2023 — SEPTIEMBRE 2024",
          "Taller Villafaña",
          "Gestión administrativa, análisis de productividad e inventarios. Implementación de una solución de gestión de citas, clientes, existencias y reportes; capacitación al personal.",
        )}${checkpoint(
          "MAYO — AGOSTO 2023",
          "Ferretería La Surtida",
          "Contacto con proveedores, control de inventarios y generación de órdenes de compra.",
        )}
      </div>
      <section class="skill-group">
        <h3>Formación complementaria</h3>
        <div class="timeline">
          ${checkpoint(
            "MAYO 2025 · UTEL",
            "Diplomados internacionales",
            "Asesoría en Ingeniería en Computación y Análisis en Sistemas Computacionales.",
          )}${checkpoint(
            "MARZO 2024 · CISCO NETWORKING ACADEMY",
            "Redes y ciberseguridad",
            "Fundamentos de la ciberseguridad. Creación de redes y dispositivos de red.",
          )}
        </div>
      </section>`,
  },

  /*
   * CONTACTO. Correo, redes y descarga del CV. Si cambias el correo, actualiza también el
   * valor que copia app.js.
   */

  contact: {
    code: "05 / NUEVA MISIÓN",
    title: "Construyamos algo juntos.",
    body: /* HTML */ `<p class="lead">
        Busco una oportunidad como Java Full Stack Jr. Si tienes un proyecto o
        una vacante, conversemos.
      </p>
      <div class="contact-box">
        <a href="mailto:crisssg2@gmail.com">crisssg2@gmail.com</a
        ><button id="copy-email">Copiar correo</button
        ><span id="copy-status" role="status"></span>
      </div>
      ${link(
        "https://www.linkedin.com/in/christian-pinal-cordero-575a60327/",
        "LinkedIn",
      )}${link(github + "ChrisPort12", "GitHub")}<a
        class="link-btn"
        href="assets/Christian-Pinal-CV.pdf"
        download
        >Descargar CV</a
      >
      <p class="lead" style="margin-top:24px">
        Metepec, Estado de México · Español / Inglés A2
      </p>`,
  },
};
