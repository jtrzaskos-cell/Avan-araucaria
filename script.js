// =============================================
// AVANÇARAUCÁRIA - Script Unificado
// Funciona em todas as páginas
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%cAvançAraucária carregado com sucesso!', 'color: #3b82f6; font-weight: bold;');

    initRevealAnimations();
    setupEntitiesToggle();
    setupMobileMenu();
    setupContactForm();
    setupGalleryHover();
    setupSmoothScroll();
});

// =============================================
// 1. Reveal Animations (todas as páginas)
// =============================================
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => observer.observe(reveal));
}

// =============================================
// 2. Toggle de Entidades (index.html)
// =============================================
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

// =============================================
// 3. Menu Mobile
// =============================================
function setupMobileMenu() {
    const mobileBtn = document.getElementById('menu-mobile');
    if (!mobileBtn) return;

    mobileBtn.addEventListener('click', () => {
        alert('Menu mobile em desenvolvimento.\n\nEm breve teremos um menu deslizante completo.');
        // Futuro: Implementar drawer menu aqui
    });
}

// =============================================
// 4. Formulário de Contato (contato.html)
// =============================================
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = form.querySelector('input[type="text"]');
        alert(`✅ Mensagem enviada com sucesso!\n\nObrigado ${nome ? nome.value.split(' ')[0] : ''}!\nEntraremos em contato em breve.`);
        
        form.reset();
    });
}

// =============================================
// 5. Efeitos da Galeria (galerias.html)
// =============================================
function setupGalleryHover() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// =============================================
// 6. Scroll Suave para Links Internos
// =============================================
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

// =============================================
// Utilitários Globais
// =============================================

// Fecha alertas automaticamente (opcional)
function showTemporaryAlert(message, duration = 4000) {
    const alertBox = document.createElement('div');
    alertBox.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 text-sm';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => alertBox.remove(), 500);
    }, duration);
}

// =============================================
// Inicialização do Tailwind (caso necessário)
// =============================================
console.log('%cTodas as funcionalidades carregadas com sucesso!', 'color: #10b981; font-size: 13px;');