/* =========================================================
   Portfólio Adam Gabriel — scripts
   Blocos: CONFIG → tema → menu → scroll → reveal → terminal
           → copiar e-mail → formulário → ano no rodapé
   ========================================================= */
(function () {
  'use strict';

  /* =======================================================
     1. CONFIGURAÇÃO — EDITE AQUI OS DADOS PESSOAIS
     ======================================================= */
  var CONFIG = {
    nome: 'Adam Gabriel',
    email: 'adamgabriel404@gmail.com',
    github: 'https://github.com/Origin-Adam',
    githubLabel: 'github.com/Origin-Adam',
    repos: 'https://github.com/Origin-Adam?tab=repositories',
    linkedin: 'https://www.linkedin.com/in/adam-gabriel-aa47402a7/',
    linkedinLabel: 'linkedin.com/in/adam-gabriel-aa47402a7',
    localidade: 'Salvador, BA'
  };

  /* ===================== 2. TEMA ===================== */
  var themeToggle = document.getElementById('theme-toggle');

  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    try { localStorage.setItem('tema', tema); } catch (e) {}
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var atual = document.documentElement.getAttribute('data-theme');
      aplicarTema(atual === 'dark' ? 'light' : 'dark');
    });
  }

  /* ===================== 3. MENU MOBILE ===================== */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  function fecharMenu() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('nav-open');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(aberto));
      navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('nav-open', aberto);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) fecharMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecharMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 780) fecharMenu();
    });
  }

  /* ===================== 4. SCROLL SUAVE + HEADER ===================== */
  var header = document.getElementById('header');

  function aoRolar() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  document.addEventListener('click', function (e) {
    var alvo = e.target.closest('a[href^="#"], [data-scroll-to]');
    if (!alvo) return;

    var hash = alvo.getAttribute('data-scroll-to') || alvo.getAttribute('href');
    if (!hash || hash === '#') return;

    var destino = document.querySelector(hash);
    if (!destino) return;

    e.preventDefault();
    var topo = destino.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight + 12 : 12);
    window.scrollTo({ top: topo, behavior: 'smooth' });
    if (history.replaceState) history.replaceState(null, '', hash);
  });

  /* ===================== 5. SCROLL-SPY (link ativo do menu) ===================== */
  var secoes = document.querySelectorAll('main section[id]');
  var linksMenu = document.querySelectorAll('.nav__link');

  if (secoes.length && 'IntersectionObserver' in window) {
    var obsSpy = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        linksMenu.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entrada.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    secoes.forEach(function (s) { obsSpy.observe(s); });
  }

  /* ===================== 6. REVEAL AO ROLAR ===================== */
  var reveals = document.querySelectorAll('.reveal');

  reveals.forEach(function (el) {
    var atraso = el.getAttribute('data-delay');
    if (atraso) el.style.setProperty('--delay', atraso + 'ms');
  });

  if ('IntersectionObserver' in window) {
    var obsReveal = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('is-visible');
        obs.unobserve(entrada.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { obsReveal.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ===================== 7. TERMINAL ANIMADO ===================== */
  var terminal = document.getElementById('terminal');
  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var LINHAS = [
    { t: 'p', v: '$ whoami' },
    { t: 'm', v: 'adam.gabriel — analista de e-commerce' },
    { t: 'p', v: '$ cat stack.txt' },
    { t: 's', v: 'e-commerce · n8n · QA · SQL · APIs' },
    { t: 'm', v: 'Godot · Unity · Unreal Engine 5' },
    { t: 'p', v: '$ echo $mission' },
    { t: 'g', v: '"automatizar o repetitivo, entregar o confiável"' },
    { t: 'p', v: '$ status --verbose' },
    { t: 'm', v: 'disponível para novos projetos ✓' }
  ];

  function criarLinha(tipo, texto) {
    var span = document.createElement('span');
    span.className = 'terminal__line';
    var cor = document.createElement('span');
    cor.className = tipo;
    cor.textContent = texto + '\n';
    span.appendChild(cor);
    return span;
  }

  function renderizarTerminal() {
    if (!terminal) return;
    terminal.innerHTML = '';
    LINHAS.forEach(function (linha) { terminal.appendChild(criarLinha(linha.t, linha.v)); });
    var caret = document.createElement('span');
    caret.className = 'terminal__caret';
    terminal.appendChild(caret);
  }

  function digitarTerminal() {
    if (!terminal) return;
    terminal.innerHTML = '';

    var i = 0;
    var j = 0;
    var atual = null;

    function proxima() {
      if (i >= LINHAS.length) {
        var caret = document.createElement('span');
        caret.className = 'terminal__caret';
        terminal.appendChild(caret);
        return;
      }

      if (j === 0) {
        atual = criarLinha(LINHAS[i].t, '');
        terminal.appendChild(atual);
      }

      var texto = LINHAS[i].v;
      j++;

      if (j <= texto.length) {
        atual.firstChild.textContent = texto.slice(0, j) + '\n';
        var vel = LINHAS[i].t === 'p' ? 46 : 18;
        setTimeout(proxima, vel);
      } else {
        i++;
        j = 0;
        setTimeout(proxima, 260);
      }
    }

    setTimeout(proxima, 420);
  }

  if (terminal) {
    if (reduzirMovimento) renderizarTerminal();
    else digitarTerminal();
  }

  /* ===================== 8. APLICAR DADOS DO CONFIG NO HTML ===================== */
  /* Cada link que depende do CONFIG tem data-link="tipo" no index.html.
     Se o tipo tiver "text", o rótulo visível também é sobrescrito. */
  var LINKS = {
    'email-main':   { href: 'mailto:' + CONFIG.email,     text: CONFIG.email },
    'email-hero':   { href: 'mailto:' + CONFIG.email,     text: null },
    'github':       { href: CONFIG.github,               text: CONFIG.githubLabel },
    'github-hero':  { href: CONFIG.github,               text: null },
    'repos':        { href: CONFIG.repos,                text: null },
    'linkedin':     { href: CONFIG.linkedin,             text: CONFIG.linkedinLabel },
    'linkedin-hero':{ href: CONFIG.linkedin,             text: null }
  };

  document.querySelectorAll('[data-link]').forEach(function (el) {
    var def = LINKS[el.getAttribute('data-link')];
    if (!def) return;
    el.setAttribute('href', def.href);
    if (def.text) el.textContent = def.text;
  });

  // Localidade (opcional): só aparece se estiver preenchida no CONFIG
  var itemLocalidade = document.getElementById('localidade-item');
  var textoLocalidade = document.getElementById('localidade-texto');
  if (itemLocalidade && textoLocalidade && CONFIG.localidade) {
    textoLocalidade.textContent = CONFIG.localidade;
    itemLocalidade.hidden = false;
  }

  /* ===================== 9. COPIAR E-MAIL ===================== */
  var btnCopiar = document.getElementById('copy-email');

  if (btnCopiar) {
    btnCopiar.addEventListener('click', function () {
      var texto = CONFIG.email;

      function avisar() {
        btnCopiar.classList.add('is-copied');
        btnCopiar.setAttribute('aria-label', 'E-mail copiado');
        setTimeout(function () {
          btnCopiar.classList.remove('is-copied');
          btnCopiar.setAttribute('aria-label', 'Copiar e-mail');
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(avisar).catch(function () {});
      } else {
        var area = document.createElement('textarea');
        area.value = texto;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try { document.execCommand('copy'); avisar(); } catch (e) {}
        document.body.removeChild(area);
      }
    });
  }

  /* ===================== 10. FORMULÁRIO DE CONTATO ===================== */
  var form = document.getElementById('contact-form');
  var nota = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var campos = ['nome', 'email', 'mensagem'];
      var ok = true;
      var primeiroErro = null;

      campos.forEach(function (id) {
        var input = document.getElementById(id);
        var wrapper = input.closest('.field');
        var valido = input.value.trim() !== '';

        if (id === 'email') {
          valido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
        }
        wrapper.classList.toggle('has-error', !valido);
        input.setAttribute('aria-invalid', String(!valido));

        if (!valido && !primeiroErro) primeiroErro = input;
        if (!valido) ok = false;
      });

      if (!ok) {
        nota.textContent = 'Confira os campos destacados.';
        nota.className = 'form__note is-error';
        if (primeiroErro) primeiroErro.focus();
        return;
      }

      var nome = document.getElementById('nome').value.trim();
      var email = document.getElementById('email').value.trim();
      var mensagem = document.getElementById('mensagem').value.trim();

      var assunto = 'Contato pelo portfólio — ' + nome;
      var corpo = 'Nome: ' + nome + '\nE-mail: ' + email + '\n\n' + mensagem;

      window.location.href = 'mailto:' + CONFIG.email +
        '?subject=' + encodeURIComponent(assunto) +
        '&body=' + encodeURIComponent(corpo);

      nota.textContent = 'Abrindo seu e-mail com a mensagem pronta. Se não abrir, escreva direto para ' + CONFIG.email + '.';
      nota.className = 'form__note is-ok';
    });

    form.addEventListener('input', function (e) {
      var wrapper = e.target.closest('.field');
      if (wrapper) wrapper.classList.remove('has-error');
    });
  }

  /* ===================== 11. ANO NO RODAPÉ ===================== */
  var ano = document.getElementById('year');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ===================== 12. ATALHO DE TECLADO ===================== */
  document.addEventListener('keydown', function (e) {
    // "/" foca o primeiro link de navegação
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
      var link = document.querySelector('.nav__link');
      if (link) { e.preventDefault(); link.focus(); }
    }
  });
})();
