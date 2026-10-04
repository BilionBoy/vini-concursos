# Charles Vinícius — site

Site estático (HTML + CSS + JS puro, sem dependências e sem build).

## Estrutura

```
index.html            página principal
404.html              página de erro
assets/style.css      estilos
assets/main.js        menu mobile, seção ativa no menu e galeria
assets/fonts/         fontes
images/               fotos
_headers              cabeçalhos de segurança e cache (Cloudflare Pages / Netlify)
```

## Rodar localmente

```
python3 -m http.server 8000
```

Abrir http://localhost:8000

## Publicar no Cloudflare Pages

1. Subir esta pasta para um repositório no GitHub.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → escolher o repositório.
3. Build command: (vazio). Build output directory: `/`.
4. Deploy. Depois, em Custom domains, apontar o domínio.

Sem Git: em Pages → Create → **Upload assets**, arrastar esta pasta.

## Atualizar favicon ou CSS/JS

Ao trocar `style.css` ou `main.js`, aumentar o `?v=` no `index.html` (ex.: `?v=2`) para os navegadores baixarem a versão nova. O mesmo vale para os ícones (`?v=3`).

## WhatsApp

Os links usam `https://wa.me/5569992684177?text=...`. Para trocar o número, substituir em `index.html`.
