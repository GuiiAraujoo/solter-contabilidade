
/* ==========================================================
   SOLTER CONTABILIDADE
   SITE INSTITUCIONAL

   ARQUIVO: script.js
   VERSÃO: 1.0

   FUNCIONALIDADES:
   01. Configurações da empresa
   02. Inicialização
   03. Links do WhatsApp
   04. Ano automático
   05. Menu mobile
   06. Cabeçalho dinâmico
   07. Navegação ativa
   08. Perguntas frequentes

   Desenvolvido em JavaScript puro.
   Sem dependências externas.
========================================================== */

"use strict";


/* ==========================================================
   01. CONFIGURAÇÕES GERAIS

   ALTERE AQUI OS DADOS DA EMPRESA
   SEM PRECISAR MODIFICAR AS FUNÇÕES.
========================================================== */

const SOLTER_CONFIG = {

    empresa: "Solter Contabilidade",

    /* WhatsApp: Brasil + DDD + telefone */
    whatsapp: "5521981129264",

    mensagemWhatsApp:
        "Olá! Vim pelo site da Solter Contabilidade e gostaria de saber mais sobre os serviços.",

    /* E-mails oficiais */
    emailPrincipal: "soltercontabil@gmail.com",

    emailSecundario: "soltercontabilidade6@gmail.com",

    /* Largura máxima considerada mobile */
    larguraMenuMobile: 960

};


/* ==========================================================
   02. INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarSolter();

});


/* ==========================================================
   CORRIGIR POSIÇÃO APÓS RECARREGAMENTO
========================================================== */

function corrigirRecarregamento() {

    const navegacao = performance
        .getEntriesByType("navigation")[0];

    // Executa somente quando a página é recarregada.
    if (!navegacao || navegacao.type !== "reload") {
        return;
    }

    // Desativa a restauração automática da rolagem.
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    // Remove #contato ou qualquer outra âncora da URL.
    if (window.location.hash) {

        history.replaceState(
            null,
            "",
            window.location.pathname +
            window.location.search
        );

    }

    // Retorna ao início da página.
    const voltarAoTopo = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    };

    voltarAoTopo();

    // Garante a posição após o carregamento.
    window.addEventListener(
        "pageshow",
        voltarAoTopo,
        { once: true }
    );

}


function iniciarSolter() {

    corrigirRecarregamento();

    configurarWhatsApp();

    atualizarAnoRodape();

    configurarMenuMobile();

    configurarCabecalho();

    configurarNavegacaoAtiva();

    configurarPerguntasFrequentes();

}


/* ==========================================================
   03. WHATSAPP

   Configura os links já existentes
   no HTML e mantém o mesmo número
   em todos os botões.
========================================================== */

function configurarWhatsApp() {

    const numero = String(
        SOLTER_CONFIG.whatsapp
    ).replace(/\D/g, "");


    /* Validação do formato brasileiro */

    const numeroValido =
        /^55\d{2}\d{8,9}$/.test(numero);


    if (!numeroValido) {

        console.error(
            "Solter: número do WhatsApp inválido."
        );

        /*
           Preserva os links existentes
           no HTML caso a configuração
           seja preenchida incorretamente.
        */

        return;

    }


    /* Mensagem personalizada */

    const mensagem = encodeURIComponent(
        SOLTER_CONFIG.mensagemWhatsApp
    );


    /* Endereço de atendimento */

    const urlWhatsApp =
        `https://wa.me/${numero}?text=${mensagem}`;


    /* Localiza os links de WhatsApp */

    const linksWhatsApp =
        document.querySelectorAll(
            'a[href^="https://wa.me/"]'
        );


    /* Atualiza todos os links */

    linksWhatsApp.forEach((link) => {

        link.href = urlWhatsApp;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

    });


    /* Formata o telefone */

    const ddd = numero.slice(2, 4);

    const telefone = numero.slice(4);

    let telefoneFormatado;


    if (telefone.length === 9) {

        telefoneFormatado =
            `${telefone.slice(0, 5)}-${telefone.slice(5)}`;

    } else {

        telefoneFormatado =
            `${telefone.slice(0, 4)}-${telefone.slice(4)}`;

    }


    const numeroVisivel =
        `(${ddd}) ${telefoneFormatado}`;


    /* Número na seção Contato */

    const numeroContato =
        document.querySelector(
            ".contact-card__number"
        );


    if (numeroContato) {

        numeroContato.textContent =
            numeroVisivel;

    }


    /* Número no rodapé */

    const numeroRodape =
        document.querySelector(
            '.footer__column a[href^="https://wa.me/"]'
        );


    if (numeroRodape) {

        numeroRodape.textContent =
            numeroVisivel;

    }

}


