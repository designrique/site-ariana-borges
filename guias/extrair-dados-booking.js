const customerName = $input.item.json.body.customer_name;
const customerPhone = $input.item.json.body.customer_phone;
const customerEmail = $input.item.json.body.customer_email;
const serviceType = $input.item.json.body.service_type;
const description = $input.item.json.body.description;
const preferredTimeframe = $input.item.json.body.preferred_timeframe;
const currentDate = new Date().toISOString();

// Criar um campo de texto combinado para a IA converter em data
const textForAI = `Horário solicitado: ${preferredTimeframe}. Data atual para referência: ${currentDate}`;

return {
    json: {
        customerName,
        customerPhone,
        customerEmail,
        serviceType,
        description,
        preferredTimeframe,
        currentDate,
        textForAI
    }
};
