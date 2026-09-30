# Dev Room · Christian Pinal

Abre la carpeta en VS Code y ejecuta `index.html` con Live Server. No necesita npm ni compilación.

## Inicio y audio

- La carga empieza directamente y dura tres segundos, sin pantalla de selección.
- Se intenta reproducir la introducción automáticamente junto con la carga, sin botones ni avisos. Si el navegador bloquea el audio, la carga continúa en silencio. La música se reintenta al interactuar dentro del portafolio.
- La bocina controla los efectos; la nota musical controla únicamente el fondo.
- El fondo está al 16%, se repite y se pausa al cambiar de pestaña.
- Morona tiene volumen al 12% (antes 30%) y su sonido especial al pulsarla. Darle una caricia y cerrar su mensaje usan el clic normal.

## Organización

- `index.html`: estructura y controles por secciones.
- `data.js`: textos, enlaces y datos de los proyectos.
- `style.css`: estilos comentados; las animaciones añadidas están junto a sus componentes. La sección 19, al final, contiene los controles de sonido.
- `app.js`: interacción por secciones. La sección 12, al final, reúne archivos, volúmenes, reproducción y controles de sonido, incluida la introducción.
- `assets/sounds/`: audios personalizados con nombres normalizados.

| Archivo | Uso |
|---|---|
| click-ui.mp3 | Navegación |
| project-open.mp3 | Abrir los detalles de un proyecto |
| terminal-open.mp3 | Entrar a la terminal |
| morona-found.mp3 | Pulsar a Morona |
| intro.mp3 | Carga inicial |
| ambient.mp3 | Música de fondo |

Para ajustar el fondo, cambia `MUSIC_VOLUME = 0.16` en la sección de sonido.

## Actualizar tu copia

Copia los archivos de este ZIP a tu proyecto y conserva tu carpeta `.git`. Sustituye `index.html`, `style.css`, `app.js` y `README.md`; agrega `assets/sounds/`. La antigua carpeta `assets/Sounds/` ya no se utiliza. No se incluyen el historial de Git ni configuraciones del editor.
