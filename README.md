# 📕 API - Gerenciador de tarefas
Com intuito de praticar novas tecnolóligas essa API tras algumas regras que devem ser cumpridas conforme orientações

## Tecnologías
- NodeJs
- Express
- Jest
- Zod
- Docker
- TypScript
- Prisma ORM
- PostgresSQL
- JWT

## Regra de negócio
### Gerenciamento de Times
- [x] Apenas usuários admin pode criar e editar times.
- [x] Apenas usuários admin pode adicionar ou remover membros do time.

### Tarefas
- [x] CRUD de tarefas.
- [x] Status: "Pendente", "Em progresso", "Concluído".
- [x] Prioridade: "Alta", "Média", "Baixa".
- [x] Atribuição de tarefas para membros específicos.

### Usuário Admin
- [x] Visualizar e gerenciar todas as tarefas, usuários e times.

### Membros
- [x] Visualiza tarefas do time.
- [x] Pode editar apenas suas tarefas.

##

### Banco de dados
> [!NOTE]
> Você pode acompanhar abaixo nesse link o relacionamento do banco de dados:

<a href="https://drawsql.app/teams/startprocess/diagrams/task-manager">DrawSQL Task Manager </a>