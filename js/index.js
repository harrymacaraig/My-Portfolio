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
            revealObserver.unobserve(entry.target); 
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.classList.add('reveal'); 
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
 
    // -- Lock the container height so nothing jumps --
    // Temporarily write all phrases to find the tallest one
    let maxHeight = 0;
    phrases.forEach(phrase => {
        headingEl.textContent = phrase;
        const h = headingEl.offsetHeight;
        if (h > maxHeight) maxHeight = h;
    });
    headingEl.style.minHeight = maxHeight + 'px';
    headingEl.style.display   = 'block';      // ensures minHeight works
    headingEl.textContent     = '';           // clear before typing starts
 
    // -- Typewriter logic --
    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;
 
    headingEl.classList.add('typewriter');
 
    function type() {
        const currentPhrase = phrases[phraseIndex];
 
        if (isDeleting) {
            headingEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            headingEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
 
        // Slower speeds (was 40/80 — now 60/120)
        let speed = isDeleting ? 60 : 120;
 
        if (!isDeleting && charIndex === currentPhrase.length) {
            speed      = 3000;   // pause longer at end of phrase (was 2000)
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting  = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed       = 600;   // pause before typing next phrase (was 400)
        }
 
        setTimeout(type, speed);
    }
 
    type();
}

const tiltCards = document.querySelectorAll('.project-card, .card-container');
 
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect    = card.getBoundingClientRect();
        const x       = e.clientX - rect.left;
        const y       = e.clientY - rect.top;
        const centerX = rect.width  / 2;
        const centerY = rect.height / 2;
        const maxTilt = 10;
 
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) *  maxTilt;
 
        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
 
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
 
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
});



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
