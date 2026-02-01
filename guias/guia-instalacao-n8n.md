# 🚀 Guia de Instalação - Workflow N8N de Agendamento

## 📋 Pré-requisitos

### 1. Credenciais Necessárias

#### OpenAI API
- Acesse: https://platform.openai.com/api-keys
- Crie uma API Key
- Modelo usado: `gpt-4o-mini` (econômico e eficiente)

#### Google Calendar OAuth2
- Acesse: https://console.cloud.google.com/
- Crie um projeto ou use existente
- Ative a API do Google Calendar
- Configure OAuth 2.0:
  - Tipo: Aplicativo Web
  - URIs de redirecionamento: `https://seu-n8n.com/rest/oauth2-credential/callback`
- Copie: **Client ID** e **Client Secret**

---

## 📥 Importação do Workflow

### Passo 1: Importar JSON
1. No n8n, clique em **Workflows** → **Import from File**
2. Selecione o arquivo: [n8n-workflow-agendamento-producao.json](file:///home/henrique/.gemini/antigravity/brain/187f0e76-11b5-4082-87e9-ae147ebc9b9f/n8n-workflow-agendamento-producao.json)
3. Clique em **Import**

### Passo 2: Configurar Credenciais

#### A) OpenAI API
1. Clique em qualquer nó **"IA - ..."**
2. Em **Credentials**, clique em **Create New**
3. Selecione: **OpenAI API**
4. Cole sua API Key
5. Salve como: `OpenAI API`

#### B) Google Calendar OAuth2
1. Clique no nó **"Google Calendar - Criar Evento"**
2. Em **Credentials**, clique em **Create New**
3. Selecione: **Google Calendar OAuth2 API**
4. Preencha:
   - **Client ID**: `seu-client-id`
   - **Client Secret**: `seu-client-secret`
5. Clique em **Connect my account**
6. Autentique com sua conta Google
7. Salve como: `Google Calendar OAuth2`

### Passo 3: Configurar Calendário
1. No nó **"Google Calendar - Criar Evento"**
2. Campo **Calendar**: 
   - Deixe como `primary` (calendário principal)
   - OU selecione um calendário específico da lista

---

## 🔧 Configuração do Frontend

### Atualizar .env
```bash
# No arquivo .env do projeto React
VITE_N8N_WEBHOOK_URL=https://seu-n8n.com/webhook
```

### Verificar Endpoints
- ✅ `https://seu-n8n.com/webhook/book_appointment`
- ✅ `https://seu-n8n.com/webhook/get_availability`

---

## ✅ Teste do Workflow

### 1. Ativar Workflow
- No n8n, clique em **Active** (toggle no canto superior direito)

### 2. Testar Verificação de Disponibilidade

**Endpoint:** `POST /webhook/get_availability`

**Payload de teste:**
```json
{
  "preferred_timeframe": "Terça-feira às 14h"
}
```

**Teste com cURL:**
```bash
curl -X POST https://seu-n8n.com/webhook/get_availability \
  -H "Content-Type: application/json" \
  -d '{"preferred_timeframe": "Terça-feira às 14h"}'
```

**Resposta esperada:**
```json
{
  "available": true,
  "message": "✨ Ótima notícia! O horário solicitado está disponível.\n\nOutros horários disponíveis:\n• Segunda-feira às 9h\n• Quarta-feira às 10h\n• Quinta-feira às 15h",
  "suggestedTimes": ["Segunda-feira às 9h", "Quarta-feira às 10h", "Quinta-feira às 15h"]
}
```

### 3. Testar Criação de Agendamento

**Endpoint:** `POST /webhook/book_appointment`

**Payload de teste:**
```json
{
  "customer_name": "Maria Silva",
  "customer_phone": "11987654321",
  "customer_email": "maria@example.com",
  "service_type": "Terapia Individual",
  "description": "Sessão de terapia personalizada",
  "preferred_timeframe": "Próxima terça às 14h"
}
```

**Teste com cURL:**
```bash
curl -X POST https://seu-n8n.com/webhook/book_appointment \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Maria Silva",
    "customer_phone": "11987654321",
    "customer_email": "maria@example.com",
    "service_type": "Terapia Individual",
    "description": "Sessão de terapia personalizada",
    "preferred_timeframe": "Próxima terça às 14h"
  }'
```

**Resposta esperada (sucesso):**
```json
{
  "success": true,
  "message": "Tudo certo! Você está agendado(a) para Terça-feira, 4 de fevereiro às 14h. 🎉",
  "booking": {
    "customer": "Maria Silva",
    "service": "Terapia Individual",
    "dateTime": "Terça-feira, 4 de fevereiro às 14h",
    "calendarEventId": "abc123xyz"
  }
}
```

**Resposta esperada (erro):**
```json
{
  "success": false,
  "message": "Não foi possível completar o agendamento. Por favor, tente novamente ou entre em contato via WhatsApp.",
  "error": "Detalhes do erro"
}
```

---

## 🔍 Verificação de Funcionamento

### Checklist
- [ ] Workflow aparece como **Active** no n8n
- [ ] Credenciais OpenAI configuradas e testadas
- [ ] Credenciais Google Calendar autenticadas
- [ ] Teste de disponibilidade retorna resposta válida
- [ ] Teste de booking cria evento no Google Calendar
- [ ] Email de confirmação é enviado ao cliente
- [ ] Frontend recebe resposta correta (200 ou 500)

---

## 🐛 Troubleshooting

### Erro: "OpenAI API authentication failed"
**Solução:**
1. Verifique se a API Key é válida
2. Confirme que tem créditos disponíveis na conta OpenAI
3. Teste a key em: https://platform.openai.com/playground

### Erro: "Google Calendar Bad Request (400)"
**Causa:** Datas em formato inválido

**Solução:**
1. Verifique logs do nó **"IA - Converter Texto para Data"**
2. Confirme que a IA retorna JSON válido
3. Teste manualmente o nó **"Processar Resposta da IA"**

**Debug:**
```javascript
// No nó "Processar Resposta da IA", adicione console.log:
console.log('AI Response:', aiResponse);
console.log('Parsed Date:', parsedDate);
console.log('Start DateTime:', parsedDate.startDateTime);
```

### Erro: "Unauthorized - Google Calendar"
**Solução:**
1. Reconecte credenciais OAuth2
2. Verifique permissões do calendário
3. Confirme que a API do Google Calendar está ativada no projeto

### IA não interpreta datas corretamente
**Solução 1 - Melhorar Prompt:**
```javascript
// Adicione exemplos no prompt do sistema:
"Exemplos:
- 'Segunda às 14h' → próxima segunda-feira às 14:00
- 'Amanhã de manhã' → amanhã às 09:00
- 'Semana que vem terça' → terça da próxima semana às 14:00"
```

**Solução 2 - Aumentar temperatura:**
- No nó OpenAI, ajuste `temperature` de `0.1` para `0.3`

### Frontend retorna erro 500
**Checklist:**
1. Verifique logs do workflow no n8n (Executions)
2. Confirme que webhook está ativo
3. Teste endpoint direto com cURL
4. Verifique CORS se necessário

---

## 📊 Monitoramento

### Logs no N8N
1. Acesse **Executions** no menu lateral
2. Filtre por: **Error** ou **Success**
3. Clique em uma execução para ver detalhes

### Métricas Importantes
- Taxa de sucesso: > 95%
- Tempo médio de resposta: < 3s
- Erros da API OpenAI: < 1%
- Erros do Google Calendar: < 1%

---

## 🔐 Segurança

### Boas Práticas
1. ✅ Use HTTPS no n8n (obrigatório)
2. ✅ Configure rate limiting no webhook
3. ✅ Valide inputs no frontend antes de enviar
4. ✅ Não exponha API keys no código
5. ✅ Use variáveis de ambiente para credenciais

### Rate Limiting (Opcional)
Adicione um nó **"Limit"** após os webhooks:
- Max executions: 10
- Time window: 1 minute
- Por IP address

---

## 🎨 Customizações

### Alterar Duração Padrão dos Eventos
**Arquivo:** Nó "IA - Converter Texto para Data"
```javascript
// Linha no prompt do sistema:
"3. Duração padrão: 1 hora"

// Altere para:
"3. Duração padrão: 1 hora e 30 minutos"
```

### Adicionar Mais Horários Sugeridos
**Arquivo:** Nó "IA - Verificar Disponibilidade"
```javascript
// No prompt:
"4. Sugerir horários alternativos se necessário"

// Adicione:
"4. Sempre sugira pelo menos 5 horários alternativos no mesmo dia ou próximos"
```

### Personalizar Mensagens
Edite os nós **"Responder Sucesso"** e **"Responder Disponibilidade"** para alterar as mensagens retornadas.

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique logs no n8n: **Executions** → última execução com erro
2. Teste endpoints com cURL para isolar o problema
3. Revise este guia para configurações faltantes
4. Consulte documentação oficial: https://docs.n8n.io

---

## ✨ Recursos do Workflow

### Inteligência Artificial
- ✅ Interpreta linguagem natural ("terça às 14h", "amanhã de manhã")
- ✅ Sugere horários alternativos
- ✅ Valida disponibilidade real no calendário

### Integração Google Calendar
- ✅ Cria eventos automaticamente
- ✅ Envia convites por email
- ✅ Verifica conflitos de horário
- ✅ Adiciona descrição completa do agendamento

### Tratamento de Erros
- ✅ Retorna mensagens amigáveis em caso de erro
- ✅ Fallback para horários padrão se IA falhar
- ✅ Logs detalhados para debug

---

**Última atualização:** 29/01/2026
**Versão do workflow:** production-v1
