/*
 * 01. REFERENCIAS Y ESTADO. Seleccionamos elementos del HTML y guardamos qué zona de la
 * habitación está abierta. data.js debe cargarse antes de este archivo.
 */
const world = document.querySelector("#world");
const projectList = document.querySelector("#project-list");
const terminalContent = document.querySelector("#terminal-content");
let camera = "overview";
let currentProject = null;
let currentTerminal = "home";
/*
 * 02. SKILLS DE LA PARED. Cada entrada contiene el nombre visible, un campo de icono
 * reservado y su descripción. Se crean botones y se resaltan al pasar el mouse, usar el
 * teclado o tocar la pantalla.
 */
const skills = [
  ["HTML / CSS", "", "Estructura semántica y diseño responsivo."],
  ["JavaScript", "", "DOM, eventos y consumo de APIs."],
  ["Java+Spring", "", "Java, orientación a objetos y Spring Boot."],
  ["SQL", "", "Bases de datos relacionales y consultas."],
  ["Bootstrap", "", "Componentes e interfaces adaptables."],
  ["Git+GitHub", "", "Control de versiones y trabajo en equipo."],
];
const skillGrid = document.querySelector("#skill-grid");
skillGrid.innerHTML = skills
  .map(
    ([name, glyph], i) =>
      /* HTML */ `<button class="skill" data-skill="${i}" aria-pressed="false">
        ${name}
      </button>`,
  )
  .join("");
function inspectSkill(index) {
  const [name, , description] = skills[index];
  document.querySelector("#skill-name").textContent = name;
  document.querySelector("#skill-description").textContent = description;
  skillGrid.querySelectorAll("button").forEach((b, i) => {
    b.classList.toggle("active", i === index);
    b.setAttribute("aria-pressed", String(i === index));
  });
}
skillGrid.querySelectorAll("button").forEach((b) => {
  b.addEventListener("pointerenter", () =>
    inspectSkill(Number(b.dataset.skill)),
  );
  b.addEventListener("focus", () => inspectSkill(Number(b.dataset.skill)));
  b.addEventListener("click", () => {
    inspectSkill(Number(b.dataset.skill));
    setCamera("skills");
  });
});
/*
 * 03. LISTADO DE PROYECTOS. Dibuja las cuatro opciones del letrero. Los detalles vienen
 * del arreglo projects en data.js; los nombres cortos, iconos y subtítulos se definen aquí
 * para caber en el marco.
 */
function showProjectList(focus = false) {
  currentProject = null;
  projectList.innerHTML = projects
    .map(
      (p, i) =>
        /* HTML */ `<button
          class="project-row"
          data-project="${i}"
          aria-label="Abrir proyecto ${p.name}"
        >
          <span class="project-number">${p.n}</span
          ><span class="project-icon" aria-hidden="true"
            >${["R", "GR", "Z", "ZO"][i]}</span
          ><span class="project-label"
            ><strong
              >${["Rutta", "Gryffindor", "Ocarina of Time", "Web de Zelda"][
                i
              ]}</strong
            ><small
              >${["E-COMMERCE", "HACKATHON", "SITIO WEB", "WEB MONOGRAFIA DE ZELDA"][
                i
              ]}</small
            ></span
          >
        </button>`,
    )
    .join("");
  projectList.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => openProject(Number(b.dataset.project)));
    b.addEventListener(
      "pointerenter",
      () =>
        (document.querySelector("#project-status").textContent =
          "ABRIR " + projects[Number(b.dataset.project)].name.toUpperCase()),
    );
    b.addEventListener(
      "pointerleave",
      () =>
        (document.querySelector("#project-status").textContent =
          "SELECCIONA UNA MISIÓN"),
    );
  });
  document.querySelector("#project-status").textContent =
    "SELECCIONA UNA MISIÓN";
  if (focus) projectList.querySelector("button").focus({ preventScroll: true });
}
/*
 * 04. DETALLE DE UN PROYECTO. Cambia el contenido del mismo letrero, acerca la cámara y
 * permite abrir el repositorio. Volver restaura la lista; no se cambia de página.
 */
