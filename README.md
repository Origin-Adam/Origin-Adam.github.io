# Portfólio — Adam Gabriel

Site estático pessoal, pronto para o **GitHub Pages**. Sem build, sem dependências, sem framework.

```
.
├── index.html               # estrutura da página
├── css/style.css            # design system + layout + responsivo
├── js/main.js               # tema, menu, animações, terminal, formulário
├── js/projects.js           # seção Projetos (API do GitHub) + curadoria
├── assets/favicon.svg       # ícone do site
├── .github/workflows/       # deploy automático no GitHub Pages
├── package.json             # script de desenvolvimento local
├── .nojekyll                # desliga o Jekyll do GitHub Pages
└── .gitignore
```

---

## 1. Dados pessoais

Os dados ficam centralizados no bloco `CONFIG` do topo de `js/main.js`:

```js
var CONFIG = {
  nome: 'Adam Gabriel',
  email: 'adamgabriel404@gmail.com',
  github: 'https://github.com/Origin-Adam',
  githubLabel: 'github.com/Origin-Adam',
  repos: 'https://github.com/Origin-Adam?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/adam-gabriel-aa47402a7/',
  linkedinLabel: 'linkedin.com/in/adam-gabriel-aa47402a7',
  localidade: 'Salvador, BA'   // vazio '' => a linha some
};
```

O script aplica esses valores em todos os links do site. No `index.html`, cada link
dependente do `CONFIG` tem um atributo `data-link="tipo"`:

| `data-link` | Onde aparece | Texto |
|---|---|---|
| `email-main` | seção Contato | substituído pelo e-mail |
| `email-hero` | redes sociais do hero | — |
| `github` | seção Contato | substituído pelo `githubLabel` |
| `github-hero` | redes sociais do hero | — |
| `repos` | seção Contato (link "Ver todos os projetos no GitHub") | mantido |
| `linkedin` | seção Contato | substituído pelo `linkedinLabel` |
| `linkedin-hero` | redes sociais do hero | — |

> Se você trocar os links direto no `index.html`, lembre de atualizar o `CONFIG`
> também — senão o JavaScript sobrescreve no próximo carregamento.

---

## 2. Seção Projetos (API do GitHub)

A seção busca seus repositórios públicos pela API do GitHub e monta os cards
sozinha — com linguagem, stars, forks e data de atualização. Você não precisa
mexer no site quando publicar um projeto novo.

### Curadoria — o que aparece

Tudo é controlado no topo de `js/projects.js`:

```js
var PROJETOS = [
  {
    repo: 'https-github.com-adamgabriel-projeto-web-uniruy',
    titulo: 'Projeto Web Uniruy',          // nome bonito (padrão: nome do repo)
    descricao: 'Site institucional em HTML e CSS puro, com layout responsivo.',
    tags: ['HTML', 'CSS', 'Responsivo'],
    destaque: true                          // card maior, ocupa 2 colunas
  },
  // ...outros
];

var MOSTRAR_TODOS = false;
```

- `repo` — nome **exato** do repositório na sua conta (sem `github.com/`).
- `titulo` / `descricao` / `tags` — opcionais; se omitidos, usa o que está no GitHub.
- `destaque: true` — o card ocupa 2 colunas (use em 1 ou 2 projetos, no máximo).
- `MOSTRAR_TODOS = true` — passa a exibir **todo** repositório público (sem fork)
  que não esteja na lista. Útil quando você começar a publicar os projetos de
  jogo e quiser que apareçam sozinhos.
- Repositórios que você não listar ficam **ocultos** (com `MOSTRAR_TODOS = false`).
  É assim que o repo de perfil (`Origin-Adam`), os exercícios de curso e o
  projeto de outra pessoa ficam de fora.

### Limite de requisições

A API do GitHub permite **60 requisições/hora por IP** sem autenticação. Por isso:

- o resultado fica salvo no `localStorage` por **30 minutos** (`portfolio:projetos`);
- se a API falhar (limite ou sem internet), o site mostra a **lista curada
  estática** com um aviso discreto — nunca fica quebrado.

Se algum dia o limite incomodar, dá para trocar por um proxy como o Vercel
(`/api/github`) ou usar a API autenticada. Hoje não é necessário.

### Quando os repositórios ficarem melhores

Os nomes atuais (`Trabalho-JS-atualizado`, `https-github.com-...`) foram gerados
automaticamente e não ajudam num portfólio. Duas opções:

1. **Renomear no GitHub** (recomendado) e atualizar o `repo` na curadoria.
2. Manter o nome e deixar o `titulo`/`descricao` bonitarem a exibição — o que já
   está feito.

---

## 3. O que ainda precisa ser preenchido

### Timeline — Experiência

Hoje está com a **VX Case** (cargo de Analista de E-Commerce, desde 14/07/2025) e os
**projetos pessoais de Game Dev**. Falta:

- **Trocar as bullets da VX Case** por resultados concretos. O texto atual é um
  modelo coerente com o cargo, mas só você sabe o que realmente entregou.
  Prefira números: *"automação que eliminou X horas/semana"*, *"Y casos de teste
  escritos"*, *"Z SKUs gerenciados"*.
- **Incluir etapas anteriores**, se tiver. No `index.html` há um bloco comentado
  com o modelo de `<li>` pronto para copiar e colar dentro do `<ol class="timeline">`.

### Checagem de conteúdo

