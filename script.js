document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Logic
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const updateTheme = (isDark) => {
        html.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
    themeBtn.addEventListener('click', () => updateTheme(!html.classList.contains('dark')));
    const savedTheme = localStorage.getItem('theme');
    updateTheme(savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));

    // 2. Typing Animation
    const typedTextElement = document.getElementById('typed-text');
    const phrases = ["Romer Casper.", "Creative Coder.", "Vibes Only.", "Part-Time Dev."];
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
        setTimeout(type, isDeleting ? 70 : 180);
    }
    type();

    // 3. Carousel Logic
    const items = document.querySelectorAll('.carousel-item');
    let cur = 0;
    setInterval(() => {
        items[cur].classList.remove('active');
        cur = (cur + 1) % items.length;
        items[cur].classList.add('active');
    }, 4500);

    // --- 4. RE-ENGINEERED MODAL SYSTEM ---
    const modal = document.getElementById('contact-modal');
    const modalServiceName = document.getElementById('modal-service-name');
    const inquireButtons = document.querySelectorAll('.inquire-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const inquiryForm = document.getElementById('inquiry-form');

    // Open logic
    inquireButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const service = btn.getAttribute('data-service');
            modalServiceName.innerText = service;

            // Remove hidden first, set flex
            modal.classList.remove('hidden');
            modal.classList.add('flex');

            // Timeout to allow the browser to register the flex state before starting opacity transition
            setTimeout(() => {
                modal.classList.add('is-visible');
            }, 10);
        });
    });

    // Close logic
    const closeInquiryModal = () => {
        modal.classList.remove('is-visible');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300); // matches the duration-300 in Tailwind
    };

    closeModalBtn.addEventListener('click', closeInquiryModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeInquiryModal(); });

    // Handle Email Generation
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const clientName = document.getElementById('modal-name').value;
        const clientMsg = document.getElementById('modal-message').value;
        const projectType = modalServiceName.innerText;

        const emailSubject = encodeURIComponent(`Inquiry: ${projectType}`);
        const emailBody = encodeURIComponent(`Hi Romer,\n\nMy name is ${clientName}.\n\nI am interested in the ${projectType}.\n\nMessage:\n${clientMsg}\n\nTalk soon!`);

        // Trigger Mail Client
        window.location.href = `mailto:romercasper63@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        closeInquiryModal();
        inquiryForm.reset();
    });

    // 5. Scroll Spy Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(s => { if (pageYOffset >= s.offsetTop - 200) currentSection = s.getAttribute('id'); });
        navLinks.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href').includes(currentSection)) l.classList.add('active');
        });
    });
});
