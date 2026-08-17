/* =========================================================
   AVANÇARAUCÁRIA – script.js (único para todas as páginas)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    initMobileMenu();
    initEntitiesToggle();
    initGestao();
    initNewsPagination();
    initLightbox();
    initAssociados();
});

/* -------------------- 1. DROPDOWNS (hover) -------------------- */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!menu) return;

        // Estado inicial
        menu.style.display = 'none';
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(8px)';
        menu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

        dropdown.addEventListener('mouseenter', () => {
            menu.style.display = 'block';
            // força reflow para animar
            void menu.offsetWidth;
            menu.style.opacity = '1';
            menu.style.transform = 'translateY(0)';
        });

        dropdown.addEventListener('mouseleave', () => {
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(8px)';
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    menu.style.display = 'none';
                }
            }, 200);
        });
    });
}

/* -------------------- 2. MENU MOBILE -------------------- */
function initMobileMenu() {
    const btn = document.getElementById('menu-mobile');
    if (!btn) return;

    // Cria o painel mobile se ainda não existir
    let panel = document.getElementById('mobile-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'mobile-panel';
        panel.className = 'fixed inset-0 z-[60] bg-white/95 backdrop-blur-md hidden flex-col pt-24 px-6 overflow-y-auto';
        panel.innerHTML = `
            <button id="close-mobile" class="absolute top-6 right-6 text-2xl font-bold text-slate-700">×</button>
            <nav class="flex flex-col gap-4 text-lg font-semibold uppercase tracking-wider">
                <a href="index.html" class="py-2 border-b border-slate-100">Início</a>
                <a href="institucional.html" class="py-2 border-b border-slate-100">Sobre a AVANÇA ARAUCÁRIA</a>
                <a href="governança.html" class="py-2 border-b border-slate-100">Governança</a>
                <a href="galeriapresi.html" class="py-2 border-b border-slate-100">Galeria de Presidentes</a>
                <a href="parceiros.html" class="py-2 border-b border-slate-100">Parceiros</a>
                <a href="noticias.html" class="py-2 border-b border-slate-100">Notícias</a>
                <a href="galeria.html" class="py-2 border-b border-slate-100">Galeria</a>
                <a href="associados.html" class="py-2 border-b border-slate-100">Associados</a>
                <a href="contato.html" class="py-2 border-b border-slate-100">Contato</a>
            </nav>
        `;
        document.body.appendChild(panel);

        document.getElementById('close-mobile').addEventListener('click', () => {
            panel.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    btn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
        document.body.style.overflow = panel.classList.contains('hidden') ? '' : 'hidden';
    });
}

/* -------------------- 3. TOGGLE ENTIDADES (index) -------------------- */
function initEntitiesToggle() {
    const btn = document.getElementById('toggle-entities');
    if (!btn) return;

    const extras = document.querySelectorAll('.entity-card.extra, .extra');
    const text = document.getElementById('toggle-text');
    const icon = document.getElementById('toggle-icon');
    let open = false;

    // esconde extras no início
    extras.forEach(el => el.classList.add('hidden'));

    btn.addEventListener('click', () => {
        open = !open;
        extras.forEach(el => el.classList.toggle('hidden', !open));
        if (text) text.textContent = open ? 'Ver menos entidades' : 'Ver todas as entidades';
        if (icon) icon.textContent = open ? '↑' : '↓';
    });
}

/* -------------------- 4. GESTÃO (governança) -------------------- */
function initGestao() {
    const select = document.getElementById('gestaoSelect');
    if (!select) return;

    // se existir select nativo com name="gestao"
    const nativeSelect = document.querySelector('select[name="gestao"]') || select;

    function showGestao(value) {
        document.querySelectorAll('.gestao-content').forEach(el => el.classList.add('hidden'));
        // tenta vários formatos de id
        const ids = [
            'gestao-' + value,
            'gestao-' + value.replace('/', '-'),
            value
        ];
        for (const id of ids) {
            const target = document.getElementById(id);
            if (target) {
                target.classList.remove('hidden');
                break;
            }
        }
    }

    nativeSelect.addEventListener('change', () => showGestao(nativeSelect.value));

    // mostra a gestão selecionada ao carregar
    if (nativeSelect.value) showGestao(nativeSelect.value);
}

// função global (caso o HTML chame changeGestao())
function changeGestao() {
    const select = document.getElementById('gestaoSelect') || document.querySelector('select[name="gestao"]');
    if (!select) return;
    document.querySelectorAll('.gestao-content').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById('gestao-' + select.value) ||
                   document.getElementById('gestao-' + select.value.replace('/', '-'));
    if (target) target.classList.remove('hidden');
}

/* -------------------- 5. PAGINAÇÃO DE NOTÍCIAS -------------------- */
let currentPage = 1;
const totalPages = 4;

function changePage(page) {
    if (page < 1 || page > totalPages) return;

    document.querySelectorAll('.news-page').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.remove('hidden');

    currentPage = page;
    updatePagination();
    window.scrollTo({ top: 350, behavior: 'smooth' });
}

function updatePagination() {
    document.querySelectorAll('.page-btn').forEach((btn, index) => {
        const pageNum = index + 1;
        if (pageNum === currentPage) {
            btn.className = 'page-btn w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold transition-all';
        } else {
            btn.className = 'page-btn w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all';
        }
    });

    const prev = document.getElementById('btn-prev');
    const next = document.getElementById('btn-next');
    if (prev) prev.disabled = currentPage === 1;
    if (next) next.disabled = currentPage === totalPages;
}

function initNewsPagination() {
    if (!document.querySelector('.news-page')) return;
    updatePagination();
}

/* -------------------- 6. LIGHTBOX (galerias) -------------------- */
function initLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    // cria overlay uma vez
    let overlay = document.getElementById('lightbox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 hidden" id="lightbox-bg">
                <button id="lightbox-close" class="absolute top-6 right-6 text-white text-4xl font-light hover:text-blue-400 transition-colors">&times;</button>
                <img id="lightbox-img" src="" alt="" class="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl">
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const bg = document.getElementById('lightbox-bg');
    const img = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');

    function openLightbox(src) {
        img.src = src;
        bg.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        bg.classList.add('hidden');
        img.src = '';
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    bg.addEventListener('click', (e) => {
        if (e.target === bg) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            // prioridade: data-src → background-image do filho
            let src = item.getAttribute('data-src');
            if (!src) {
                const child = item.querySelector('[style*="background-image"]');
                if (child) {
                    const match = child.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
                    if (match) src = match[1];
                }
            }
            // tenta versão grande (p_ → g_)
            if (src && src.includes('/p_')) {
                src = src.replace('/p_', '/g_');
            }
            if (src) openLightbox(src);
        });
    });
}