function openProject(index) {
  const p = projects[index];
  currentProject = index;
  projectList.innerHTML = /* HTML */ `<article
    class="project-details"
    tabindex="0"
    aria-label="Detalles de ${p.name}"
  >
    <div class="detail-top">
      <h3>${p.name}</h3>
      <button class="back-projects">Volver</button>
    </div>
    <p>${p.text}</p>
    ${tags(p.stack)}<a
      class="repo-link"
      href="${github + p.repo}"
      target="_blank"
      rel="noopener noreferrer"
      >Abrir repositorio</a
    >
  </article>`;
  projectList
    .querySelector(".back-projects")
    .addEventListener("click", () => showProjectList(true));
  document.querySelector("#project-status").textContent =
    "MISIÓN " + p.n + " / DETALLES";
  playEffect("project");
  setCamera("projects", false);
  projectList.querySelector("article").focus({ preventScroll: true });
  document.querySelector("#announcement").textContent =
    "Proyecto " + p.name + " abierto en la pared.";
}
/*
 * 05. TERMINAL DEL ESCRITORIO. Define el saludo inicial y muestra los textos de perfil,
 * trayectoria, contacto o inventario. El botón de copiar usa el portapapeles y avisa si el
 * navegador lo bloquea.
 */
const home = /* HTML */ `<div class="terminal-home">
  <div class="terminal-greeting">
    <span>&gt;</span> Hola, soy Christian<span class="cursor">_</span>
  </div>
  <p>
    Ingeniero en Sistemas Computacionales.<br />Aprendo, construyo y mejoro
    soluciones web.
  </p>
  <div class="terminal-command">
    // mi siguiente misión: Java Full Stack Jr.
  </div>
  <button class="terminal-action" data-open="about">Conóceme</button
  ><button class="terminal-action" data-open="contact">Hablemos</button
  ><a class="terminal-action" href="assets/Christian-Pinal-CV.pdf" download
    >↓ CV</a
  >
</div>`;
function showTerminal(key, zoom = true) {
  if (!["home", "about", "career", "contact", "skills"].includes(key)) return;
  currentTerminal = key;
  terminalContent.innerHTML =
    key === "home"
      ? home
      : /* HTML */ `<h2>${panels[key].title}</h2>
          ${panels[key].body}`;
  terminalContent.scrollTop = 0;
  document
    .querySelectorAll(".terminal-nav button")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.terminal === key)),
    );
  terminalContent
    .querySelectorAll("[data-open]")
    .forEach((b) =>
      b.addEventListener("click", () => showTerminal(b.dataset.open)),
    );
  const copy = document.querySelector("#copy-email");
  if (copy)
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("crisssg2@gmail.com");
        document.querySelector("#copy-status").textContent = " Correo copiado.";
      } catch {
        document.querySelector("#copy-status").textContent =
          " Selecciona el correo para copiarlo.";
      }
    });
  if (zoom) {
    if (camera === "terminal") playEffect("click");
    setCamera("terminal");
    terminalContent.focus({ preventScroll: true });
  }
}
document
  .querySelectorAll("[data-terminal]")
  .forEach((b) =>
    b.addEventListener("click", () => showTerminal(b.dataset.terminal)),
  );
/*
 * 06. CÁMARA Y TAMAÑO DE PANTALLA. Calcula escala y centro de la vista. Las coordenadas
 * corresponden al escenario de 1672 × 941 píxeles; CSS las aplica con transform. No mueve
 * al personaje.
 */
