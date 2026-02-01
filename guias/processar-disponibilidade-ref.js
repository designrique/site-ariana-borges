// Tentar pegar a resposta da IA diretamente do nó anterior (input) ou pelo nome do nó
let aiResponse;

try {
    // Tenta pelo nome do nó (mais seguro se houver nós intermediários)
    // Verifica se existe o método items (n8n v1) ou se acessa direto
    const aiNode = $('IA - Verificar Disponibilidade1');
    if (aiNode && aiNode.first()) {
        aiResponse = aiNode.first().json;
    }
} catch (e) {
    // Fallback: tenta do input direto
    try {
        aiResponse = $input.first().json;
    } catch (e2) {
        aiResponse = {};
    }
}

// Se a resposta estiver dentro de uma chave "output" (como sugerido pelos logs anteriores)
if (aiResponse && aiResponse.output) {
    aiResponse = aiResponse.output;
}

// DEBUG
console.log('=== DEBUG FIX REFERENCE ===');
console.log('Docs from IA Node:', JSON.stringify(aiResponse, null, 2));

let availabilityCheck;

try {
    if (typeof aiResponse === 'object') {
        availabilityCheck = aiResponse;
    } else if (typeof aiResponse === 'string') {
        const cleanJson = aiResponse.replace(/```json\n?|```/g, '').trim();
        availabilityCheck = JSON.parse(cleanJson);
    } else {
        // Se chegou aqui vazio, cria um erro para ir pro catch
        if (!aiResponse || Object.keys(aiResponse).length === 0) {
            throw new Error('Resposta da IA vazia ou não encontrada');
        }
        // Se for objeto mas não tiver os campos esperados, ainda tentamos usar
        availabilityCheck = aiResponse;
    }
} catch (error) {
    console.log('Erro ao processar IA:', error.message);
    availabilityCheck = {
        available: true,
        requestedDateTime: new Date().toISOString(),
        message: "Estamos verificando a disponibilidade.",
        suggestedTimes: []
    };
}

// --- Resto do código igual ---

// Converter suggestedTimes da IA de ISO para formato legível
if (availabilityCheck.suggestedTimes && availabilityCheck.suggestedTimes.length > 0) {
    const formatted = [];
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    for (const timeStr of availabilityCheck.suggestedTimes) {
        try {
            if (timeStr.includes('T')) {
                const dt = new Date(timeStr);
                const dayName = daysOfWeek[dt.getDay()];
                const date = dt.getDate();
                const month = dt.getMonth() + 1;
                const hour = dt.getHours();
                formatted.push(`${dayName}, ${date}/${month} às ${hour}h`);
            } else {
                formatted.push(timeStr);
            }
        } catch (e) {
            formatted.push(timeStr);
        }
    }
    availabilityCheck.suggestedTimes = formatted;
}

// Gerar horários de fallback
if (!availabilityCheck.suggestedTimes || availabilityCheck.suggestedTimes.length === 0) {
    const now = new Date();
    const validDays = [1, 2, 3];
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const suggestions = [];

    let daysChecked = 0;
    let daysAdded = 0;

    while (daysAdded < 3 && daysChecked < 14) {
        const checkDate = new Date(now);
        checkDate.setDate(checkDate.getDate() + daysChecked + 1);
        const dayOfWeek = checkDate.getDay();

        if (validDays.includes(dayOfWeek)) {
            const dayName = daysOfWeek[dayOfWeek];
            const date = checkDate.getDate();
            const month = checkDate.getMonth() + 1;
            const hour = daysAdded === 0 ? 9 : (daysAdded === 1 ? 14 : 10);

            suggestions.push(`${dayName}, ${date}/${month} às ${hour}h`);
            daysAdded++;
        }

        daysChecked++;
    }

    availabilityCheck.suggestedTimes = suggestions;
}

// Usar a validação da IA
let finalAvailable = availabilityCheck.available;
let finalMessage = availabilityCheck.message || '';

// Adicionar horários sugeridos
if (availabilityCheck.suggestedTimes?.length > 0) {
    finalMessage += `\n\n✨ Horários disponíveis:\n${availabilityCheck.suggestedTimes.map(t => `• ${t}`).join('\n')}`;
}

return {
    json: {
        available: finalAvailable,
        message: finalMessage,
        requestedDateTime: availabilityCheck.requestedDateTime,
        suggestedTimes: availabilityCheck.suggestedTimes || []
    }
};
