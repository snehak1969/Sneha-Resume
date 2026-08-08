// Scroll progress bar
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
    const el = document.documentElement;
    const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
    progressBar.style.width = (scrolled * 100) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

// Typewriter effect in hero
const typeText = 'QA Engineer | SDET | Automation & Manual Testing';
const typedEl = document.getElementById('typed-line');
let idx = 0;
function type() {
    if (idx <= typeText.length) {
        typedEl.textContent = typeText.slice(0, idx);
        idx++;
        setTimeout(type, 55);
    }
}

// Reveal on scroll + animate skill bars
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skills-block')) {
                entry.target.querySelectorAll('.bar').forEach((bar, i) => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.level + '%';
                    }, i * 120);
                });
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

window.addEventListener('load', () => setTimeout(type, 700));