- [ ] Bullets da VX Case com resultados reais
- [ ] Etapas anteriores adicionadas (se houver) — use o modelo comentado
- [ ] Habilidades ajustadas ao seu stack real (`<ul class="tags">` em `index.html`)
- [ ] Títulos/descrições dos repositórios revisados em `js/projects.js`
- [ ] Foto no lugar do monograma `AG` (no header, troque o `<span class="brand__mark">`
      por `<img src="assets/foto.jpg" alt="Adam Gabriel">`)

---

## 4. Rodar localmente

```bash
npm start          # sobe em http://localhost:4173
```

Sem instalar nada, também funciona:

```bash
npx serve .
# ou
python -m http.server 8000
```

---

## 5. Publicar no GitHub Pages

### Passo 1 — criar o repositório

O repositório **precisa** se chamar `Origin-Adam.github.io` para o domínio raiz
funcionar. Crie no GitHub **sem** README, sem `.gitignore` e sem licença
(marcando as opções de inicialização).

### Passo 2 — subir o código

```bash
git remote add origin https://github.com/Origin-Adam/Origin-Adam.github.io.git
git push -u origin main
```

### Passo 3 — ativar o Pages

Você tem **duas opções**. Escolha uma:

**Opção A — GitHub Actions (recomendado, já configurado)**

1. Repo → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. Salve e vá em **Actions** → o workflow "Deploy to GitHub Pages" roda sozinho
4. O site fica no ar em `https://origin-adam.github.io` em ~1 minuto

> Cada `git push` na `main` republica o site. O workflow está em
> `.github/workflows/deploy.yml` e não precisa de nenhum segredo.

**Opção B — Deploy por branch (mais simples, sem workflow)**

1. Apague a pasta `.github/workflows/`
2. Repo → **Settings** → **Pages**
3. **Build and deployment** → Source: **Deploy from a branch**
4. Branch: `main` / `(root)` → **Save**

> Não use as duas ao mesmo tempo: dá conflito de publicação.

### Domínio próprio (opcional)

Se quiser um domínio como `seunome.com.br`:

1. Crie um arquivo `CNAME` na raiz do repositório com o domínio:
   ```
   seu Dominio.com.br
   ```
2. No registrador, aponte os registros DNS para os IPs do GitHub:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME  www   Origin-Adam.github.io
   ```
3. No **Settings** → **Pages**, marque **Enforce HTTPS** depois que o
   certificado for emitido (leva até 1 hora).

---

## 6. Personalizar o visual

O design é **sem bordas**: os cards não têm contorno nem fundo fixo — a hierarquia
vem da tipografia, do espaçamento e de um fundo sutil que só aparece no hover.
Para reintroduzir um card com borda, é só adicionar em `css/style.css`:

```css
.skill-card { border: 1px solid var(--border); background: var(--surface); padding: 26px; }
```

### Tokens

Tudo está em custom properties no topo de `css/style.css`:

```css
:root {
  --accent:   #22d3ee;   /* cor principal (ciano)      */
  --accent-2: #a78bfa;   /* cor secundária (violeta)   */
  --radius:   14px;
  --font-sans: 'Inter', ...;
  --font-mono: 'JetBrains Mono', ...;
}

/* o tema claro sobrescreve com versões mais escuras (contraste WCAG AA) */
[data-theme='light'] {
  --accent:   #0e7490;
  --accent-2: #6d28d9;
}
```

### Adicionar uma seção nova

1. Copie um `<section class="section" id="...">` existente no `index.html`
2. Adicione o item correspondente na `<ul class="nav__list">` do header
3. A animação de entrada (`.reveal`) e o scroll-spy já funcionam sozinhos

---

## 7. Detalhes técnicos

- **Tema**: salvo em `localStorage` (chave `"tema"`); sem salvo, segue o
  `prefers-color-scheme` do sistema. O script inline no `<head>` evita o "flash" branco.
- **Acessibilidade**: skip-link, `aria-label`, `aria-expanded`, foco visível,
  `prefers-reduced-motion` respeitado (desliga animações).
  Lighthouse: **100 / 100 / 100** (a11y, boas práticas, SEO) nos dois temas.
- **Formulário**: abre o cliente de e-mail com a mensagem montada (`mailto:`), sem
  backend. Para receber no navegador, troque pelo Formspree — em `index.html`:
  `<form class="contact__form" id="contact-form" action="https://formspree.io/f/SEU_ID" method="POST">`
  e remova o bloco de envio em `js/main.js`.
- **SEO**: ajuste `<title>`, `<meta name="description">` e as tags Open Graph no `<head>`.
- **Caminhos relativos**: o site funciona tanto em `origin-adam.github.io` quanto
  em `origin-adam.github.io/qualquer-subpasta/`, sem configuração extra.

---

## 8. Checklist de lançamento

- [ ] Bullets da VX Case com resultados concretos
- [ ] Etapas anteriores na timeline (se houver)
- [ ] Habilidades ajustadas ao stack real
- [ ] Títulos/descrições dos repositórios revisados em `js/projects.js`
- [ ] Foto no lugar do monograma `AG`
- [ ] `favicon.svg` gerado com suas iniciais (ou um ícone próprio)
- [ ] Testado no celular
- [ ] Repositório criado como `Origin-Adam.github.io`
- [ ] `git push` feito e Pages ativado (Actions ou branch, **não os dois**)
- [ ] Open Graph com imagem 1200×630 (opcional, mas melhora o compartilhamento)
