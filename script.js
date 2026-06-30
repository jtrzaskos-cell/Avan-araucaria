// =============================================
// Script.js - AvançAraucária (Atualizado com Dropdowns)
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%cAvançAraucária carregado com sucesso!', 'color: #3b82f6; font-weight: bold;');

    initRevealAnimations();
    setupEntitiesToggle();
    setupMobileMenu();
    setupDropdowns();
    setupSmoothScroll();
});

// ==================== DROPDOWNS (Hover) ====================
function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!link || !menu) return;

        // Mouse entra
        dropdown.addEventListener('mouseenter', () => {
            menu.style.display = 'block';
            menu.style.opacity = '1';
            menu.style.transform = 'translateY(0)';
        });

        // Mouse sai
        dropdown.addEventListener('mouseleave', () => {
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(10px)';
            
            // Aguarda a animação terminar antes de esconder
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    menu.style.display = 'none';
                }
            }, 250);
        });
    });
}

// ==================== REVEAL ANIMAÇÕES ====================
function initRevealAnimations() {
    const reveals = document.querySelectorAll('section, .reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => {
        reveal.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(40px)';
        observer.observe(reveal);
    });
}

// ==================== TOGGLE ENTIDADES ====================
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

// ==================== MENU MOBILE ====================
function setupMobileMenu() {
    const mobileBtn = document.getElementById('menu-mobile');
    if (!mobileBtn) return;

    mobileBtn.addEventListener('click', () => {
        alert('Menu mobile em desenvolvimento.\n\nEm breve teremos um drawer completo!');
    });
}

// ==================== SCROLL SUAVE ====================
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

// Finalização
console.log('%cTodas as funcionalidades (incluindo dropdowns) carregadas!', 'color: #10b981; font-size: 13px;');