/* ==========================================================
   04. ANO AUTOMÁTICO NO RODAPÉ

   Exemplo:
   © 2026 Solter Contabilidade
========================================================== */

function atualizarAnoRodape() {

    const elementoAno =
        document.getElementById(
            "ano-atual"
        );


    if (!elementoAno) {
        return;
    }


    const anoAtual =
        new Date().getFullYear();


    elementoAno.textContent =
        anoAtual;

}


/* ==========================================================
   05. MENU MOBILE

   Funcionalidades:
   - Abrir e fechar
   - Fechar ao selecionar um link
   - Fechar ao clicar fora
   - Fechar ao pressionar ESC
   - Restaurar ao entrar no desktop
========================================================== */

function configurarMenuMobile() {

    const botaoMenu =
        document.getElementById(
            "menu-toggle"
        );


    const menu =
        document.getElementById(
            "menu-principal"
        );


    const cabecalho =
        document.querySelector(
            ".header"
        );


    if (!botaoMenu || !menu || !cabecalho) {
        return;
    }


    const mediaMobile = window.matchMedia(
        `(max-width: ${SOLTER_CONFIG.larguraMenuMobile}px)`
    );


    /* ------------------------------------------
       Alterar estado do menu
    ------------------------------------------ */

    function alterarMenu(abrir) {

        const deveAbrir =
            Boolean(abrir) && mediaMobile.matches;


        menu.classList.toggle(
            "is-open",
            deveAbrir
        );


        botaoMenu.classList.toggle(
            "is-active",
            deveAbrir
        );


        document.body.classList.toggle(
            "menu-open",
            deveAbrir
        );


        botaoMenu.setAttribute(
            "aria-expanded",
            String(deveAbrir)
        );


        botaoMenu.setAttribute(
            "aria-label",
            deveAbrir
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
        );

    }


    /* ------------------------------------------
       Clique no botão do menu
    ------------------------------------------ */

    botaoMenu.addEventListener(
        "click",
        () => {

            const menuAberto =
                menu.classList.contains(
                    "is-open"
                );


            alterarMenu(!menuAberto);

        }
    );


    /* ------------------------------------------
       Fechar ao selecionar um link
    ------------------------------------------ */

    const linksMenu =
        menu.querySelectorAll("a");


    linksMenu.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                alterarMenu(false);

            }
        );

    });


    /* ------------------------------------------
       Fechar ao clicar fora do cabeçalho
    ------------------------------------------ */

    document.addEventListener(
        "click",
        (evento) => {

            const menuAberto =
                menu.classList.contains(
                    "is-open"
                );


            if (!menuAberto) {
                return;
            }


            if (
                !cabecalho.contains(
                    evento.target
                )
            ) {

                alterarMenu(false);

            }

        }
    );


    /* ------------------------------------------
       Fechar com a tecla ESC
    ------------------------------------------ */

    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape" &&
                menu.classList.contains("is-open")
            ) {

                alterarMenu(false);

                botaoMenu.focus();

            }

        }
    );


    /* ------------------------------------------
       Restaurar o menu ao mudar
       do celular para o desktop
    ------------------------------------------ */

    mediaMobile.addEventListener(
        "change",
        () => {

            alterarMenu(false);

        }
    );

}


/* ==========================================================
   06. CABEÇALHO DINÂMICO

   Aplica sombra quando a página
   é rolada para baixo.
========================================================== */

function configurarCabecalho() {

    const cabecalho =
        document.querySelector(
            ".header"
        );


    if (!cabecalho) {
        return;
    }


    function atualizarCabecalho() {

        const paginaRolada =
            window.scrollY > 15;


        cabecalho.classList.toggle(
            "is-scrolled",
            paginaRolada
        );

    }


    window.addEventListener(
        "scroll",
        atualizarCabecalho,
        { passive: true }
    );


    /* Verificação inicial */

    atualizarCabecalho();

}


