/* Icono LinkedIn (SVG inline) */
const ICON_LINKEDIN =
  '<svg class="card__teacher-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

/* ─── Utilidades ─── */

function esc(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

function initials(name) {
  return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join('');
}

/* ─── Renderizado ─── */

function renderNav() {
  const first = DATA.perfil.nombre.split(' ')[0];
  document.getElementById('nav-brand').textContent = first;
  document.title = `${DATA.perfil.nombre} · Portafolio`;
}

function renderHero() {
  const { nombre, fotoURL, titular, email, linkedin, github } = DATA.perfil;

  const photo = document.getElementById('hero-photo');
  photo.src = fotoURL;
  photo.alt = `Foto de ${nombre}`;

  document.getElementById('hero-name').textContent    = nombre;
  document.getElementById('hero-titular').textContent = titular;

  const buttons = [];
  if (linkedin) buttons.push(`<a href="${esc(linkedin)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">LinkedIn</a>`);
  if (github)   buttons.push(`<a href="${esc(github)}"   target="_blank" rel="noopener noreferrer" class="btn btn--ghost">GitHub</a>`);
  if (email)    buttons.push(`<a href="mailto:${esc(email)}" class="btn btn--ghost">Correo</a>`);

  document.getElementById('hero-buttons').innerHTML = buttons.join('');
}

function renderAbout() {
  document.getElementById('about-bio').textContent = DATA.perfil.bio;
}

function renderCursos() {
  document.getElementById('cursos-grid').innerHTML = DATA.cursos.map(c => {
    let teacherHtml = '';
    if (c.profesor && c.profesorLinkedin) {
      // Nombre + enlace a LinkedIn
      teacherHtml = `
        <a href="${esc(c.profesorLinkedin)}" target="_blank" rel="noopener noreferrer" class="card__teacher">
          ${ICON_LINKEDIN}${esc(c.profesor)}
        </a>`;
    } else if (c.profesor) {
      // Solo nombre, sin enlace
      teacherHtml = `<span class="card__teacher card__teacher--plain">${esc(c.profesor)}</span>`;
    }

    return `
      <div class="card">
        <span class="card__ciclo">${esc(c.ciclo)}</span>
        <h3 class="card__name">${esc(c.nombre)}</h3>
        <p class="card__desc">${esc(c.descripcion)}</p>
        ${teacherHtml}
      </div>
    `;
  }).join('');
}

function renderCompaneros() {
  document.getElementById('companeros-grid').innerHTML = DATA.companeros.map(p => `
    <a href="${esc(p.sitioURL)}" target="_blank" rel="noopener noreferrer" class="peer-card">
      <div class="peer-card__avatar">${esc(initials(p.nombre))}</div>
      <span class="peer-card__name">${esc(p.nombre)}</span>
      <span class="peer-card__cta">Ver sitio →</span>
    </a>
  `).join('');
}

function renderFooter() {
  const { nombre, email, linkedin, github } = DATA.perfil;

  const links = [];
  if (email)    links.push(`<a href="mailto:${esc(email)}" class="footer__link">✉&nbsp;${esc(email)}</a>`);
  if (linkedin) links.push(`<a href="${esc(linkedin)}" target="_blank" rel="noopener noreferrer" class="footer__link">LinkedIn</a>`);
  if (github)   links.push(`<a href="${esc(github)}"   target="_blank" rel="noopener noreferrer" class="footer__link">GitHub</a>`);

  document.getElementById('footer-links').innerHTML  = links.join('');
  document.getElementById('footer-name').textContent = nombre;
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

/* ─── Comportamiento ─── */

function setupMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

function setupScrollEffects() {
  const nav      = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── Init ─── */

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderHero();
  renderAbout();
  renderCursos();
  renderCompaneros();
  renderFooter();
  setupMobileNav();
  setupScrollEffects();
});
