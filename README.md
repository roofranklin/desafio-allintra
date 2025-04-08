# Documentação Markdown consumida da API do Bitbucket com opção de edição local

Este projeto é uma Single Page Application (SPA) construída em **React + TypeScript + Vite**, que consome arquivos Markdown diretamente de um repositório no **Bitbucket**, permitindo:

- Visualização dos arquivos Markdown
- Edição local com salvamento no `localStorage`
- Comparação (diff) entre versões locais e remotas
- Sessão administrativa para gerenciamento das edições

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sass](https://sass-lang.com/)
- [React Markdown](https://www.npmjs.com/package/react-markdown)
- [diff-match-patch](https://github.com/google/diff-match-patch) – biblioteca para visualização de diferenças entre textos

---

## Como visualizar online
Foi feito deploy na Netlify e o mesmo está disposnível em `https://allintra-docs.netlify.app/`
Trabelhei também a responsividade, portanto se tiver no celular acesse tranquilo que não vai quebrar 😉

## 🖥️ Como Rodar Localmente

### 🔧 Requisitos mínimos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passo a passo

1. **Clone o repositório**  
```bash
  git clone https://github.com/seu-usuario/seu-projeto.git
  cd seu-projeto
```

2. **Instale as dependências**
```bash
  npm install
  # ou
  yarn
```

3. **Inicie o servidor de desenvolvimento**
```bash
  npm run dev
  # ou
  yarn dev
```

4. **Abra seu navegador**
Acesse `http://localhost:5173`

## Funcionalidades

### Homepage
- Exibe a estrutura de navegação (_sidebar.md)
- Carrega os arquivos .md correspondentes
- Permite entrar em modo de edição com textarea
- Mostra status de sincronizado/não sincronizado

### Edição Local
- Salva alterações no localStorage
- Mantém backup local mesmo ao recarregar a página
- Mostra ícone/estado indicando alterações pendentes

### Área Administrativa
- Lista todos os arquivos modificados localmente
- Ordena por data/hora da última edição
- Permite ver um diff visual entre o original e a versão local

## Possíveis Problemas e Soluções (Troubleshooting)

| Problema                                                   | Solução                                                                                      |
|------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Arquivo Markdown abre em branco                            | Verifique se o nome do arquivo está correto e existe no repositório                          |
| Arquivos com subpastas não abrem no diff                   | Certifique-se de que a rota `/admin/diff/*` está corretamente configurada no `react-router`  |
| Alterações somem ao voltar para a homepage                 | Verifique se o conteúdo salvo está sendo buscado do `localStorage` corretamente              |
| Arquivo continua listado no admin mesmo após restaurar     | Remova o item do `localStorage` caso ele esteja idêntico ao do repositório                   |

## Estrutura de pastas simplificada
```bash
src/
├── components/
│   ├── Header.tsx
│   ├── markdownViewer.tsx
│   └── Sidebar.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── AdminPanel.tsx
│   └── DiffViewerPage.tsx
├── utils/
│   ├── storage.ts
│   └── bitbucketApi.ts
├── App.tsx
└── main.tsx
```

## Testes de componentes
Fiz pequenos testes nos componentes com Vitest, caso tivesse mais tempo hábil poderia implementar testes em toda a aplicação, inclusive e2e em Playwright.
Para rodar os testes execute o comando `npx vitest run` no terminal.

### Desenvolvido por [Roosevelt Franklin](https://rcode.com.br)
