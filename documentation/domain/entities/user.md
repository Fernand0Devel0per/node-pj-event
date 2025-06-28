# Entidade: Usuário

## Descrição Geral

A entidade **Usuário** representa uma pessoa cadastrada no sistema de gestão de eventos. Usuários podem ter diferentes papéis (ex: administrador ou participante) que definem o que podem fazer dentro da aplicação. Eles podem criar eventos, se inscrever em eventos existentes e, em alguns casos, gerenciar inscrições.

Usuários são autenticados por meio de e-mail e senha, e possuem tokens JWT para garantir sessões seguras.

---

## Atributos

| Atributo    | Tipo      | Descrição |
|-------------|-----------|-----------|
| `id`        | `string`  | Identificador único do usuário (geralmente UUID). |
| `name`      | `string`  | Nome completo do usuário. |
| `email`     | `string`  | Endereço de e-mail único e obrigatório. |
| `password`  | `string`  | Hash da senha do usuário. Nunca armazenado em texto puro. |
| `role`      | `string`  | Papel do usuário no sistema: `admin` ou `participant`. |
| `createdAt` | `Date`    | Data de criação do registro. |
| `updatedAt` | `Date`    | Data da última modificação do usuário. |

---

## Regras de Negócio

1. **Email único**: O campo `email` deve ser único no sistema.
2. **Senha segura**: A senha deve conter no mínimo 8 caracteres e ser armazenada como hash seguro.
3. **Papel obrigatório**: Todo usuário deve possuir um papel (`role`) explícito para controle de acesso.
4. **Autenticação obrigatória**: A maioria das operações exige que o usuário esteja autenticado.
5. **Admin pode criar eventos**: Somente usuários com papel `admin` podem criar ou gerenciar eventos.

---

## Exemplo de Instância

```json
{
  "id": "user-456",
  "name": "Joana Silva",
  "email": "joana.silva@example.com",
  "password": "$2b$10$abc...",
  "role": "participant",
  "createdAt": "2025-06-20T12:00:00.000Z",
  "updatedAt": "2025-06-25T18:30:00.000Z"
}
