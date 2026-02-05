const https = require('https');

console.log('🧪 Testando conexão com Brevo API...');

const options = {
    hostname: 'api.brevo.com',
    port: 443,
    path: '/v3/account',
    method: 'GET',
    headers: {
        'api-key': process.env.BREVO_API_KEY || '',
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10s
};

const req = https.request(options, (res) => {
    console.log(`✅ Status Code: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('📄 Resposta:', data.substring(0, 200) + '...');
    });
});

req.on('error', (e) => {
    console.error(`❌ Erro de conexão: ${e.message}`);
});

req.on('timeout', () => {
    req.destroy();
    console.error('❌ Timeout de conexão (10s)');
});

req.end();
