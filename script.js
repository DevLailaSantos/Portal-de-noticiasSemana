// Controle do Menu Mobile
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');

if (btnMenu && menuMobile) {
    btnMenu.addEventListener('click', () => {
        menuMobile.classList.toggle('hidden');
    });
}

// Funções de Acessibilidade
function ativarVLibras() {
    alert("VLibras: Ferramenta de tradução automática em Libras acionada.");
}

function alternarAltoContraste() {
    document.body.classList.toggle('high-contrast');
}

let nivelFonte = 16;
function ajustarFonte(acao) {
    if (acao === 'aumentar' && nivelFonte < 22) {
        nivelFonte += 2;
    } else if (acao === 'diminuir' && nivelFonte > 12) {
        nivelFonte -= 2;
    }
    document.body.style.fontSize = `${nivelFonte}px`;
}

function alternarModoAutismo() {
    document.body.classList.toggle('autism-mode');
    alert("Modo Autismo ativado: Ajustado espaçamento e conforto visual.");
}

// Funções do Modal Dinâmico
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalTexto = document.getElementById('modal-texto');

function abrirModalCurso(nomeCurso) {
    modalTitulo.innerText = nomeCurso;
    modalTexto.innerText = `Este é um curso oficial e gratuito oferecido pela DronoAgro. As aulas cobrem desde os conceitos fundamentais até a prática avançada em campo com certificação reconhecida pelo setor agrícola.`;
    modal.classList.remove('hidden');
}

function fecharModal() {
    modal.classList.add('hidden');
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        fecharModal();
    }
});

// ==========================================
// AUTOMAÇÃO DE NOTÍCIAS COM IMAGENS MANUAIS
// ==========================================
async function carregarNoticiasMundoGEO() {
    const containerNoticias = document.getElementById('container-noticias');
    const rssUrl = encodeURIComponent('https://mundogeo.com/feed/'); 
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    try {
        const resposta = await fetch(apiUrl);
        const dados = await resposta.json();

        if (dados.status === 'ok' && dados.items) {
            const ultimasNoticias = dados.items.slice(0, 3);
            containerNoticias.innerHTML = '';

            // SUAS IMAGENS MANUAIS (Substitua pelos links das imagens desejadas para cada notícia)
            const imagensManuais = [
                'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80'
            ];

            ultimasNoticias.forEach((noticia, index) => {
                const dataObj = new Date(noticia.pubDate);
                const dataFormatada = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

                // Usa a imagem manual correspondente ou uma padrão caso o array acabe
                let imagemUrl = imagensManuais[index] || 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80';

                // Limpa tags HTML do resumo
                let resumoLimpo = noticia.description.replace(/<[^>]*>?/gm, '');
                if (resumoLimpo.length > 110) {
                    resumoLimpo = resumoLimpo.substring(0, 110) + '...';
                }

                const cardHtml = `
                    <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group">
                        <div>
                            <div class="h-48 overflow-hidden bg-slate-100 relative">
                                <img src="${imagemUrl}" alt="${noticia.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                                <span class="absolute top-3 left-3 text-[11px] font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-md shadow">
                                    ${dataFormatada}
                                </span>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-slate-900 mb-3 leading-snug">${noticia.title}</h3>
                                <p class="text-slate-600 text-sm leading-relaxed">${resumoLimpo}</p>
                            </div>
                        </div>
                        <div class="px-6 pb-6">
                            <a href="${noticia.link}" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-bold text-sm hover:underline flex items-center gap-2">
                                <span>Ler matéria completa no portal</span>
                                <i class="fa-solid fa-arrow-right text-xs"></i>
                            </a>
                        </div>
                    </article>
                `;

                containerNoticias.innerHTML += cardHtml;
            });
        } else {
            containerNoticias.innerHTML = '<p class="text-red-500 text-sm">Não foi possível carregar as notícias automáticas no momento.</p>';
        }
    } catch (error) {
        console.log("Erro ao buscar notícias automáticas:", error);
        containerNoticias.innerHTML = '<p class="text-red-500 text-sm">Erro de conexão ao buscar feed de notícias.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarNoticiasMundoGEO);