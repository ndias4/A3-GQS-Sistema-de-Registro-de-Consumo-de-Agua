# Projeto MonitorÁgua (Aplicativo Mobile) 📱💧

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Norma de Qualidade](https://img.shields.io/badge/ISO/IEC%2025010-compliant-blue)

## 🖼️ Telas do Aplicativo

*(**Dica:** Substitua os links abaixo por screenshots reais do seu app. Isso causa um impacto visual imenso!)*

| Tela de Login | Dashboard Principal | Gráficos de Consumo |
| :---: | :---: | :---: |
| `[SCREENSHOT DA TELA DE LOGIN]` | `[SCREENSHOT DO DASHBOARD]` | `[SCREENSHOT DOS GRÁFICOS]` |

---

## 🎯 Visão Geral do Projeto

O **MonitorÁgua** é um **aplicativo mobile** (para Android e iOS) projetado para promover o uso consciente de recursos hídricos e fornecer uma ferramenta robusta para o controle de gastos com água em residências.

Através de uma interface intuitiva e acessível, os usuários podem acompanhar seu consumo diário, analisar o histórico, receber alertas inteligentes e obter dicas para economizar. O app se conecta a uma API RESTful robusta que gerencia os dados e, futuramente, se integrará a dispositivos IoT para uma coleta totalmente automatizada.

Todo o projeto foi desenvolvido seguindo os critérios de qualidade da norma **ISO/IEC 25010**, com foco especial em **Usabilidade**, **Segurança** e **Manutenibilidade**.

---

## ✨ Funcionalidades do Aplicativo

-   **Dashboard Intuitivo:** Visualize o consumo do dia atual e o resumo do mês em um painel de fácil compreensão assim que abrir o app.
-   **Histórico Detalhado:** Acesse registros de consumo por dia, semana ou mês e entenda seus padrões de uso.
-   **Gráficos Visuais:** Gráficos interativos que facilitam a comparação e a análise do seu histórico de consumo de água.
-   **Alertas em Tempo Real:** Receba notificações push quando seu consumo exceder a média ou se aproximar de uma nova bandeira tarifária.
-   **Dicas de Economia:** Navegue por uma seção de cards com dicas práticas e eficientes para reduzir o consumo no dia a dia.
-   **Estimativa de Economia:** Veja em tempo real o quanto você pode economizar na sua conta de água ao seguir as metas de redução.
-   **Cadastro e Login Seguros:** Crie sua conta e acesse seus dados com segurança garantida por autenticação moderna.

---

## 💻 Arquitetura e Tecnologias

O projeto é composto por um aplicativo mobile e uma API de backend que se comunicam para fornecer os dados.

#### Aplicativo Mobile
-   **Framework:** `[Preencha aqui: React Native, Flutter, Swift, Kotlin, etc.]`
-   **Gerenciamento de Estado:** `[Preencha aqui: Redux, Context API, etc.]`
-   **Bibliotecas de UI:** `[Preencha aqui: Material UI, etc.]`

#### Backend (API)
-   **Ambiente:** Node.js
-   **Framework:** Express.js
-   **Banco de Dados:** PostgreSQL
-   **Autenticação:** JSON Web Token (JWT)
-   **Criptografia:** Bcrypt.js

---

## 🚀 Como Executar o Projeto

Para executar o projeto completo, tanto o backend quanto o aplicativo precisam estar em execução.

### 1. Configurando o Backend (API)

*Siga os passos no terminal, na pasta raiz do projeto.*

1.  **Instale as dependências:**
    ```bash
    npm install
    ```
2.  **Configure as variáveis de ambiente:**
    - Renomeie `.env.example` para `.env` e preencha com suas credenciais do PostgreSQL.
3.  **Configure o banco de dados:**
    - Crie um banco de dados no PostgreSQL com o nome definido no arquivo `.env`.
    - Execute os scripts SQL para criar as tabelas.
4.  **Inicie o servidor da API:**
    ```bash
    npm run dev
    ```
    O servidor estará em execução em `http://localhost:3000`. **Mantenha este terminal aberto.**

### 2. Executando o Aplicativo Mobile

*Com o backend em execução, abra um **novo terminal** na pasta raiz do projeto (ou na subpasta do app, se houver).*

1.  **Acesse a pasta do aplicativo (se aplicável):**
    ```bash
    cd [pasta_do_app_mobile]
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o aplicativo:**
    ```bash
    # Se você usa React Native CLI
    npx react-native run-android
    # ou
    npx react-native run-ios

    # Se você usa Expo
    npx expo start
    ```
    Isso abrirá o Metro Bundler, e você poderá executar o app em um emulador ou no seu próprio dispositivo.

---

## 🏅 Compromisso com a Qualidade (Requisitos Não Funcionais)

A qualidade do software é um pilar deste projeto, guiado pelos seguintes requisitos:

-   **Usabilidade (RNF01):** A interface do app foi projetada para ser intuitiva e acessível, em conformidade com os princípios da norma **ISO/IEC 25010**.
-   **Segurança (RNF03):** A proteção de dados é prioridade. Senhas são criptografadas com **Bcrypt** e a comunicação com a API é protegida por tokens JWT.
-   **Desempenho e Escalabilidade (RNF02, RNF06, RNF07):** A arquitetura foi planejada para suportar 100 usuários simultâneos com tempo de resposta médio inferior a 2 segundos.
-   **Manutenibilidade (RNF08):** O código-fonte segue as melhores práticas, como **Clean Code** e os princípios **SOLID**, para facilitar futuras manutenções.

---

## 🧑‍💻 Autores

Desenvolvido por **[Carlos Eduardo Santos da Silva – RA 823224851, Davi Bezerra do Nascimento – RA 8232165891, Fernando Dias do Nascimento – RA 823257801, Julia Oliveira Rapozo – RA 8232158111, Victor Mendes Bono – RA 823217710]**.

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)]([LINK_PARA_SEU_LINKEDIN_AQUI])
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)]([LINK_PARA_SEU_GITHUB_AQUI])