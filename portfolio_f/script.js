/* ============================================================
   ALEX | CSE PORTFOLIO — script.js
   Sections:
   01. Custom Cursor
   02. Header Scroll Effect
   03. Mobile Menu
   04. Active Nav on Scroll
   05. Typing Effect
   06. Scroll Reveal
   07. Skill Bars Animation
   08. Contact Form
   09. Smooth Scroll
============================================================ */

/* ── 01. CUSTOM CURSOR ──────────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
});

setInterval(() => {
    follower.style.left = mouseX + 'px';
    follower.style.top  = mouseY + 'px';
}, 50);

document.querySelectorAll('a, button, .project-card, .blog-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform   = 'translate(-50%, -50%) scale(1.8)';
        follower.style.width     = '60px';
        follower.style.height    = '60px';
        follower.style.opacity   = '0.3';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
        follower.style.width     = '36px';
        follower.style.height    = '36px';
        follower.style.opacity   = '0.6';
    });
});

/* ── 02. HEADER SCROLL EFFECT ───────────────────────────── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
});

/* ── 03. MOBILE MENU ────────────────────────────────────── */
const menuBtn = document.getElementById('menuBtn');
const nav     = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.innerHTML = nav.classList.contains('open')
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

/* ── 04. ACTIVE NAV ON SCROLL ───────────────────────────── */
function updateActiveNav() {
    const sections  = document.querySelectorAll('section');
    const navLinks  = document.querySelectorAll('nav a');
    let current = '';

    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
}

/* ── 05. TYPING EFFECT ──────────────────────────────────── */
const words    = ['Data Structures', 'Algorithms', 'Machine Learning', 'Deep Learning', 'Problem Solving', 'Building AI'];
let wi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
    const word = words[wi];
    if (!deleting) {
        typingEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        typingEl.textContent = word.slice(0, --ci);
        if (ci === 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
        }
    }
    setTimeout(type, deleting ? 60 : 110);
}
type();

/* ── 06. SCROLL REVEAL ──────────────────────────────────── */
const reveals  = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(r => revealObserver.observe(r));

/* ── 07. SKILL BARS ANIMATION ───────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.3 });

const skillSection = document.getElementById('skills');
if (skillSection) skillObserver.observe(skillSection);

/* ── 08. CONTACT FORM ───────────────────────────────────── */
function handleSubmit(btn) {
    btn.innerHTML          = '<i class="fa-solid fa-check"></i> Sent!';
    btn.style.background   = '#2d7a2d';
    btn.style.borderColor  = '#2d7a2d';
    setTimeout(() => {
        btn.innerHTML         = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.style.background  = '';
        btn.style.borderColor = '';
    }, 3000);
}

/* ── 09. SMOOTH SCROLL (offset fix for fixed header) ───── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});
