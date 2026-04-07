document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Logic
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

    // 2. Typing Animation
    const typedTextElement = document.getElementById('typed-text');
    const phrases = [
  "Romer Casper.",
  "IT Staff.",
  "Software Dev.",
  "SQL.",
  "XAMPP.",
  "WAMP.",
  "MS Access."
];
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
        setTimeout(type, isDeleting ? 60 : 120);
    }
    type();

    // 3. FIXED MODAL LOGIC
    const modal = document.getElementById('contact-modal');
    const modalContent = modal.querySelector('div');
    const modalServiceName = document.getElementById('modal-service-name');
    const openBtns = document.querySelectorAll('.inquire-button');
    const closeBtn = document.getElementById('close-modal');
    const inquiryForm = document.getElementById('inquiry-form');

    const openModal = (service) => {
        modalServiceName.innerText = service;
        // Step 1: Remove 'hidden' and set display
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Step 2: Use a small timeout to trigger CSS transition
        setTimeout(() => {
            modal.classList.add('opacity-100');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    };

    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        
        // Wait for transition to finish before hiding
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
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

        const subject = encodeURIComponent(`Project Inquiry: ${service}`);
        const body = encodeURIComponent(`Hello Romer,\n\nMy name is ${name}.\n\nInquiry Details:\n${msg}`);
        
        window.location.href = `mailto:romercasper63@gmail.com?subject=${subject}&body=${body}`;
        closeModal();
        inquiryForm.reset();
    });
});
