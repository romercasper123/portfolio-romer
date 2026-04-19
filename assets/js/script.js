// Init Icons
lucide.createIcons();

// Initialize Experience Slider
const swiper = new Swiper('.experience-slider', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
});

// Navbar Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// GMAIL AUTOMATIC SENDING LOGIC
document.getElementById('gmailForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const subjectLine = document.getElementById('subject').value;
    const messageBody = document.getElementById('message').value;
    const myEmail = "romercasper63@gmail.com";

    // Formating the body for a professional look
    const fullBody = `Hello Romero Casper,%0D%0A%0D%0AMy name is ${name}.%0D%0A%0D%0A${messageBody}%0D%0A%0D%0ABest regards,%0D%0A${name}`;

    // Gmail Direct Link (Desktop & Mobile Friendly)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${encodeURIComponent(subjectLine)}&body=${fullBody}`;

    // Open in new tab
    window.open(gmailUrl, '_blank');
});
