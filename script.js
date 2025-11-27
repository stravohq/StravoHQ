// Typewriter Effect for Hero Title
const typewriterText = document.getElementById('typewriter-text');
const words = ["We build your AI system in 14 days.", "Start with a free trial.", "No risk, no hassle."];
let wordIndex = 0;
let charIndex = 0;
let currentWord = "";
let isDeleting = false;

function typeWriter() {
    if (wordIndex === words.length) {
        wordIndex = 0;
    }

    currentWord = words[wordIndex];
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typewriterText.textContent = currentWord.substring(0, charIndex);

    if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1000);
    } else if (charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        setTimeout(typeWriter, 500);
    } else {
        setTimeout(typeWriter, 150);
    }
}

window.onload = typeWriter;

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
