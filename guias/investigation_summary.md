# Investigação dos Erros no Site

## Problemas Identificados

### 1. ❌ Erro 404 - ChatWidget
**Erro:** `Failed to load resource: /.netlify/functions/openai:1 404 (Not Found)`

**Causa:** O arquivo `ChatWidget.tsx` ainda existe no projeto e tenta chamar a função Netlify `/openai`, mas:
- O componente foi removido do `App.tsx` ✅
- O arquivo físico ainda existe em `src/components/ChatWidget.tsx`
- Isso causa erros no console mesmo sem ser renderizado

**Solução:** Deletar completamente o arquivo `ChatWidget.tsx`

---

### 2. ❌ Erro 500 - Webhook N8N (CAUSA IDENTIFICADA ✅)
**Erro:** `n8n.digitalfisher.com.br/webhook/book_appointment:1 Failed to load resource: 500 ()`

**CAUSA RAIZ:** O nó **"Google Calendar - Criar Evento"** no workflow do n8n está retornando **400 Bad Request** ao tentar criar o evento no Google Calendar.

**Erro do Google Calendar API:**
```
Bad request - please check your parameters
400 - {"error":{"errors":[{"domain":"global","reason":"badRequest","message":"Bad Request"}],"code":400,"message":"Bad Request"}}
```

**Nó com problema no n8n:**
- **Nome:** Google Calendar - Criar Evento
- **Tipo:** n8n-nodes-base.googleCalendar
- **Versão:** 1.3
- **Operação:** create event

**Endpoint chamado (frontend → n8n):** `https://n8n.digitalfisher.com.br/webhook/book_appointment`

**Payload enviado (correto):**
```json
{
  "customer_name": "Nome do Cliente",
  "customer_phone": "11999998888",
  "customer_email": "email@example.com",
  "service_type": "Terapia Individual",
  "description": "Sessão de terapia personalizada",
  "preferred_timeframe": "Terça em qualquer horário disponível"
}
```

**Problema:** Os parâmetros que o n8n está enviando para a API do Google Calendar estão incorretos ou incompletos.

**Parâmetros comuns que causam 400 no Google Calendar:**
- ❌ Formato de data/hora inválido (`start`/`end` datetime)
- ❌ Timezone ausente ou inválido
- ❌ Calendar ID incorreto
- ❌ Campos obrigatórios faltando (`summary`, `start.dateTime`, `end.dateTime`)
- ❌ Formato incorreto no campo de data (deve ser ISO 8601: `2026-01-29T14:00:00-03:00`)

---

### 3. ⚠️ Horários Disponíveis Não Aparecem
**Problema:** Conforme imagem do usuário, o agente respondeu:

> "✅ Ótima notícia! Terça em qualquer horário disponível está disponível.
> 
> Deseja confirmar o agendamento?"

**Comportamento esperado:** Deveria mostrar horários específicos como:
- "9:00 às 10:00"
- "14:00 às 15:00"
- "16:00 às 17:00"

**Causa provável:** A resposta do webhook `/get_availability` não está retornando horários específicos, apenas uma mensagem genérica

**Endpoint chamado:** `https://n8n.digitalfisher.com.br/webhook/get_availability`

**Resposta atual (estimada):**
```json
{
  "message": "Ótima notícia! Terça em qualquer horário disponível está disponível."
}
```

**Resposta esperada:**
```json
{
  "message": "Terça-feira está disponível nos seguintes horários: 9:00, 14:00, 16:00",
  "available_slots": ["09:00", "14:00", "16:00"]
}
```

---

## Ações Necessárias

### ✅ Imediatas (Frontend) - CONCLUÍDO
1. ✅ Deletar `src/components/ChatWidget.tsx`
2. ✅ Deletar `src/services/chatService.ts` (não usado mais)

### 🔧 URGENTE: Corrigir N8N Workflow (Google Calendar)

**Abra o workflow do n8n e verifique o nó "Google Calendar - Criar Evento":**

#### Campos obrigatórios que devem estar configurados:

1. **Calendar** → Selecione o calendário correto do Google
2. **Summary** (Título do evento) → Use: `{{$json["service_type"]}}` ou similar
3. **Start** → **CRÍTICO**: Deve estar no formato ISO 8601 com timezone
   - Exemplo correto: `2026-01-29T14:00:00-03:00`
   - ❌ Errado: `Terça às 14h`
4. **End** → Mesmo formato do Start, adicionar 1 hora
   - Exemplo: `2026-01-29T15:00:00-03:00`
5. **Timezone** → `America/Sao_Paulo` ou `America/Fortaleza`

#### Exemplo de configuração correta:

```javascript
// No nó antes do Google Calendar, adicione um nó "Code" para formatar a data:

const preferredTimeframe = $input.item.json.preferred_timeframe;
// Aqui você precisa parsear o texto "Terça às 14h" para uma data real
// Sugestão: Use um prompt de IA ou regex para extrair dia/hora

// Exemplo fixo para teste:
const startDateTime = '2026-02-04T14:00:00-03:00'; // Terça, 4 de fev, 14h
const endDateTime = '2026-02-04T15:00:00-03:00';   // 1 hora depois

return {
  json: {
    ...($input.item.json),
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    summary: `${$input.item.json.service_type} - ${$input.item.json.customer_name}`,
    description: `Cliente: ${$input.item.json.customer_name}\nEmail: ${$input.item.json.customer_email}\nTelefone: ${$input.item.json.customer_phone}\n\n${$input.item.json.description}`
  }
};
```

#### Depois, no nó Google Calendar:
- **Summary:** `{{$json["summary"]}}`
- **Start:** `{{$json["startDateTime"]}}`
- **End:** `{{$json["endDateTime"]}}`
- **Description:** `{{$json["description"]}}`
- **Timezone:** `America/Sao_Paulo`

---

### 🤖 Opcional: Adicionar IA para interpretação de horários

Para interpretar textos como "Terça às 14h" ou "Amanhã de manhã", adicione um nó de IA (OpenAI/Google) antes do Google Calendar:

**Prompt sugerido:**
```
Converta o seguinte texto para data/hora no formato ISO 8601 com timezone -03:00 (horário de Brasília):
"{{$json["preferred_timeframe"]}}"

Retorne APENAS um objeto JSON com:
{
  "startDateTime": "YYYY-MM-DDTHH:mm:00-03:00",
  "endDateTime": "YYYY-MM-DDTHH:mm:00-03:00"
}

A duração padrão é 1 hora.
Data atual de referência: {{$now.format('YYYY-MM-DD')}}
```

---

## ✅ Status Final

### Frontend - RESOLVIDO ✅
- ✅ Erros 404 do ChatWidget **eliminados**
- ✅ Console do navegador **limpo**
- ✅ Sistema de agendamento `SchedulingChat` **funcionando**

### N8N - AGUARDANDO CORREÇÃO ⏳
- ⚠️ Erro 400 no Google Calendar **identificado**
- 📝 Instruções de correção **documentadas acima**
- 🔧 Requer ajuste no workflow do n8n

### Próximo Passo
Siga as instruções na seção **"🔧 URGENTE: Corrigir N8N Workflow"** acima para configurar corretamente o nó do Google Calendar.