/* -------------------- 7. ASSOCIADOS -------------------- */
function toggleCategory(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('span:last-child');
    if (!content) return;
    content.classList.toggle('hidden');
    if (icon) icon.textContent = content.classList.contains('hidden') ? '+' : '−';
}

function changeView() {
    const mode = document.getElementById('viewMode')?.value;
    const viewRamo = document.getElementById('viewRamo');
    const viewAlfa = document.getElementById('viewAlfa');
    if (!viewRamo || !viewAlfa) return;

    if (mode === 'alfa') {
        viewRamo.classList.add('hidden');
        viewAlfa.classList.remove('hidden');
    } else {
        viewAlfa.classList.add('hidden');
        viewRamo.classList.remove('hidden');
    }
}

function initAssociados() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase().trim();
        const rows = document.querySelectorAll('#viewRamo .category-content > div, #viewAlfa .category-content > div');

        rows.forEach(row => {
            const name = row.querySelector('span')?.textContent.toLowerCase() || '';
            row.style.display = name.includes(term) ? '' : 'none';
        });

        // abre categorias que têm resultado
        if (term) {
            document.querySelectorAll('.category-content').forEach(content => {
                const hasVisible = Array.from(content.children).some(c => c.style.display !== 'none');
                if (hasVisible) {
                    content.classList.remove('hidden');
                    const btn = content.previousElementSibling;
                    const icon = btn?.querySelector('span:last-child');
                    if (icon) icon.textContent = '−';
                }
            });
        }
    });
}