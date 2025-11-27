// Typewriter Effect for Hero Title with animated first letter & caret
const typewriterFirst = document.getElementById('typewriter-first');
const typewriterRest = document.getElementById('typewriter-rest');
const typewriterLive = document.getElementById('typewriter-live');
const caret = document.querySelector('.caret');

const phrases = [
    'Building growth autopilot for high-intent leads.',
    'AI copilots that book meetings while you sleep.',
    'Human-grade outreach with automated precision.'
];
const firstPalette = ['#ffbd59', '#fd9434', '#e3ce42', '#ae3724', '#d1462a', '#fd5934'];
const typingSpeed = 70;
const deletingSpeed = 42;
const holdDuration = 1700;
const leadInDelay = 320;
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderTypewriterText(displayLength, current) {
    const firstChar = current.charAt(0);
    const remainder = current.slice(1);
    const hasFirst = displayLength > 0;

    if (typewriterFirst) {
        typewriterFirst.textContent = hasFirst ? firstChar : '';
        const accent = firstPalette[wordIndex % firstPalette.length];
        typewriterFirst.style.background = accent;
        document.documentElement.style.setProperty('--secondary', accent);
    }

    if (typewriterRest) {
        typewriterRest.textContent = displayLength > 1 ? remainder.substring(0, displayLength - 1) : '';
    }

    if (typewriterLive) {
        typewriterLive.textContent = (hasFirst ? firstChar : '') + (typewriterRest?.textContent ?? '');
    }
}

function typeWriter() {
    if (!typewriterRest || !typewriterFirst) return;
    const current = phrases[wordIndex % phrases.length];
    const displayLength = charIndex;

    renderTypewriterText(displayLength, current);

    if (reduceMotion) {
        typewriterRest.textContent = current.slice(1);
        typewriterLive.textContent = current;
        caret?.classList.remove('is-typing');
        return;
    }

    const isAtEnd = displayLength === current.length;
    const isAtStart = displayLength === 0;
    caret?.classList.toggle('is-typing', !(isDeleting && isAtStart));

    if (!isDeleting && !isAtEnd) {
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && !isAtStart) {
        charIndex--;
        setTimeout(typeWriter, deletingSpeed);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex++;
        }
        const pause = isDeleting ? holdDuration : leadInDelay;
        setTimeout(typeWriter, pause);
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

// Reveal animations on scroll
const animatedBlocks = document.querySelectorAll('.animate');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

animatedBlocks.forEach(el => observer.observe(el));
