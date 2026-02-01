const aiResponse = $input.first().json.output;
const preferredTimeframe = $input.all().find(item => item.json.preferredTimeframe)?.json.preferredTimeframe || '';
let availabilityCheck;

try {
    if (typeof aiResponse === 'object') {
        availabilityCheck = aiResponse;
    } else if (typeof aiResponse === 'string') {
        const cleanJson = aiResponse.replace(/```json\n?|```/g, '').trim();
        availabilityCheck = JSON.parse(cleanJson);
    } else {
        throw new Error('Formato de resposta inesperado');
    }
} catch (error) {
    availabilityCheck = {
        available: true,
        requestedDateTime: new Date().toISOString(),
        message: "Estamos verificando a disponibilidade.",
        suggestedTimes: []
    };
}

// Formatar o horário solicitado de forma legível
let requestedTimeFormatted = preferredTimeframe;
if (availabilityCheck.requestedDateTime) {
    try {
        const dt = new Date(availabilityCheck.requestedDateTime);
        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const day = daysOfWeek[dt.getDay()];
        const date = dt.getDate();
        const month = dt.getMonth() + 1;
        const hour = dt.getHours();
        requestedTimeFormatted = `${day}, ${date}/${month} às ${hour}h`;
    } catch (e) {
        // Manter o formato original se falhar
    }
}

// Converter suggestedTimes da IA de ISO para formato legível
if (availabilityCheck.suggestedTimes && availabilityCheck.suggestedTimes.length > 0) {
    const formatted = [];
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    for (const timeStr of availabilityCheck.suggestedTimes) {
        try {
            // Se já estiver em formato ISO
            if (timeStr.includes('T')) {
                const dt = new Date(timeStr);
                const dayName = daysOfWeek[dt.getDay()];
                const date = dt.getDate();
                const month = dt.getMonth() + 1;
                const hour = dt.getHours();
                formatted.push(`${dayName}, ${date}/${month} às ${hour}h`);
            } else {
                // Já está formatado, manter
                formatted.push(timeStr);
            }
        } catch (e) {
            formatted.push(timeStr);
        }
    }
    availabilityCheck.suggestedTimes = formatted;
}

// Gerar horários de fallback APENAS com dias válidos (Segunda, Terça, Quarta)
if (!availabilityCheck.suggestedTimes || availabilityCheck.suggestedTimes.length === 0) {
    const now = new Date();
    const validDays = [1, 2, 3]; // Segunda=1, Terça=2, Quarta=3
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

// Buscar eventos do calendário (pode estar vazio)
const calendarEvents = $input.all()
    .filter(item => item.json && item.json.id)
    .map(item => ({
        start: item.json.start?.dateTime,
        end: item.json.end?.dateTime,
        summary: item.json.summary
    }));

// Verificar conflitos apenas se houver eventos
const requestedDateTime = availabilityCheck.requestedDateTime;
let hasConflict = false;

if (calendarEvents.length > 0 && requestedDateTime) {
    hasConflict = calendarEvents.some(event => {
        if (!event.start) return false;
        return new Date(event.start).toISOString() === new Date(requestedDateTime).toISOString();
    });
}

// Usar a resposta da IA como base
let finalAvailable = availabilityCheck.available;
let finalMessage = availabilityCheck.message || '';

// Se a IA disse que está disponível MAS há conflito no calendário
if (finalAvailable && hasConflict) {
    finalAvailable = false;
    finalMessage = `😔 Infelizmente ${requestedTimeFormatted} já está ocupado.`;
}

// Se a IA disse que NÃO está disponível (fora do horário comercial)
if (!finalAvailable && !finalMessage.includes('ocupado')) {
    finalMessage = `❌ ${requestedTimeFormatted} está fora do horário comercial.\n\n📅 Atendemos de Segunda à Quarta, das 9h às 19h.`;
}

// Adicionar horários sugeridos
if (availabilityCheck.suggestedTimes?.length > 0) {
    finalMessage += `\n\n✨ Horários disponíveis:\n${availabilityCheck.suggestedTimes.map(t => `• ${t}`).join('\n')}`;
}

return {
    json: {
        available: finalAvailable,
        message: finalMessage,
        requestedDateTime: requestedDateTime,
        suggestedTimes: availabilityCheck.suggestedTimes || []
    }
};