function cameraTransform() {
  const viewport = document.querySelector(".viewport").getBoundingClientRect();
  const w = viewport.width;
  const h = viewport.height;
  const mobile = w <= 760;
  const landscape = window.matchMedia("(max-height: 540px) and (min-aspect-ratio: 4/3)").matches;
  let scale, cx, cy;
  if (camera === "overview") {
    world.style.left = "50%";
    world.style.top = "50%";
    scale = Math.min(w / 1672, h / 941) * 0.985;
    cx = 836;
    cy = 470.5;
  } else {
    const header = document.querySelector(".hud").getBoundingClientRect();
    const controls = document.querySelector(".controls").getBoundingClientRect();
    const back = document.querySelector("#back-room").getBoundingClientRect();
    // En horizontal, los controles ocupan los laterales y liberan la altura.
    const left = landscape ? header.right - viewport.left + 12 : 12;
    const right = landscape ? controls.left - viewport.left - 12 : w - 12;
    const top = landscape ? 12 : header.bottom - viewport.top + 12;
    const bottom = landscape ? h - 12
      : Math.min(controls.top, back.top) - viewport.top - 12;
    const width = Math.max(1, right - left);
    const height = Math.max(1, bottom - top);
    const targets = {
      projects: { x: 655, y: 326, w: 345, h: 468 },
      skills: { x: 1180, y: 428, w: 390, h: 455 },
      terminal: { x: 594, y: 767, w: 470, h: 365 },
    };
    const target = targets[camera];
    world.style.left = `${left + width / 2}px`;
    world.style.top = `${top + height / 2}px`;
    scale = Math.min(width / target.w, height / target.h, mobile ? 1.65 : 1.85);
    cx = target.x;
    cy = target.y;
  }
  world.style.setProperty("--scale", String(Math.max(0.01, scale)));
  world.style.setProperty("--cx", String(cx));
  world.style.setProperty("--cy", String(cy));
}
/*
 * 07. NAVEGACIÓN POR LA HABITACIÓN. Actualiza las clases camera-..., el menú inferior y el
 * botón de regreso. Esc devuelve la vista general.
 */
function setCamera(next, effect = "auto") {
  if (!["overview", "projects", "skills", "terminal"].includes(next)) return;
  const changed = camera !== next;
  camera = next;
  if (effect && changed) playEffect(effect === "auto"
    ? (next === "terminal" ? "terminal" : "click") : effect);
  document.body.className = document.body.className
    .replace(/\bcamera-\S+/g, "")
    .trim();
  document.body.classList.add("camera-" + camera);
  document
    .querySelectorAll(".camera-controls button")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.camera === camera)),
    );
  document.querySelector("#back-room").hidden = camera === "overview";
  document.querySelector("#room-caption").textContent =
    camera === "overview"
      ? "EXPLORA LAS PAREDES Y PANTALLAS"
      : "DENTRO DEL LABORATORIO";
  cameraTransform();
}
document
  .querySelectorAll("[data-camera]")
  .forEach((b) =>
    b.addEventListener("click", () => setCamera(b.dataset.camera)),
  );
document.querySelector("#back-room").addEventListener("click", () => {
  setCamera("overview");
  document
    .querySelector('.camera-controls [data-camera="overview"]')
    .focus({ preventScroll: true });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    setCamera("overview");
    document
      .querySelector('.camera-controls [data-camera="overview"]')
      .focus({ preventScroll: true });
  }
});
/*
 * 08. PAUSAR ANIMACIONES. La clase paused detiene las animaciones del escenario sin
 * desactivar los botones.
 */
const motion = document.querySelector("#motion");
motion.addEventListener("click", () => {
  const paused = document.body.classList.toggle("paused");
  motion.setAttribute("aria-pressed", String(paused));
  motion.innerHTML = paused
    ? "▷ <span>Neón pausado</span>"
    : "Ⅱ <span>Neón activo</span>";
  motion.title = paused ? "Activar las animaciones" : "Pausar las animaciones";
});
/*
 * 09. PARTÍCULAS DE NEÓN. Crea pequeños puntos de luz; sus posiciones, colores y tiempos
 * se pasan a CSS mediante variables personalizadas.
 */
const particles = document.querySelector("#particles");
for (let i = 0; i < 22; i++) {
  const p = document.createElement("i");
  p.style.setProperty("--x", `${130 + ((i * 137) % 1270)}px`);
  p.style.setProperty("--y", `${430 + ((i * 83) % 470)}px`);
  p.style.setProperty("--duration", `${5 + (i % 5)}s`);
  p.style.setProperty("--delay", `${-i * 0.7}s`);
  p.style.setProperty("--color", ["#86fff5", "#ac92ff", "#ffd18b"][i % 3]);
  particles.append(p);
}
/*
 * 10. INICIO Y ACCESIBILIDAD. Ajusta la cámara al redimensionar, muestra el contenido
 * inicial y mantiene visible la zona que recibe el foco del teclado.
 */
