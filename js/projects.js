/* =========================================================
   Projetos — repositórios do GitHub via API pública
   Você controla o que aparece; a API só enriquece (linguagem,
   stars, forks, data). Novos repositórios entram sozinhos.
   ========================================================= */
(function () {
  'use strict';

  /* =======================================================
     1. CURAÇÃO — é aqui que você decide o que aparece
     ======================================================= */

  /* Cada item = um repositório da sua conta.
     repo       : nome exato do repositório no GitHub (obrigatório)
     titulo     : nome bonito pro site (padrão: o nome do repo)
     descricao  : texto do card (padrão: a descrição do GitHub)
     tags       : etiquetas extras
     destaque   : true = card maior, ocupa 2 colunas
     link       : url alternativa (ex.: a demo do projeto)
  */
  /* Os repositórios trabalho-js-*, js-exercicios e projeto-web-uniruy-v2 são
     versões intermediárias do ByteShop — ficam de fora para não repetir o projeto. */
  var PROJETOS = [
    {
      repo: 'projeto-js-comentarios',
      titulo: 'ByteShop — e-commerce completo em PHP',
      descricao: 'Loja com login (bcrypt), catálogo com filtros, carrinho, frete via ViaCEP, ' +
        'checkout com transação ACID, QR Code PIX por pedido e dashboard de vendas no Looker Studio.',
      tags: ['MVC', 'MySQL', 'APIs', 'Looker Studio'],
      destaque: true
    },
    {
      repo: 'projeto-api',
      titulo: 'ByteShop — versão com documentação',
      descricao: 'A primeira arquitetura do ByteShop, com camada DAO, diagramas UML, ' +
        'casos de uso e integração com duas APIs externas.',
      tags: ['MySQL', 'UML', 'Requisitos']
    },
    {
      repo: 'projeto-web-uniruy',
      titulo: 'ByteShop — front-end',
      descricao: 'O ponto de partida: vitrine em HTML e CSS puro, responsiva, sem framework.',
      tags: ['CSS', 'Responsivo']
    },
    {
      repo: 'atividade-python-faculdade',
      titulo: 'Algoritmos em Python',
      descricao: 'Exercícios de lógica e algoritmos da graduação.',
      tags: ['Algoritmos']
    }
  ];

  /* Repositórios que nunca aparecem, mesmo com MOSTRAR_TODOS = true */
  var EXCLUIDOS = [
    'Origin-Adam.github.io', 'Origin-Adam', 'skills-introduction-to-github',
    'trabalho-js-finalizado', 'trabalho-js-atualizado', 'js-exercicios', 'projeto-web-uniruy-v2'
  ];

  /* Quando true, aparece TODO repositório público (sem fork) que não esteja
     na lista PROJETOS. Útil para ir mostrando o que você for publicando.
     Quando false, só aparece o que você listou acima. */
  var MOSTRAR_TODOS = false;

  /* =======================================================
     2. CONFIGURAÇÃO TÉCNICA
     ======================================================= */
  var USUARIO = 'Origin-Adam';
  var API = 'https://api.github.com/users/' + USUARIO + '/repos?per_page=100&sort=updated';
  var CACHE_KEY = 'portfolio:projetos:v3';
  var CACHE_TTL = 15 * 60 * 1000; // 15 minutos entre chamadas à API

  /* Cores das linguagens mais comuns */
  var CORES = {
    HTML: '#e34c26', CSS: '#563d7c', JavaScript: '#f1e05a', TypeScript: '#3178c6',
    PHP: '#4f5d95', Python: '#3572a5', Java: '#b07219', 'C#': '#178600',
    'C++': '#f34b7d', C: '#555555', Shell: '#89e051', Vue: '#41b883',
    React: '#61dafb', Astro: '#ff5a03', GDScript: '#355570', Godot: '#478cbf',
    Lua: '#000080', Makefile: '#427819', Dockerfile: '#384d54',
    'Jupyter Notebook': '#da5b0b', Batchfile: '#c1f12e', Nix: '#7e7eff',
    Svelte: '#ff3e00', Blade: '#f7523f', SCSS: '#c6538c', Markdown: '#083fa1'
  };
  var COR_PADRAO = '#8b94a8';

  var container = document.getElementById('projetos-grid');
  if (!container) return;

  /* =======================================================
     3. HELPERS
     ======================================================= */
  function esc(txt) {
    return String(txt == null ? '' : txt)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function dataCurta(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d)) return '';
    var meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return meses[d.getMonth()] + '/' + String(d.getFullYear()).slice(2);
  }

  function lerCache() {
    try {
      var bruto = localStorage.getItem(CACHE_KEY);
      if (!bruto) return null;
      var obj = JSON.parse(bruto);
      if (!obj || !obj.feito || (Date.now() - obj.feito) > CACHE_TTL) return null;
      return obj.dados;
    } catch (e) { return null; }
  }

  function gravarCache(dados) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ feito: Date.now(), dados: dados }));
    } catch (e) {}
  }

  /* =======================================================
     4. RENDERIZAÇÃO
     ======================================================= */
  function iconeEstrelas(n) {
    return '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" stroke="none">' +
      '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>';
  }

  function iconeFork() {
    return '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="6" cy="3" r="3"/><circle cx="6" cy="21" r="3"/><circle cx="18" cy="6" r="3"/>' +
      '<path d="M18 9a9 9 0 0 1-9 9"/></svg>';
  }

  function iconeSeta() {
    return '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  }

  function card(repo) {
    var lang = repo.language;
    var cor = (lang && CORES[lang]) || COR_PADRAO;
    // a linguagem já aparece no rodapé do card; não repete como tag
    var tags = (repo.tags || [])
      .filter(function (t) { return !lang || t.toLowerCase() !== lang.toLowerCase(); })
      .map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');

    var meta = [];
    if (lang) {
      meta.push('<span class="project__lang"><i style="background:' + esc(cor) + '"></i>' + esc(lang) + '</span>');
    }
    if (repo.stars) {
      meta.push('<span class="project__stat">' + iconeEstrelas() + repo.stars + '</span>');
    }
    if (repo.forks) {
      meta.push('<span class="project__stat">' + iconeFork() + repo.forks + '</span>');
    }

    return '' +
      '<article class="project' + (repo.destaque ? ' project--destaque' : '') + '">' +
        '<a class="project__link" href="' + esc(repo.url) + '" target="_blank" rel="noopener noreferrer">' +
          '<div class="project__head">' +
            '<span class="project__icon" aria-hidden="true">' +
              '<svg class="icon" viewBox="0 0 24 24"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>' +
            '</span>' +
            '<span class="project__repo">' + esc(repo.nome) + '</span>' +
            '<span class="project__go" aria-hidden="true">' + iconeSeta() + '</span>' +
          '</div>' +
          '<h3 class="project__title">' + esc(repo.titulo) + '</h3>' +
          (repo.descricao ? '<p class="project__desc">' + esc(repo.descricao) + '</p>' : '') +
          (tags ? '<ul class="project__tags">' + tags + '</ul>' : '') +
          (meta.length ? '<div class="project__meta">' + meta.join('') + '</div>' : '') +
        '</a>' +
      '</article>';
  }

  function render(lista, aviso) {
    if (!lista.length) {
      container.innerHTML =
        '<p class="projects__empty">Nenhum projeto publicado ainda. ' +
        '<a href="https://github.com/' + esc(USUARIO) + '?tab=repositories" target="_blank" rel="noopener noreferrer">Veja o GitHub</a> ' +
        'para acompanhar as novidades.</p>';
      return;
    }
    container.innerHTML = lista.map(card).join('');
    if (aviso) {
      var p = document.createElement('p');
      p.className = 'projects__aviso';
      p.textContent = aviso;
      container.parentNode.appendChild(p);
    }
  }

  /* =======================================================
     5. DADOS
     ======================================================= */
  function aplicandoCuradoria(repos) {
    var porNome = {};
    repos.forEach(function (r) { porNome[r.name] = r; });

    var lista = PROJETOS.map(function (cfg) {
      var api = porNome[cfg.repo];
      return {
        nome: cfg.repo,
        titulo: cfg.titulo || (api ? api.name : cfg.repo),
        descricao: cfg.descricao || (api ? api.description : ''),
        tags: cfg.tags || [],
        destaque: !!cfg.destaque,
        url: cfg.link || (api ? api.html_url : 'https://github.com/' + USUARIO + '/' + cfg.repo),
        language: api ? api.language : null,
        stars: api ? api.stargazers_count : 0,
        forks: api ? api.forks_count : 0,
        atualizado: api ? dataCurta(api.updated_at) : ''
      };
    });

    if (MOSTRAR_TODOS) {
      var jaListados = {};
      lista.forEach(function (p) { jaListados[p.nome] = true; });
      repos.forEach(function (r) {
        if (r.fork || jaListados[r.name]) return;
        if (EXCLUIDOS.indexOf(r.name) !== -1) return;
        lista.push({
          nome: r.name,
          titulo: r.name,
          descricao: r.description || '',
          tags: [],
          destaque: false,
          url: r.html_url,
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          atualizado: dataCurta(r.updated_at)
        });
      });
    }

    return lista;
  }

  function fallback(aviso) {
    // API fora do ar ou limite de requisições: usa só a curadoria estática
    render(aplicandoCuradoria([]), aviso);
  }

  /* =======================================================
     6. BOOT
     ======================================================= */
  var cache = lerCache();
  if (cache) {
    render(cache);
    return;
  }

  container.innerHTML =
    '<div class="projects__skeleton"></div><div class="projects__skeleton"></div>' +
    '<div class="projects__skeleton"></div><div class="projects__skeleton"></div>';

  fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (repos) {
      var lista = aplicandoCuradoria(repos);
      gravarCache(lista);
      render(lista);
    })
    .catch(function () {
      fallback('Mostrando a lista curada — não foi possível atualizar pelo GitHub agora.');
    });
})();
