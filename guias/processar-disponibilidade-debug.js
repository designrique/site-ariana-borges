const aiResponse = $input.first().json.output;
const preferredTimeframe = $input.all().find(item => item.json.preferredTimeframe)?.json.preferredTimeframe || '';
let availabilityCheck;

// DEBUG: Log what we receive
console.log('=== DEBUG PROCESSAR DISPONIBILIDADE ===');
console.log('aiResponse type:', typeof aiResponse);
console.log('aiResponse:', JSON.stringify(aiResponse, null, 2));

try {
    if (typeof aiResponse === 'object' && aiResponse !== null) {
        availabilityCheck = aiResponse;
    } else if (typeof aiResponse === 'string') {
        const cleanJson = aiResponse.replace(/```json\n?|```/g, '').trim();
        availabilityCheck = JSON.parse(cleanJson);
    } else {
        throw new Error('Formato de resposta inesperado');
    }

    console.log('availabilityCheck parsed:', JSON.stringify(availabilityCheck, null, 2));
} catch (error) {
    console.log('ERROR parsing AI response:', error.message);
    availabilityCheck = {
        available: true,
        requestedDateTime: new Date().toISOString(),
        message: "Estamos verificando a disponibilidade.",
        suggestedTimes: []
    };
}

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

console.log('=== FINAL OUTPUT ===');
console.log('available:', finalAvailable);
console.log('message:', finalMessage);

return {
    json: {
        available: finalAvailable,
        message: finalMessage,
        requestedDateTime: availabilityCheck.requestedDateTime,
        suggestedTimes: availabilityCheck.suggestedTimes || []
    }
};