let resizeFrame;
function scheduleCameraResize() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(cameraTransform);
}
window.addEventListener("resize", scheduleCameraResize);
window.visualViewport?.addEventListener("resize", scheduleCameraResize);
window.addEventListener("orientationchange", scheduleCameraResize);
// Recalcula cuando termina de cambiar el tamaño real de la pantalla o los controles.
if ("ResizeObserver" in window) {
  const cameraResizeObserver = new ResizeObserver(scheduleCameraResize);
  [".viewport", ".hud", ".controls"].forEach((selector) => {
    cameraResizeObserver.observe(document.querySelector(selector));
  });
}
document.fonts?.ready.then(scheduleCameraResize);
document.addEventListener("DOMContentLoaded", () => {
  showProjectList();
  showTerminal("home", false);
  world.classList.add("no-transition");
  setCamera("overview", false);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => world.classList.remove("no-transition")),
  );
});
document.querySelector(".viewport").addEventListener("focusin", (event) => {
  if (camera === "overview") return;
  const section = event.target.closest("#projects,#skills,#terminal");
  if (section && section.id !== camera) setCamera(section.id);
});
/*
 * 11. EASTER EGG DE MORONA. Abre el descubrimiento, permite darle una caricia y reinicia
 * su salto y corazones. moronaFound solo dura mientras esta página está abierta; se
 * reinicia al recargar. La lectura de offsetWidth permite reiniciar la animación al
 * repetir una caricia.
 */
const morona = document.querySelector("#morona");
const moronaNote = document.querySelector("#morona-note");
const moronaMessage = document.querySelector("#morona-message");
let moronaFound = false;
function celebrateMorona() {
  morona.classList.remove("celebrate");
  void morona.offsetWidth;
  morona.classList.add("celebrate");
}
function closeMorona(returnFocus = false) {
  moronaNote.hidden = true;
  morona.setAttribute("aria-expanded", "false");
  if (returnFocus) morona.focus({ preventScroll: true });
}
morona.addEventListener("click", () => {
  moronaNote.hidden = false;
  morona.setAttribute("aria-expanded", "true");
  moronaMessage.textContent = moronaFound
    ? "¡Volviste! Morona siempre tiene tiempo para una caricia."
    : "Guardiana del código y experta en pedir premios.";
  playEffect("morona");
  moronaFound = true;
  celebrateMorona();
  document.querySelector("#morona-close").focus({ preventScroll: true });
});
document
  .querySelector("#morona-close")
  .addEventListener("click", () => {
    playEffect("click");
    closeMorona(true);
  });
document.querySelector("#morona-pet").addEventListener("click", () => {
  playEffect("click");
  moronaMessage.textContent =
    "¡Guau! Morona te manda un lametón. Ya eres parte de su equipo.";
  celebrateMorona();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !moronaNote.hidden) closeMorona();
});
document
  .querySelectorAll("[data-camera]")
  .forEach((button) => button.addEventListener("click", () => closeMorona()));

/*
 * 12. SONIDO. Todos los archivos, volúmenes y controles de audio están aquí.
 * Los efectos y la música tienen estados independientes. No se genera ningún tono.
 */
const soundButton = document.querySelector("#sound-toggle");
const musicButton = document.querySelector("#music-toggle");
let soundEnabled = false;
let musicEnabled = false;
const effects = Object.fromEntries(Object.entries({
  click: "click-ui.mp3",
  project: "project-open.mp3",
  terminal: "terminal-open.mp3",
  morona: "morona-found.mp3",
  intro: "intro.mp3",
}).map(([name, file]) => {
  const audio = new Audio(`assets/sounds/${file}`);
  audio.preload = "auto";
  audio.volume = name === "morona" ? 0.12 : name === "intro" ? 0.35 : 0.3;
  return [name, audio];
}));
const music = new Audio("assets/sounds/ambient.mp3");
music.preload = "none";
music.loop = true;
const MUSIC_VOLUME = 0.16; // Fondo al 16%; ajusta este valor entre 0 y 1.
music.volume = MUSIC_VOLUME;

