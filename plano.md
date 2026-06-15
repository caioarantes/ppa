# Passo a passo: ativar o login com Google e o salvamento de progresso

Este guia é para quem **nunca mexeu com Firebase**. Siga na ordem, sem pular etapas.
Ao final, o botão **"Entrar com Google"** vai aparecer no site e o progresso de estudo
de cada pessoa será salvo na nuvem.

> Tempo estimado: 20 a 30 minutos. Você vai precisar apenas de um navegador e da sua
> conta Google.

Enquanto isso **não** estiver configurado, o site continua funcionando normalmente — só
não mostra o botão de login, e o progresso fica salvo apenas no aparelho de cada visitante.

---

## Visão geral (o que vamos fazer)

1. Criar um projeto no **Firebase** (serviço gratuito do Google).
2. Ligar o **login com Google**.
3. Criar o banco de dados **Firestore** (onde o progresso fica guardado).
4. Colar as **regras de segurança** (para cada pessoa só ver o próprio progresso).
5. Pegar a **configuração** do projeto (6 códigos).
6. Cadastrar esses 6 códigos no **GitHub** (chamados "secrets").
7. **Republicar** o site.

No fim há uma seção de **teste** e uma de **problemas comuns**.

---

## Parte 1 — Criar o projeto no Firebase

1. Abra <https://console.firebase.google.com> e faça login com sua conta Google.
2. Clique em **"Criar um projeto"** (ou *"Add project"*).
3. Dê um nome, por exemplo: `estudo-ppa`. Clique em **Continuar**.
4. Na tela do **Google Analytics**, pode **desativar** (não é necessário). Clique em **Continuar / Criar projeto**.
5. Aguarde alguns segundos e clique em **Continuar** quando aparecer "Seu projeto está pronto".

✅ Pronto: você tem um projeto Firebase.

---

## Parte 2 — Ligar o login com Google

1. No menu da esquerda, clique em **Criar (Build) → Authentication**.
2. Clique em **"Vamos começar" / "Get started"**.
3. Na aba **"Sign-in method"** (Método de login), clique em **Google** na lista.
4. Ligue a chavinha **"Ativar / Enable"**.
5. Em **"E-mail de suporte do projeto"**, escolha seu e-mail.
6. Clique em **Salvar**.

### 2.1 — Autorizar os endereços do site

Ainda em **Authentication**:

1. Abra a aba **"Settings" / "Configurações"** (no topo).
2. Procure **"Authorized domains" / "Domínios autorizados"**.
3. Clique em **"Add domain" / "Adicionar domínio"** e adicione exatamente:

   ```
   caioarantes.github.io
   ```

4. Adicione também (para testar no seu computador):

   ```
   localhost
   ```

> Sem este passo, o login dá erro de "domínio não autorizado".

✅ Pronto: o login com Google está ligado e liberado para o site.

---

## Parte 3 — Criar o banco de dados (Firestore)

1. No menu da esquerda, clique em **Criar (Build) → Firestore Database**.
2. Clique em **"Criar banco de dados" / "Create database"**.
3. Escolha o local (region). Pode deixar o sugerido (ex.: `southamerica-east1` ou `us`). Clique em **Avançar**.
4. Escolha **"Iniciar no modo de produção"** (production mode). Clique em **Criar / Ativar**.
5. Aguarde a criação.

### 3.1 — Colar as regras de segurança

