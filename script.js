// script.js

document.addEventListener('DOMContentLoaded', function() {

    // ==================== MENU MOBILE ====================
    const menuMobileBtn = document.getElementById('menu-mobile');
    const nav = document.querySelector('nav');

    if (menuMobileBtn) {
        menuMobileBtn.addEventListener('click', function() {
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex');
            nav.classList.toggle('flex-col');
            nav.classList.toggle('absolute');
            nav.classList.toggle('top-full');
            nav.classList.toggle('left-0');
            nav.classList.toggle('w-full');
            nav.classList.toggle('bg-white');
            nav.classList.toggle('shadow-lg');
            nav.classList.toggle('p-4');
            nav.classList.toggle('lg:hidden');
        });
    }

    // ==================== DROPDOWN INSTITUCIONAL ====================
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const submenu = dropdown.querySelector('.dropdown-menu');

        if (link && submenu) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Fecha todos os outros dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== submenu) {
                        menu.classList.add('hidden');
                    }
                });

                // Toggle do submenu atual
                submenu.classList.toggle('hidden');
            });
        }
    });

    // Fecha dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
        }
    });

    // ==================== TOGGLE ENTIDADES (Ver todas) ====================
    const toggleBtn = document.getElementById('toggle-entities');
    const toggleText = document.getElementById('toggle-text');
    const toggleIcon = document.getElementById('toggle-icon');
    const extraEntities = document.querySelectorAll('.extra');

    let expanded = false;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            expanded = !expanded;

            extraEntities.forEach(entity => {
                entity.classList.toggle('hidden', !expanded);
            });

            // Atualiza texto e ícone
            if (expanded) {
                toggleText.textContent = 'Ver menos';
                toggleIcon.style.transform = 'rotate(180deg)';
            } else {
                toggleText.textContent = 'Ver todas as 15 entidades';
                toggleIcon.style.transform = 'rotate(0deg)';
            }
        });
    }

    // ==================== EFEITOS ADICIONAIS ====================

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hover effect nas cards (melhor visual)
    const cards = document.querySelectorAll('.entity-card, .associado-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Fecha menu mobile ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            nav.classList.add('hidden');
            nav.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'shadow-lg', 'p-4');
        }
    });

    console.log('%c✅ AvançAraucária - Script carregado com sucesso!', 'color: #2563eb; font-weight: bold');
});