function updateAudioButtons() {
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
  soundButton.title = soundEnabled ? "Silenciar efectos" : "Activar efectos";
  document.querySelector("#sound-icon").textContent = soundEnabled ? "🔊" : "🔇";
  musicButton.setAttribute("aria-pressed", String(musicEnabled));
  musicButton.title = musicEnabled ? "Silenciar música de fondo" : "Activar música de fondo";
  document.querySelector("#music-icon").textContent = musicEnabled ? "♫" : "♫̸";
}

function stopEffects() {
  Object.values(effects).forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function playEffect(name) {
  if (!soundEnabled || document.hidden) return;
  const audio = effects[name];
  if (!audio) return;
  stopEffects(); // Evita amontonar sonidos cuando se pulsa rápidamente.
  audio.play().catch((error) => {
    if (!["AbortError", "NotAllowedError"].includes(error.name)) console.warn("No se pudo reproducir el efecto:", name);
  });
}

function resumeMusic() {
  if (!musicEnabled || document.hidden) return;
  music.play().catch((error) => {
    if (["AbortError", "NotAllowedError"].includes(error.name)) return;
    musicEnabled = false;
    updateAudioButtons();
  });
}

soundButton.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) playEffect("click");
  else stopEffects();
  updateAudioButtons();
});
musicButton.addEventListener("click", () => {
  musicEnabled = !musicEnabled;
  if (musicEnabled) resumeMusic();
  else music.pause();
  updateAudioButtons();
});

// Pausa al salir de la pestaña; solo retoma la música si seguía activada.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopEffects();
    music.pause();
  } else resumeMusic();
});

/* INTRODUCCIÓN. La elección inicial permite activar el audio con un gesto.
 * Después se muestran tres segundos de carga, con o sin sonido.
 * La música y los efectos se pueden cambiar por separado dentro del portafolio.
 */
const boot = document.querySelector(".boot");
const pageRegions = [...document.querySelectorAll(".hud, .viewport, .controls, .skip")];
const bootActions = document.querySelector(".boot-actions");
let introStarted = false;
let introTimer;
let introPending = false;
pageRegions.forEach((region) => { region.inert = true; });
boot.hidden = false;
document.querySelector("#enter-sound").focus();

function finishIntro() {
  boot.hidden = true;
  effects.intro.pause();
  effects.intro.currentTime = 0;
  pageRegions.forEach((region) => { region.inert = false; });
  music.volume = MUSIC_VOLUME;
  resumeMusic();
  document.querySelector('.camera-controls [data-camera="overview"]').focus({ preventScroll: true });
}
function resetIntroClock() {
  clearTimeout(introTimer);
  boot.classList.remove("loading");
  void boot.offsetWidth;
  boot.classList.add("loading");
  introTimer = window.setTimeout(finishIntro, 3000);
}
effects.intro.addEventListener("playing", () => {
  if (boot.hidden) {
    effects.intro.pause();
    return;
  }
  resetIntroClock();
});
function tryIntro() {
  if (boot.hidden || introPending || !soundEnabled) return;
  introPending = true;
  effects.intro.play().catch(() => {
    // Si se bloquea o falla el audio, la animación termina normalmente.
  }).finally(() => { introPending = false; });
}
function startIntro(withSound) {
  if (introStarted) return;
  introStarted = true;
  soundEnabled = withSound;
  musicEnabled = withSound;
  updateAudioButtons();
  bootActions.hidden = true;
  document.querySelector("#boot-status").textContent = "ENCENDIENDO EL LABORATORIO";
  boot.focus();
  resetIntroClock();
  if (withSound) {
    tryIntro();
    // Desbloquea la música en el mismo clic; se escucha al terminar la intro.
    music.volume = 0;
    resumeMusic();
  }
}
document.querySelector("#enter-sound").addEventListener("click", () => startIntro(true));
document.querySelector("#enter-silent").addEventListener("click", () => startIntro(false));

// Se ejecuta después de los botones para respetar cualquier decisión de silenciar.
function unlockBackground(event) {
  if (event.target.closest("#music-toggle")) return;
  if (boot.hidden && musicEnabled && music.paused) resumeMusic();
}
document.addEventListener("click", unlockBackground);
document.addEventListener("keydown", unlockBackground);
updateAudioButtons();
