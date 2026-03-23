// Elementos do DOM
const menuIcon = document.getElementById('menuIcon');
const navOverlay = document.getElementById('navOverlay');
const homeScreen = document.getElementById('home-screen');

// Seleciona todas as divs de temporada
const todasTemporadas = document.querySelectorAll('.container-flex');

// 1. Controle do Menu Hamburguer
menuIcon.addEventListener('click', () => {
    toggleMenu();
});

function toggleMenu() {
    menuIcon.classList.toggle('active');
    navOverlay.classList.toggle('open');
}

// Fecha o menu se clicar em um link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        setTimeout(() => {
            if (navOverlay.classList.contains('open')) {
                toggleMenu();
            }
        }, 100);
    });
});

// 2. Função para Carregar a Home
function carregarHome() {
    window.scrollTo(0, 0);
    todasTemporadas.forEach(div => {
        div.style.display = 'none';
    });
    homeScreen.style.display = 'flex';
}

// 3. Função para Alternar Temporadas e REAJUSTAR TEXTO
function carregarTemporada(idTemporada) {
    window.scrollTo(0, 0);
    
    homeScreen.style.display = 'none';

    todasTemporadas.forEach(div => {
        div.style.display = 'none';
    });

    const temporadaSelecionada = document.getElementById(idTemporada);
    if (temporadaSelecionada) {
        temporadaSelecionada.style.display = 'flex';
        // IMPORTANTE: Chama o ajuste de texto sempre que trocar de tela
        // para garantir que o cálculo seja feito com o elemento visível.
        setTimeout(ajustarTextoBotoes, 50);
    }
}

// 4. Lógica de cliques e Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.btn-custom');

    botoes.forEach(botao => {
        // A. Clique simples
        botao.addEventListener('click', (event) => {
            event.stopPropagation();
            botoes.forEach(b => b.classList.remove('botao-ativo'));
            botao.classList.add('botao-ativo');
        });

        // B. Clique duplo
        botao.addEventListener('dblclick', () => {
            const linkParaAbrir = botao.getAttribute('data-link');
            if (linkParaAbrir && linkParaAbrir !== '#') {
                window.open(linkParaAbrir, '_blank'); 
            }
        });
    });

    // Chama a função de ajuste de texto ao carregar a página
    ajustarTextoBotoes();
});

// 5. Clique no fundo reseta
document.addEventListener('click', (e) => {
    if (!e.target.closest('.btn-custom') && !e.target.closest('.menu-icon')) {
        const botoes = document.querySelectorAll('.btn-custom');
        botoes.forEach(botao => {
            botao.classList.remove('botao-ativo');
        });
    }
});

// 6. NOVA FUNÇÃO MÁGICA: Ajusta o tamanho da fonte se o texto vazar
function ajustarTextoBotoes() {
    const botoes = document.querySelectorAll('.btn-custom');
    
    botoes.forEach(botao => {
        const span = botao.querySelector('.lado-direito span');
        const container = botao.querySelector('.lado-direito');
        
        // Se o elemento não estiver visível (display:none), o cálculo falha.
        // Só calculamos se tiver altura.
        if (container.offsetHeight > 0) {
            // Reseta para o tamanho original do CSS antes de calcular
            span.style.fontSize = ''; 
            
            // Loop de verificação:
            // Enquanto a altura do texto (scrollHeight) for maior que a do container
            // OU a largura do texto estourar demais (opcional), reduzimos a fonte.
            let fontSize = parseInt(window.getComputedStyle(span).fontSize);
            
            // Limite de segurança: não diminuir para menos de 8px
            while (span.scrollHeight > container.clientHeight && fontSize > 8) {
                fontSize--;
                span.style.fontSize = fontSize + 'px';
            }
        }
    });
}

// Garante que o ajuste aconteça também se redimensionar a janela (girar o celular)
window.addEventListener('resize', () => {
    // Um pequeno delay (debounce) para não travar o navegador
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(ajustarTextoBotoes, 100);
});
