// MOCK DO N8N ($input context)
const mockInput = {
    item: {
        json: {
            body: {
                customer_name: "Henrique Pimentel",
                customer_email: "hdgpimentel@gmail.com",
                customer_phone: "81995076463",
                service_type: "Agendamento Final",
                description: "Teste Local",
                preferred_timeframe: "04/02/2026 às 15h"
            },
            output: JSON.stringify({
                startDateTime: "2026-02-04T15:00:00-03:00",
                endDateTime: "2026-02-04T16:00:00-03:00",
                interpretedDate: "Quarta-feira, 4 de fevereiro de 2026 às 15h",
                customerName: "Henrique Pimentel",
                serviceType: "Agendamento Final",
                description: "Teste Local",
                customerPhone: "81995076463",
                customerEmail: "hdgpimentel@gmail.com"
            })
        }
    }
};

const $input = {
    item: mockInput.item
};

// --- CÓDIGO DO NÓ N8N ( COPIADO DO ARQUIVO JSON ) ---

try {
    const aiResponse = $input.item.json.output;

    // 1. Tenta pegar do input padrão (pode estar vazio se a AI limpou)
    let body = $input.item.json.body || $input.item.json || {};

    // 3. Parse da Data (IA)
    let parsedDate = {};
    try {
        if (typeof aiResponse === 'object') {
            parsedDate = aiResponse;
        } else if (typeof aiResponse === 'string') {
            const cleanJson = aiResponse.replace(/```json\n?|```/g, '').trim();
            parsedDate = JSON.parse(cleanJson);
        }
    } catch (e) {
        // Falha no parse date
    }

    // 4. Validação e Defaults
    const startDateTime = parsedDate.startDateTime || new Date().toISOString();

    // Correção: Se endDateTime falhar, calcula baseado no START, não no NOW
    let endDateTime = parsedDate.endDateTime;
    if (!endDateTime) {
        const startDateObj = new Date(startDateTime);
        startDateObj.setHours(startDateObj.getHours() + 1);
        endDateTime = startDateObj.toISOString();
    }

    // Se a IA retornar os dados extras, usa eles (prioridade)
    if (parsedDate.customerName) body.customerName = parsedDate.customerName;
    if (parsedDate.serviceType) body.serviceType = parsedDate.serviceType;
    if (parsedDate.description) body.description = parsedDate.description;
    if (parsedDate.customerPhone) body.customerPhone = parsedDate.customerPhone;
    if (parsedDate.customerEmail) body.customerEmail = parsedDate.customerEmail;

    const customerName = body.customerName || body.customer_name || 'Cliente (Dados Pendentes)';
    const serviceType = body.serviceType || body.service_type || 'Agendamento';
    const description = body.description || 'Sem descrição';
    const customerPhone = body.customerPhone || body.customer_phone || '';
    const customerEmail = body.customerEmail || body.customer_email || '';

    // 5. Retorno Seguro
    const result = {
        json: {
            customerName,
            customerPhone,
            customerEmail,
            serviceType,
            description,
            startDateTime,
            endDateTime,
            interpretedDate: parsedDate.interpretedDate || 'Data Processada',
            eventSummary: `${serviceType} - ${customerName}`,
            eventDescription: `📋 Agendamento\n\n👤 Cliente: ${customerName}\n📧 Email: ${customerEmail}\n📱 Telefone: ${customerPhone}\n\n🌟 Serviço: ${serviceType}\n📝 ${description}`
        }
    };

    console.log("=== RESULTADO ===");
    console.log(JSON.stringify(result, null, 2));

} catch (fatalError) {
    console.error("ERRO FATAL:", fatalError.message);
}