/* ==========================================================
   07. NAVEGAÇÃO ATIVA

   Destaca automaticamente o link
   correspondente à seção atual.
========================================================== */

function configurarNavegacaoAtiva() {

    const linksNavegacao =
        Array.from(
            document.querySelectorAll(
                ".nav__link"
            )
        );


    if (linksNavegacao.length === 0) {
        return;
    }


    /* Identifica os IDs no menu */

    const idsNavegacao = new Set(

        linksNavegacao.map((link) => {

            return link.getAttribute(
                "href"
            );

        })

    );


    /* Identifica as seções correspondentes */

    const secoes = Array.from(
        document.querySelectorAll(
            "main section[id]"
        )
    ).filter((secao) => {

        return idsNavegacao.has(
            `#${secao.id}`
        );

    });


    if (secoes.length === 0) {
        return;
    }


    const cabecalho =
        document.querySelector(
            ".header"
        );


    /* ------------------------------------------
       Aplicar destaque no link
    ------------------------------------------ */

    function definirLinkAtivo(id) {

        linksNavegacao.forEach((link) => {

            const ativo =
                link.getAttribute("href") ===
                `#${id}`;


            link.classList.toggle(
                "is-active",
                ativo
            );


            if (ativo) {

                link.setAttribute(
                    "aria-current",
                    "location"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    /* ------------------------------------------
       Identificar a seção atual
    ------------------------------------------ */

    function atualizarNavegacao() {

        const alturaCabecalho =
            cabecalho
                ? cabecalho.offsetHeight
                : 0;


        /*
           O ponto de leitura considera
           o cabeçalho fixo e um pequeno
           espaçamento adicional.
        */

        const pontoReferencia =
            window.scrollY +
            alturaCabecalho +
            100;


        let secaoAtual =
            secoes[0].id;


        secoes.forEach((secao) => {

            const posicaoSecao =
                secao.getBoundingClientRect().top +
                window.scrollY;


            if (
                posicaoSecao <= pontoReferencia
            ) {

                secaoAtual = secao.id;

            }

        });


        /* Verificação do final da página */

        const chegouAoFinal =

            window.innerHeight +
            window.scrollY >=

            document.documentElement.scrollHeight - 5;


        if (
            chegouAoFinal &&
            idsNavegacao.has("#contato")
        ) {

            secaoAtual = "contato";

        }


        definirLinkAtivo(secaoAtual);

    }


    /* ------------------------------------------
       Otimizar eventos de rolagem
    ------------------------------------------ */

    let atualizacaoPendente = false;


    function solicitarAtualizacao() {

        if (atualizacaoPendente) {
            return;
        }


        atualizacaoPendente = true;


        window.requestAnimationFrame(() => {

            atualizarNavegacao();

            atualizacaoPendente = false;

        });

    }


    window.addEventListener(
        "scroll",
        solicitarAtualizacao,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        solicitarAtualizacao
    );


    window.addEventListener(
        "load",
        solicitarAtualizacao
    );


    /* Atualização inicial */

    atualizarNavegacao();

}


/* ==========================================================
   08. PERGUNTAS FREQUENTES

   Apenas uma pergunta permanece
   aberta por vez.

   Utiliza os elementos HTML nativos:
   <details> e <summary>
========================================================== */

function configurarPerguntasFrequentes() {

    const perguntas =
        document.querySelectorAll(
            ".faq-item"
        );


    if (perguntas.length === 0) {
        return;
    }


    perguntas.forEach((perguntaAtual) => {

        perguntaAtual.addEventListener(
            "toggle",
            () => {

                if (!perguntaAtual.open) {
                    return;
                }


                perguntas.forEach((outraPergunta) => {

                    if (
                        outraPergunta !== perguntaAtual &&
                        outraPergunta.open
                    ) {

                        outraPergunta.open = false;

                    }

                });

            }
        );

    });

}


/* ==========================================================
   FIM DO ARQUIVO script.js

   SOLTER CONTABILIDADE
   VERSÃO 1.0
========================================================== */