1. Dentro do **Firestore Database**, abra a aba **"Rules" / "Regras"** (no topo).
2. **Apague tudo** que estiver lá e **cole exatamente** o texto abaixo:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /progress/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```

3. Clique em **"Publicar" / "Publish"**.

> Essas regras garantem que cada usuário **só** consegue ler e gravar o próprio progresso.
> (Esse mesmo texto está no arquivo `firestore.rules` do projeto.)

✅ Pronto: o banco está criado e seguro.

---

## Parte 4 — Pegar a configuração do projeto (os 6 códigos)

1. No canto superior esquerdo, clique na **engrenagem ⚙️ → "Configurações do projeto" / "Project settings"**.
2. Role até a seção **"Seus apps" / "Your apps"**.
3. Clique no ícone **`</>`** (app **Web**).
4. Dê um apelido, ex.: `site-ppa`. **NÃO** marque "Firebase Hosting". Clique em **"Registrar app"**.
5. Vai aparecer um trecho de código parecido com este:

   ```js
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "estudo-ppa.firebaseapp.com",
     projectId: "estudo-ppa",
     storageBucket: "estudo-ppa.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abc123def456"
   };
   ```

6. **Deixe essa tela aberta** — você vai copiar esses 6 valores na próxima parte.

> Esses valores **não são senha secreta** — eles vão dentro do site mesmo. A segurança
> de verdade são as regras da Parte 3.2 e os domínios autorizados da Parte 2.1.

| Valor no código       | Nome do "secret" no GitHub (Parte 5)   |
| --------------------- | -------------------------------------- |
| `apiKey`              | `VITE_FIREBASE_API_KEY`                |
| `authDomain`          | `VITE_FIREBASE_AUTH_DOMAIN`            |
| `projectId`           | `VITE_FIREBASE_PROJECT_ID`             |
| `storageBucket`       | `VITE_FIREBASE_STORAGE_BUCKET`         |
| `messagingSenderId`   | `VITE_FIREBASE_MESSAGING_SENDER_ID`    |
| `appId`               | `VITE_FIREBASE_APP_ID`                 |

---

## Parte 5 — Cadastrar os 6 códigos no GitHub (secrets)

Os "secrets" são onde o site guarda esses códigos na hora de publicar.

1. Abra: <https://github.com/caioarantes/ppa/settings/secrets/actions>
   (ou: repositório → **Settings** → menu **Secrets and variables** → **Actions**).
2. Clique no botão verde **"New repository secret"**.
3. Em **Name**, escreva o nome da **direita** da tabela acima (ex.: `VITE_FIREBASE_API_KEY`).
4. Em **Secret**, cole o valor correspondente do código do Firebase (ex.: o conteúdo entre aspas do `apiKey`).
5. Clique em **"Add secret"**.
6. **Repita** os passos 2 a 5 para os **6** códigos, um por vez.

> ⚠️ Copie só o que está **entre as aspas**. Não inclua aspas, vírgulas, nem o nome do campo.
> Exemplo: para o `apiKey`, copie apenas `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX`.

Ao final você terá **6 secrets** cadastrados.

---

## Parte 6 — Republicar o site

Os secrets só entram no site numa nova publicação. Faça assim:

1. Abra: <https://github.com/caioarantes/ppa/actions>
2. Na lista da esquerda, clique no fluxo **"Deploy to GitHub Pages"**.
3. À direita, clique no botão **"Run workflow"** → confirme em **"Run workflow"** (deixe `main`).
4. Aguarde aparecer o ✓ verde (1 a 2 minutos).

✅ Pronto. Abra <https://caioarantes.github.io/ppa/> e o botão **"Entrar com Google"**
deve aparecer no canto superior direito.

---

## Parte 7 — Testar

1. Acesse <https://caioarantes.github.io/ppa/>.
2. Clique em **"Entrar com Google"** e escolha sua conta.
3. Vá em **Vídeo-aulas** e marque um vídeo como **assistido** (botão "Marcar como assistido").
4. Vá na **Wiki** e marque um artigo como **lido**.
5. Volte à página inicial: a barra de **progresso** deve refletir o que você marcou.
6. Para confirmar a sincronização: abra o site em **outro aparelho** (ou outra aba anônima),
   entre com a **mesma conta** Google — o progresso deve aparecer igual.

---

## Problemas comuns

- **O botão "Entrar com Google" não aparece.**
  Algum dos 6 secrets faltou ou está com nome errado. Confira a lista em
  <https://github.com/caioarantes/ppa/settings/secrets/actions> e **rode o workflow de novo**
  (Parte 6). Lembre: o site só lê os secrets quando é republicado.

- **Erro "auth/unauthorized-domain" ao clicar em entrar.**
  Faltou autorizar o domínio. Volte à **Parte 2.1** e adicione `caioarantes.github.io`.

- **A janelinha de login do Google fecha sozinha / é bloqueada.**
  O navegador bloqueou o pop-up. Permita pop-ups para o site e tente de novo.

- **Marquei progresso mas não salva na nuvem.**
  Verifique se você está **logado** (deve aparecer sua foto no canto). Sem login, o
  progresso fica só no aparelho — isso é normal e proposital.

- **Erro de permissão no banco (Missing or insufficient permissions).**
  As regras não foram publicadas. Refaça a **Parte 3.1** e clique em **Publicar**.

---

## Desenvolvimento no seu computador (opcional)

Se quiser rodar e testar o login localmente (não é obrigatório):

1. Na pasta do projeto, copie o arquivo `.env.example` para `.env.local`.
2. Abra o `.env.local` e preencha cada `VITE_FIREBASE_...=` com o valor do código do Firebase.
3. Rode `npm run dev` e acesse o endereço `http://localhost:5173/ppa/`.

Pronto — o login funcionará também no seu computador (por isso adicionamos `localhost`
nos domínios autorizados na Parte 2.1).
