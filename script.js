const progressBar = document.getElementById('scroll-progress');
const header = document.getElementById('siteHeader');
const toTop = document.getElementById('toTop');

function onScroll() {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    const scrolled = max > 0 ? el.scrollTop / max : 0;

    progressBar.style.width = (scrolled * 100) + '%';
    header.classList.toggle('scrolled', el.scrollTop > 8);
    toTop.classList.toggle('show', el.scrollTop > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Mobile menu */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMenu();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
});

/* Reveal on scroll */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* Active nav link */
const navAnchors = Array.from(navLinks.querySelectorAll('a[href^="#"]'));
const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach((section) => activeObserver.observe(section));
