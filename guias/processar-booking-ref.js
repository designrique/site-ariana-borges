// Tentar buscar resposta da IA, gerenciando diferentes estruturas possíveis
let aiResponse = {};

try {
    // 1. Tenta buscar direto do input (comum)
    if ($input.first().json.output) {
        aiResponse = $input.first().json.output;
    } else {
        aiResponse = $input.first().json;
    }
} catch (e) { /* ignore */ }

// 2. Se vazio, tenta buscar pelo NOME do nó anterior (caso tenha mudado)
if (!aiResponse || Object.keys(aiResponse).length === 0) {
    try {
        // Tenta buscar do nó "IA - Converter Texto para Data1" explicitamente
        const aiNode = $('IA - Converter Texto para Data1');
        if (aiNode && aiNode.first()) {
            aiResponse = aiNode.first().json;
            if (aiResponse.output) aiResponse = aiResponse.output;
        }
    } catch (e) { /* ignore */ }
}

// 3. Fallback final para dados do input mesmo
if (!aiResponse || Object.keys(aiResponse).length === 0) {
    aiResponse = $input.first().json || {};
}

// Parse se for string JSON
if (typeof aiResponse === 'string') {
    try {
        const cleanJson = aiResponse.replace(/```json\n?|```/g, '').trim();
        aiResponse = JSON.parse(cleanJson);
    } catch (e) {
        console.log('Erro parse booking:', e.message);
    }
}

// Extrair dados
const interpretedDate = aiResponse.interpretedDate || aiResponse.requestedDateTime || new Date().toISOString();
const customerName = aiResponse.customerName || aiResponse.customer_name || 'Cliente';
const serviceType = aiResponse.serviceType || aiResponse.service_type || 'Agendamento';
const description = aiResponse.description || '';

// Adicionar hora de fim (+1h padrão)
const startDate = new Date(interpretedDate);
const endDate = new Date(startDate);
endDate.setHours(endDate.getHours() + 1);

return {
    json: {
        customerName,
        serviceType,
        description,
        interpretedDate: startDate.toISOString(),
        startDateTime: startDate.toISOString(),
        endDateTime: endDate.toISOString(),

        // Passar adiante para o Google Calendar
        summary: `${serviceType} - ${customerName}`,
        location: "Online",
        description: `Agendamento automático via IA.\nCliente: ${customerName}\nServiço: ${serviceType}\nObs: ${description}`
    }
};
