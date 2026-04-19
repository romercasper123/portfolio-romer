// Init Icons
lucide.createIcons();

// Swiper Config
new Swiper('.experience-slider', {
    loop: true,
    autoplay: { delay: 3500 },
    pagination: { el: '.swiper-pagination', clickable: true },
});

// Theme Logic
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
});

// Scroll Reveal Observer for "Slowmo Slide Right-to-Left"
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-right').forEach(el => observer.observe(el));

// Gmail Form Link
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const sub = document.getElementById('subject').value;
    const msg = document.getElementById('message').value;
    const myEmail = "romercasper63@gmail.com";
    
    const body = `Hi Romero,%0D%0A%0D%0AMy name is ${name}.%0D%0A%0D%0A${msg}`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${encodeURIComponent(sub)}&body=${body}`, '_blank');
});

// Navbar Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
});
