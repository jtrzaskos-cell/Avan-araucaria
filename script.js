// =============================================
// Script.js - AvançAraucária (Atualizado)
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%cAvançAraucária carregado com sucesso!', 'color: #3b82f6; font-weight: bold;');

    initRevealAnimations();
    setupEntitiesToggle();
    setupMobileMenu();
    setupSmoothScroll();
});

// 1. Reveal Animations
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        reveal.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(40px)';
        observer.observe(reveal);
    });
}

// 2. Toggle de Entidades
function setupEntitiesToggle() {
    const toggleBtn = document.getElementById('toggle-entities');
    if (!toggleBtn) return;

    const toggleText = document.getElementById('toggle-text');
    const toggleIcon = document.getElementById('toggle-icon');
    const extraEntities = document.querySelectorAll('.extra');

    let isExpanded = false;

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;

        extraEntities.forEach(card => {
            card.classList.toggle('hidden', !isExpanded);
        });

        if (isExpanded) {
            toggleText.textContent = 'Mostrar menos';
            toggleIcon.style.transform = 'rotate(180deg)';
        } else {
            toggleText.textContent = 'Ver todas as 15 entidades';
            toggleIcon.style.transform = 'rotate(0deg)';
        }
    });
}

// 3. Menu Mobile
function setupMobileMenu() {
    const mobileBtn = document.getElementById('menu-mobile');
    if (!mobileBtn) return;

    mobileBtn.addEventListener('click', () => {
        alert('Menu mobile em desenvolvimento.\n\nEm breve teremos um drawer completo!');
    });
}

// 4. Scroll Suave
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicialização
console.log('%cTodas as funcionalidades carregadas!', 'color: #10b981; font-size: 13px;');