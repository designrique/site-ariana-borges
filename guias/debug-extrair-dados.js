const preferredTimeframe = $input.item.json.preferred_timeframe;
const currentDate = new Date().toISOString();

// DEBUG: Log completo do input
console.log('=== DEBUG WEBHOOK INPUT ===');
console.log('Full JSON:', JSON.stringify($input.item.json, null, 2));
console.log('preferred_timeframe value:', preferredTimeframe);
console.log('=========================');

return {
    json: {
        preferredTimeframe: preferredTimeframe || 'CAMPO_VAZIO',
        currentDate,
        debug_fullInput: $input.item.json
    }
};
