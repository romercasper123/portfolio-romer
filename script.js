document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    const updateTheme = (isDark) => {
        html.classList.toggle('dark', isDark);
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    themeBtn.addEventListener('click', () => updateTheme(!html.classList.contains('dark')));
    const savedTheme = localStorage.getItem('theme');
    updateTheme(savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));

    // 2. Typing Logic
    const typedTextElement = document.getElementById('typed-text');
    const phrases = ["Romer Casper.", "IT Staff @ PRC.", "Full-Stack Dev.", "SQL Expert."];
    let pIdx = 0, cIdx = 0, isDeleting = false;

    function type() {
        const current = phrases[pIdx];
        typedTextElement.innerText = current.substring(0, cIdx);
        if (!isDeleting && cIdx < current.length) cIdx++;
        else if (isDeleting && cIdx > 0) cIdx--;
        else {
            isDeleting = !isDeleting;
            if (!isDeleting) pIdx = (pIdx + 1) % phrases.length;
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();

    // 3. Carousel
    const items = document.querySelectorAll('.carousel-item');
    let cur = 0;
    setInterval(() => {
        items[cur].classList.remove('active');
        cur = (cur + 1) % items.length;
        items[cur].classList.add('active');
    }, 4000);

    // 4. FIXED MODAL LOGIC
    const modal = document.getElementById('contact-modal');
    const modalServiceName = document.getElementById('modal-service-name');
    const openBtns = document.querySelectorAll('.inquire-button');
    const closeBtn = document.getElementById('close-modal');
    const inquiryForm = document.getElementById('inquiry-form');

    const openModal = (service) => {
        modalServiceName.innerText = service;
        modal.style.display = 'flex'; // Ensure display is flex
        setTimeout(() => {
            modal.classList.add('active-state');
        }, 10);
    };

    const closeModal = () => {
        modal.classList.remove('active-state');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-service');
            openModal(service);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('modal-name').value;
        const msg = document.getElementById('modal-message').value;
        const service = modalServiceName.innerText;
        const subject = encodeURIComponent(`Inquiry: ${service}`);
        const body = encodeURIComponent(`Hi Romer,\n\nI'm ${name}.\n\nProject Details:\n${msg}`);
        window.location.href = `mailto:romercasper63@gmail.com?subject=${subject}&body=${body}`;
        closeModal();
        inquiryForm.reset();
    });
});
