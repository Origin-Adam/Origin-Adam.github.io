# Portfólio — Adam Gabriel

Site estático pessoal, pronto para o **GitHub Pages**. Sem build, sem dependências, sem framework.

```
.
├── index.html          # estrutura da página
├── css/style.css       # design system + layout + responsivo
├── js/main.js          # tema, menu, animações, terminal, formulário
├── assets/favicon.svg  # ícone do site
├── .nojekyll           # desliga o Jekyll do GitHub Pages
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

## 2. O que ainda precisa ser preenchido

###[a] Timeline — Experiência

Hoje está com a **VX Case** (cargo de Analista de E-Commerce, desde 14/07/2025) e os
**projetos pessoais de Game Dev**. Falta:

- **Trocar as bullets da VX Case** por resultados concretos. O texto atual é um
  modelo coerente com o cargo, mas só você sabe o que realmente entregou.
  Prefira números: *"automação que eliminou X horas/semana"*, *"Y casos de teste
  escritos"*, *"Z SKUs gerenciados"*.
- **Incluir etapas anteriores**, se tiver. No `index.html` há um bloco comentado
  com o modelo de `<li>` pronto para copiar e colar dentro do `<ol class="timeline">`.

###️ Checagem de conteúdo

- [ ] Bullets da VX Case com resultados reais
- [ ] Etapas anteriores adicionadas (se houver) — use o modelo comentado
- [ ] Habilidades ajustadas ao seu stack real (`<ul class="tags">` em `index.html`)
- [ ] Foto no lugar do monograma `AG` (no header, troque o `<span class="brand__mark">`
      por `<img src="assets/foto.jpg" alt="Adam Gabriel">`)

---

## 3. Rodar localmente

Basta abrir `index.html` no navegador. Para ficar mais parecido com o deploy:

```bash
npx serve .
# ou
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## 4. Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Portfólio inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_USUARIO.github.io.git
git push -u origin main
```

Depois no GitHub:

1. Repo → **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: `main` / `(root)` → **Save**

O site fica no ar em `https://SEU_USUARIO.github.io` em ~1 minuto.

> **Importante:** o repositório precisa se chamar **`SEU_USUARIO.github.io`** para o domínio
> raiz funcionar. Para um subdiretório (`github.com/SEU_USUARIO/repo`), o site aparece em
> `github.com/SEU_USUARIO/repo` — nesse caso não é preciso mudar nada no código, porque
> todos os caminhos (`css/...`, `js/...`, `assets/...`) são relativos.

---

## 5. Personalizar o visual

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

## 6. Detalhes técnicos

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

---

## 7. Checklist de lançamento

- [ ] Bullets da VX Case com resultados concretos
- [ ] Etapas anteriores na timeline (se houver)
- [ ] Habilidades ajustadas ao stack real
- [ ] Foto no lugar do monograma `AG`
- [ ] `favicon.svg` gerado com suas iniciais (ou um ícone próprio)
- [ ] Testado no celular
- [ ] `git push` feito e Pages ativado
- [ ] Open Graph com imagem 1200×630 (opcional, mas melhora o compartilhamento)
