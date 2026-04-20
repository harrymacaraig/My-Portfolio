// =============================================
//  Harry Macaraig — Design Studio | index.js
// =============================================


// ── 1. NAVBAR: shrink + shadow on scroll ──────────────────────────
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ── 2. SMOOTH SCROLL for all anchor links ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ── 3. SCROLL REVEAL: fade-in elements as you scroll ──────────────
const revealElements = document.querySelectorAll(
    '.card-container, .project-card, .service-card, .meet-cta, .card-container-2'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // animate once
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.classList.add('reveal'); // add base hidden state
    revealObserver.observe(el);
});

// Cycles through phrases on your hero heading
 
const phrases = [
    "Turning heads and conquering hearts",
    "Design that tells your story",
    "Bold. Playful. Unforgettable.",
    "Your brand, amplified."
];
 
const headingEl = document.querySelector('.header');
 
if (headingEl) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
 
    // Add a blinking cursor via CSS class
    headingEl.classList.add('typewriter');
 
    function type() {
        const currentPhrase = phrases[phraseIndex];
 
        if (isDeleting) {
            // Remove a character
            headingEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            headingEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
 
        // Typing speed: faster when deleting
        let speed = isDeleting ? 40 : 80;
 
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase before deleting
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }
 
        setTimeout(type, speed);
    }
 
    type();
}

const tiltCards = document.querySelectorAll('.project-card, .card-container');
 
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;   // mouse X inside card
        const y      = e.clientY - rect.top;    // mouse Y inside card
        const centerX = rect.width  / 2;
        const centerY = rect.height / 2;
 
        // Max tilt angle in degrees
        const maxTilt = 10;
 
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) *  maxTilt;
 
        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
 
    // Reset on mouse leave — smooth spring-back
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
 
    // Remove transition during active tilt so it feels snappy
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
});


// ── 4. ROTATING BADGE (My Belief section) ─────────────────────────
const badge = document.querySelector('.badge-icon img');

if (badge) {
    let angle = 0;
    setInterval(() => {
        angle += 0.5;
        badge.style.transform = `rotate(${angle}deg)`;
    }, 16); // ~60fps
}


// ── 5. CAROUSEL: pause on hover ───────────────────────────────────


// ── 6. FOOTER rotating icon ───────────────────────────────────────
const footerIcon = document.querySelector('.rotating-icon');

if (footerIcon) {
    let footerAngle = 0;
    setInterval(() => {
        footerAngle += 0.4;
        footerIcon.style.transform = `rotate(${footerAngle}deg)`;
    }, 16);
}


// ── 7. CURSOR: custom dot cursor (desktop only) ───────────────────
if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });

    // Grow on hovering links/buttons
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
}
