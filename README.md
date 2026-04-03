# Los Caballos

Sistema full-stack desenvolvido para gerenciamento de um estábulo, incluindo autenticação de usuários, controle de recursos e operações do negócio.

A separação entre frontend e backend também se reflete no ambiente de desenvolvimento:

Frontend: Visual Studio Code  
Backend: IntelliJ IDEA

---

## Sobre o Projeto

O **Los Caballos** é uma aplicação web criada para simular uma solução real de negócio no contexto de gestão de estábulos.

O sistema permite:

- Autenticação de usuários (login e senha)
- Operações completas de CRUD (Criar, Ler, Atualizar e Deletar)
- Gerenciamento de cavalos, usuários e provisões
- Validação de dados sensíveis (CPF, CNPJ, etc.)
- Armazenamento de dados em banco H2

---

## Arquitetura

O projeto segue uma arquitetura full-stack:

- **Frontend:** Angular
- **Backend:** Spring Boot (Java)
- **Banco de Dados:** H2 Database
- **Padrão arquitetural:** MVC (Model-View-Controller)

---

## Funcionalidades

- Sistema de autenticação com senha criptografada (BCrypt)
- CRUD completo
- Validação de dados
- Estrutura modular e escalável

---

## Segurança

As senhas dos usuários são protegidas utilizando criptografia com **BCryptPasswordEncoder**, garantindo que não sejam armazenadas em texto puro no banco de dados.

---

## Estrutura do Projeto

```id="wt5o0f"
frontend/ → Interface do usuário (Angular)
backend/  → API e regras de negócio (Spring Boot)
```

---

## Objetivo

Este projeto foi desenvolvido com o objetivo de simular a entrega de uma solução real de software, aplicando boas práticas de desenvolvimento, organização de código e arquitetura.

---

## Aprendizados

- Desenvolvimento full-stack
- Aplicação do padrão MVC
- Implementação de autenticação segura
- Uso de banco de dados em memória (H2)
- Estruturação de projetos escaláveis

---
