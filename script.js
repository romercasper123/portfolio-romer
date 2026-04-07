document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Logic ---
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const updateTheme = (isDark) => {
        html.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
    themeBtn.addEventListener('click', () => updateTheme(!html.classList.contains('dark')));
    const savedTheme = localStorage.getItem('theme');
    updateTheme(savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));

    // --- 2. Vibes Typing Logic ---
    const typedTextElement = document.getElementById('typed-text');
    const phrases = ["Romer Casper.", "A Vibes Coder.", "Part-Time Dev.", "Freelance Hero."];
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
        setTimeout(type, isDeleting ? 70 : 150);
    }
    type();

    // --- 3. Image Carousel ---
    const items = document.querySelectorAll('.carousel-item');
    let cur = 0;
    setInterval(() => {
        items[cur].classList.remove('active');
        cur = (cur + 1) % items.length;
        items[cur].classList.add('active');
    }, 5000);

    // --- 4. FIXED: Modal Inquiry Logic ---
    const modal = document.getElementById('contact-modal');
    const modalServiceName = document.getElementById('modal-service-name');
    const openBtns = document.querySelectorAll('.inquire-button');
    const closeBtn = document.getElementById('close-modal');
    const inquiryForm = document.getElementById('inquiry-form');

    // Open Modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-service');
            modalServiceName.innerText = service;

            // Remove hidden and add flex
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Trigger animation
            setTimeout(() => {
                modal.classList.add('active-state');
            }, 10);
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active-state');
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Handle Inquiry Submit (Construct Email)
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('modal-name').value;
        const msg = document.getElementById('modal-message').value;
        const service = modalServiceName.innerText;

        // Build Email components
        const subject = encodeURIComponent(`Project Inquiry: ${service}`);
        const body = encodeURIComponent(`Hello Romer,\n\nMy name is ${name}.\n\nMessage:\n${msg}\n\nCheers!`);
        
        // Open Mailto
        window.location.href = `mailto:romercasper63@gmail.com?subject=${subject}&body=${body}`;

        closeModal();
        inquiryForm.reset();
    });

    // --- 5. Scroll Spy ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let curr = '';
        sections.forEach(s => { if (pageYOffset >= s.offsetTop - 200) curr = s.getAttribute('id'); });
        navLinks.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href').includes(curr)) l.classList.add('active');
        });
    });
});
