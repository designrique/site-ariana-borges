# Troubleshooting: SMTP Timeout no Railway

## 🔴 Problema Identificado

**Erro**: `Connection timeout` ao tentar enviar emails via Brevo SMTP do Railway

**Causa**: O Brevo (e muitos provedores SMTP) bloqueiam conexões de IPs de serviços de cloud/hosting compartilhado como Railway, Heroku, etc., para prevenir spam.

---

## ✅ Soluções Possíveis

### Solução 1: Usar API do Brevo (Recomendado)

Em vez de SMTP, usar a API REST do Brevo que não tem restrições de IP.

**Passos**:

1. **Instalar SDK do Brevo**:
   ```bash
   npm install @sendinblue/client
   ```

2. **Obter API Key**:
   - Acessar: https://app.brevo.com/settings/keys/api
   - Copiar a API key

3. **Modificar hook `afterChangeAppointment.ts`**:
   ```typescript
   import * as SibApiV3Sdk from '@sendinblue/client';
   
   const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
   apiInstance.setApiKey(
       SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
       process.env.BREVO_API_KEY
   );
   
   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
   sendSmtpEmail.sender = { email: 'contato@institutoarianaborges.com.br', name: 'Instituto Ariana Borges' };
   sendSmtpEmail.to = [{ email: 'institutoarianaborges@gmail.com' }];
   sendSmtpEmail.subject = `🎉 Novo Agendamento: ${serviceName}`;
   sendSmtpEmail.htmlContent = `...`; // HTML do email
   
   await apiInstance.sendTransacEmail(sendSmtpEmail);
   ```

4. **Adicionar variável no Railway**:
   ```bash
   railway variables set BREVO_API_KEY=xkeysib-...
   ```

---

### Solução 2: Usar SendGrid (Alternativa)

SendGrid tem tier gratuito (100 emails/dia) e funciona bem com Railway.

**Passos**:

1. **Criar conta**: https://sendgrid.com/
2. **Obter API Key**
3. **Instalar SDK**:
   ```bash
   npm install @sendgrid/mail
   ```
4. **Configurar**:
   ```typescript
   import sgMail from '@sendgrid/mail';
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   await sgMail.send({
       to: 'institutoarianaborges@gmail.com',
       from: 'contato@institutoarianaborges.com.br',
       subject: `🎉 Novo Agendamento: ${serviceName}`,
       html: `...`
   });
   ```

---

### Solução 3: Usar Resend (Moderna e Simples)

Resend é uma API moderna de emails, muito fácil de usar.

**Passos**:

1. **Criar conta**: https://resend.com/
2. **Tier gratuito**: 100 emails/dia
3. **Instalar**:
   ```bash
   npm install resend
   ```
4. **Usar**:
   ```typescript
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   await resend.emails.send({
       from: 'Instituto Ariana Borges <contato@institutoarianaborges.com.br>',
       to: 'institutoarianaborges@gmail.com',
       subject: `🎉 Novo Agendamento: ${serviceName}`,
       html: `...`
   });
   ```

---

### Solução 4: Proxy SMTP (Avançado)

Usar um serviço de proxy SMTP que aceita conexões do Railway.

**Opções**:
- **Mailgun**: SMTP relay funciona com Railway
- **Amazon SES**: SMTP via AWS (requer configuração)

---

## 🎯 Recomendação

**Use a Solução 1 (API do Brevo)** porque:
- ✅ Você já tem conta no Brevo
- ✅ Não precisa migrar para outro serviço
- ✅ API é mais confiável que SMTP
- ✅ Sem problemas de firewall/IP
- ✅ Melhor rastreamento de emails

---

## 📝 Próximos Passos

1. Escolher solução (recomendo Brevo API)
2. Modificar `afterChangeAppointment.ts`
3. Testar localmente
4. Deploy no Railway
5. Testar agendamento novamente

---

## 🧪 Teste Atual

**Status**: ✅ Agendamento criado com sucesso  
**Campo `clientEmail`**: ✅ Presente no banco de dados  
**Envio de emails**: ❌ Bloqueado por timeout SMTP  

**Logs**:
```
[12:29:41] ERROR (payload): Erro ao enviar email de notificação de agendamento: Error: Connection timeout
```

---

**Última atualização**: 05/02/2026 09:28
