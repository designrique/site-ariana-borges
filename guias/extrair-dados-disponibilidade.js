const preferredTimeframe = $input.item.json.body.preferred_timeframe;
const currentDate = new Date().toISOString();

// Criar um campo de texto combinado para a IA
const textForAI = `Horário solicitado: ${preferredTimeframe}. Data atual para referência: ${currentDate}`;

return {
    json: {
        preferredTimeframe,
        currentDate,
        textForAI
    }
};
