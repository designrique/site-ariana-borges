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

// Gerar horários de fallback APENAS com dias válidos (Segunda, Terça, Quarta)
if (!availabilityCheck.suggestedTimes || availabilityCheck.suggestedTimes.length === 0) {
    const now = new Date();
    const validDays = [1, 2, 3]; // Segunda=1, Terça=2, Quarta=3
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const suggestions = [];

    // Encontrar os próximos 3 dias úteis válidos
    let daysChecked = 0;
    let daysAdded = 0;

    while (daysAdded < 3 && daysChecked < 14) { // Limite de 14 dias para evitar loop infinito
        const checkDate = new Date(now);
        checkDate.setDate(checkDate.getDate() + daysChecked + 1);
        const dayOfWeek = checkDate.getDay();

        // Se for Segunda, Terça ou Quarta
        if (validDays.includes(dayOfWeek)) {
            const dayName = daysOfWeek[dayOfWeek];
            const date = checkDate.getDate();
            const month = checkDate.getMonth() + 1;
            const hour = daysAdded === 0 ? 9 : (daysAdded === 1 ? 14 : 10); // Varia os horários

            suggestions.push(`${dayName}, ${date}/${month} às ${hour}h`);
            daysAdded++;
        }

        daysChecked++;
    }

    availabilityCheck.suggestedTimes = suggestions;
}

const calendarEvents = $input.all().filter(item => item.json.id).map(item => ({
    start: item.json.start?.dateTime,
    end: item.json.end?.dateTime,
    summary: item.json.summary
}));

const requestedDateTime = availabilityCheck.requestedDateTime;
const hasConflict = calendarEvents.some(event => {
    if (!event.start || !requestedDateTime) return false;
    return new Date(event.start).toISOString() === new Date(requestedDateTime).toISOString();
});

let finalMessage;
if (hasConflict) {
    finalMessage = `😔 Infelizmente ${requestedTimeFormatted} já está ocupado.`;
    if (availabilityCheck.suggestedTimes?.length > 0) {
        finalMessage += `\n\nHorários disponíveis:\n${availabilityCheck.suggestedTimes.map(t => `• ${t}`).join('\n')}`;
    }
} else {
    finalMessage = `✅ ✨ Ótima notícia! ${requestedTimeFormatted} está disponível!`;
    if (availabilityCheck.suggestedTimes?.length > 0) {
        finalMessage += `\n\nOutros horários disponíveis:\n${availabilityCheck.suggestedTimes.map(t => `• ${t}`).join('\n')}`;
    }
}

return {
    json: {
        available: !hasConflict,
        message: finalMessage,
        requestedDateTime: requestedDateTime,
        suggestedTimes: availabilityCheck.suggestedTimes || []
    }
};
