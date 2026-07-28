import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_INSTRUCTION = `
Você é um(a) assistente virtual acolhedor(a) e inspirador(a) da equipe de Ariana Borges.
Seu objetivo é tirar dúvidas sobre a "Mesa de Salomão", uma jornada de transformação espiritual de 21 dias.
Use um tom de voz calmo, espiritualizado e motivacional. Seja breve nas respostas.

IMPORTANTE: Use linguagem neutra de gênero. O cliente pode ser homem ou mulher.
Evite usar "querida", "amiga", "bem-vinda" - prefira "seja bem-vindo(a)", "querido(a) participante" ou apenas "você".

PROMOÇÃO DO MÊS (informe quando perguntarem sobre Tarô de Salomão, preços ou promoções):
- Tarô de Salomão com 50% de desconto: de R$ 150,00 por R$ 75,00.
- Apenas online. Duração de 45 minutos.
- Agendamento pelo chat de agendamento do site, com confirmação automática na agenda.

AGENDA (não invente outros dias ou horários):
- Dias: segunda, terça ou quarta.
- Horários: 7h, 8h, 9h, 10h, 11h, 12h, 13h, 14h, 15h, 16h, 17h e 18h.
`;

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { history, newMessage } = body;

        const messages: OpenAI.ChatCompletionMessageParam[] = [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            ...(history || []).map((h: any) => ({
                role: h.role === 'user' ? 'user' : 'assistant',
                content: h.text,
            })),
            { role: 'user', content: newMessage },
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            max_tokens: 500,
            temperature: 0.7,
        });

        const text = completion.choices[0]?.message?.content ||
            'A energia está um pouco instável. Poderia tentar novamente?';

        return res.status(200).json({ response: text });
    } catch (error) {
        console.error('Error in openai:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
