// Typewriter Effect for Hero Title
const typewriterText = document.getElementById('typewriter-text');
const phrases = [
    'Building growth autopilot for high-intent leads.',
    'AI copilots that book meetings while you sleep.',
    'Human-grade outreach with automated precision.'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!typewriterText) return;
    const current = phrases[wordIndex % phrases.length];
    typewriterText.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex < current.length) {
        charIndex++;
        setTimeout(typeWriter, 90);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeWriter, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex++;
        }
        setTimeout(typeWriter, isDeleting ? 1200 : 350);
    }
}

typeWriter();

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav');

mobileMenu?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
    mobileMenu.setAttribute('aria-expanded', (!expanded).toString());
});

// Smooth Scrolling
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const expanded = item.getAttribute('aria-expanded') === 'true';
        item.setAttribute('aria-expanded', (!expanded).toString());
        item.querySelector('.caret').textContent = expanded ? '+' : '−';
    });
});
