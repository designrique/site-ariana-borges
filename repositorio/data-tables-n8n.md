Você pode usar **Data Tables** como “banco de dados interno” para guardar os agendamentos e o estado de cada serviço, e depois rodar um fluxo periódico que verifica o que precisa ser executado.

Com base na documentação, o padrão geral seria:

1. **Criar a Data Table de agendamentos**  
   - Vá em **Data tables** → **Create Data table** e crie algo como `service_schedules`.  
   - Adicione colunas, por exemplo:  
     - `id` (string/number)  
     - `customer_id` (string/number)  
     - `service_type` (string)  
     - `scheduled_at` (date)  
     - `status` (string: `pending`, `done`, etc.) [[Data tables](https://docs.n8n.io/data/data-tables/#data-tables)]

2. **Fluxo 1 – Registrar/alterar agendamentos**  
   - Quando um serviço é agendado (via Webhook, formulário, etc.), use o **Data table node** com operação **Insert** ou **Upsert** para gravar/atualizar a linha na tabela `service_schedules`. [[Data table node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable/#data-table)]  
   - Esse fluxo só cuida de “escrever” na tabela.

3. **Fluxo 2 – Verificar e executar agendamentos (scheduler)**  
   - Use um **gatilho recorrente** (por exemplo, Cron) para rodar a cada X minutos.  
   - Em seguida, adicione um **Data table node** com operação **Get** para buscar linhas onde:
     - `status = "pending"`  
     - `scheduled_at <= now()` (dependendo de como você filtra datas). [[Data table node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable/#data-table)]  
   - Para cada item retornado, execute as ações do serviço (enviar e‑mail, chamar API, etc.).  
   - Ao final, use outro **Data table node** com operação **Update** para marcar `status = "done"` (ou outro estado).

4. **Por que usar Data Tables para agendamento**  
   - A própria equipe sugere usar uma tabela (DB ou planilha) para guardar tarefas com `scheduled_at` e depois ter um fluxo que roda periodicamente e verifica o que está pronto para executar, em vez de manter execuções “presas” por muito tempo. [[Scheduling workflow](https://community.n8n.io/t/99972)]  
   - Data Tables são justamente o armazenamento interno recomendado para persistir estado entre execuções, como marcadores de controle, sessões, etc. [[Release notes](https://docs.n8n.io/release-notes/1-x/#n8n11131); [Data tables](https://docs.n8n.io/data/data-tables/#data-tables)]

Se você detalhar qual tipo de serviço/agendamento (ex.: desprovisionamento de usuário, reservas, etc.), posso sugerir um esquema de colunas e filtros mais específico dentro desse mesmo padrão.