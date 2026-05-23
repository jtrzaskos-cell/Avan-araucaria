document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-1', 'bg-white/95', 'shadow-xl', 'shadow-slate-200/50');
            header.classList.remove('py-3', 'bg-white/90');
        } else {
            header.classList.add('py-3', 'bg-white/90');
            header.classList.remove('py-1', 'bg-white/95', 'shadow-xl', 'shadow-slate-200/50');
        }
    });

    // Newsletter Captcha
    function generateNewsletterCaptcha() {
        const n1 = Math.floor(Math.random() * 20);
        const n2 = Math.floor(Math.random() * 10);
        const captchaLabel = document.getElementById('newsletter-captcha-label');
        if (captchaLabel) {
            captchaLabel.textContent = `${n1} + ${n2} = ?`;
        }
    }
    generateNewsletterCaptcha();

    // Reveal animations on scroll
    const observerOptions = { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Toggle Entities Visibility
    const toggleBtn = document.getElementById('toggle-entities');
    const extraEntities = document.getElementById('extra-entities');
    const toggleText = document.getElementById('toggle-text');

    if (toggleBtn && extraEntities) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = extraEntities.classList.contains('hidden');
            if (isHidden) {
                extraEntities.classList.remove('hidden');
                toggleText.textContent = 'Ver menos';
            } else {
                extraEntities.classList.add('hidden');
                toggleText.textContent = 'Ver todas as 15 entidades';
                
                // Smooth scroll back to entities section top if closing
                document.getElementById('entities-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});
