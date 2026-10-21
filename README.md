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

## 1. O que você precisa preencher (obrigatório)

Abra `js/main.js` e edite o bloco `CONFIG` no topo:

```js
var CONFIG = {
  nome: 'Adam Gabriel',
  email: 'seu-email@exemplo.com',            // ← troque
  github: 'https://github.com/SEU_USUARIO',   // ← troque
  linkedin: 'https://linkedin.com/in/SEU_USUARIO', // ← troque
  linkedinLabel: 'linkedin.com/in/SEU_USUARIO',
  githubLabel: 'github.com/SEU_USUARIO',
  localidade: ''   // ex.: 'Recife, PE' — se vazio, a linha não aparece
};
```

O script aplica esses valores automaticamente nos links do header, do rodapé e da
seção de contato — **não precisa editar o HTML para trocar e-mail/GitHub/LinkedIn**.

### Checklist

- [ ] `CONFIG.email` — seu e-mail real
- [ ] `CONFIG.github` — seu usuário do GitHub
- [ ] `CONFIG.linkedin` — seu perfil do LinkedIn
- [ ] `CONFIG.localidade` — sua cidade (opcional; a linha some se ficar vazio)
- [ ] Seções **Experiência**: troque `AAAA — AAAA`, `Nome da Empresa` e as bullets em `index.html`
- [ ] Blocos de `<li>` dentro de `.timeline__list` — apague os textos de exemplo
- [ ] Habilidades: em `index.html`, ajuste as `<li>` dentro de `<ul class="tags">` para o que você realmente usa
- [ ] Adicione sua foto: troque o monograma `AG` por `<img src="assets/foto.jpg" alt="Adam Gabriel">` no header

---

## 2. Rodar localmente

Basta abrir `index.html` no navegador. Para ficar mais parecido com o deploy:

```bash
npx serve .
# ou
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## 3. Publicar no GitHub Pages

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

## 4. Personalizar o visual

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

Trocar `--accent` e `--accent-2` muda o site inteiro (botões, gradientes, timeline,
ícones). O tema claro usa o mesmo bloco, com as variáveis sobrepostas em
`[data-theme='light']`.

### Adicionar uma seção nova

1. Copie um `<section class="section" id="...">` existente no `index.html`
2. Adicione o item correspondente na `<ul class="nav__list">` do header
3. A animação de entrada (`.reveal`) e o scroll-spy já funcionam sozinhos

---

## 5. Detalhes técnicos

- **Tema**: salvo em `localStorage` (`chave: "tema"`); sem salvo, segue o
  `prefers-color-scheme` do sistema. O script inline no `<head>` evita o "flash" branco.
- **Acessibilidade**: skip-link, `aria-label`, `aria-expanded`, foco visível,
  `prefers-reduced-motion` respeitado (desliga animações).
- **Formulário**: abre o cliente de e-mail com a mensagem montada (`mailto:`), sem
  backend. Para receber no navegador, troque pelo Formspree — em `index.html`:
  `<form class="contact__form" id="contact-form" action="https://formspree.io/f/SEU_ID" method="POST">`
  e remova o bloco de envio em `js/main.js`.
- **SEO**: ajuste `<title>`, `<meta name="description">` e as tags Open Graph no `<head>`.

---

## 6. Checklist de lançamento

- [ ] Dados do `CONFIG` preenchidos
- [ ] Textos da experiência reais (sem "AAAA — AAAA" ou "Nome da Empresa")
- [ ] Habilidades ajustadas ao seu stack real
- [ ] Foto no lugar do monograma `AG`
- [ ] `favicon.svg` gerado com suas iniciais (ou um ícone próprio)
- [ ] Testado no celular
- [ ] `git push` feito e Pages ativado
- [ ] Open Graph com imagem 1200×630 (opcional, mas melhora o compartilhamento)
