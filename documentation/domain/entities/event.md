# Entidade: Evento

## Descrição Geral

A entidade **Evento** representa uma atividade ou ocasião organizada, como uma palestra, curso, workshop ou conferência, que pode ser criada por um usuário administrador do sistema. Um evento possui um limite máximo de participantes e pode conter informações como data, local, e descrição, além de permitir inscrições por parte dos usuários.

Essa entidade é central no domínio do sistema de gestão de eventos e está associada a funcionalidades como criação, listagem, inscrição de usuários e exportação de dados.

---

## Atributos

| Atributo         | Tipo        | Descrição |
|------------------|-------------|-----------|
| `id`             | `string`    | Identificador único do evento. Geralmente um UUID. |
| `title`          | `string`    | Título do evento. Deve ser descritivo e curto. |
| `description`    | `string`    | Texto explicando o conteúdo ou objetivo do evento. |
| `date`           | `Date`      | Data e hora em que o evento irá ocorrer. |
| `location`       | `string`    | Local físico (ou link, se online) onde o evento ocorrerá. |
| `maxParticipants`| `number`    | Número máximo de participantes permitidos. |
| `creatorId`      | `string`    | ID do usuário que criou o evento. |
| `bannerUrl`      | `string?`   | URL da imagem de banner do evento (opcional). |
| `createdAt`      | `Date`      | Data de criação do evento. Gerada automaticamente. |
| `updatedAt`      | `Date`      | Última data de modificação do evento. |

---

## Regras de Negócio

1. **Data futura**: O campo `date` deve conter uma data futura em relação ao momento da criação.
2. **Título válido**: O título deve conter no mínimo 3 caracteres e no máximo 100.
3. **Limite de participantes**: `maxParticipants` deve ser maior que zero.
4. **Local obrigatório**: Um evento deve conter uma descrição de localização.
5. **Usuário criador**: Todo evento precisa estar associado a um usuário criador com permissão válida.

---

## Exemplo de Instância

```json
{
  "id": "a7c2ef7d-b6cb-4a3c-a3e9-f1f17a3b6824",
  "title": "Workshop de TypeScript",
  "description": "Aprenda os fundamentos do TypeScript em aplicações modernas.",
  "date": "2025-07-15T14:00:00.000Z",
  "location": "Auditório Central, Campus A",
  "maxParticipants": 100,
  "creatorId": "user-123",
  "bannerUrl": "https://cdn.site.com/banners/ts-workshop.png",
  "createdAt": "2025-06-28T10:00:00.000Z",
  "updatedAt": "2025-06-28T10:00:00.000Z"
}
