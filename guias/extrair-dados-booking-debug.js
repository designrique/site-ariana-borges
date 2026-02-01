// DEBUG: Log input data
console.log('=== DEBUG BOOKING EXTRACTION ===');
console.log('Input Item JSON:', JSON.stringify($input.item.json, null, 2));

const body = $input.item.json.body || {};
const query = $input.item.json.query || {};

const customerName = body.customer_name || query.customer_name || 'Cliente Teste';
const customerPhone = body.customer_phone || query.customer_phone || '0000000000';
const customerEmail = body.customer_email || query.customer_email || 'teste@teste.com';
const serviceType = body.service_type || query.service_type || 'Consulta';
const description = body.description || query.description || 'Sem descrição';
const preferredTimeframe = body.preferred_timeframe || query.preferred_timeframe || 'Sem horário';
const currentDate = new Date().toISOString();

// Criar um campo de texto combinado para a IA converter em data
const textForAI = `Horário solicitado: ${preferredTimeframe}. Data atual para referência: ${currentDate}`;

console.log('Extracted Data:', { customerName, preferredTimeframe, textForAI });

return {
    json: {
        customerName,
        customerPhone,
        customerEmail,
        serviceType,
        description,
        preferredTimeframe,
        currentDate,
        textForAI,
        debug_input: $input.item.json
    }
};
