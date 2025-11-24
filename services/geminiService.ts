import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é uma assistente virtual acolhedora e inspiradora da equipe de Ariana Borges.
Seu objetivo é tirar dúvidas sobre a "Mesa de Salomão", uma jornada de transformação espiritual.
Use um tom de voz calmo, espiritualizado e motivacional.

Informações chaves para responder:
- A jornada total tem 33 dias.
- Ciclo 1: "Quebra de Maldição" (21 dias) - Limpeza de bloqueios, inicia 11 de dezembro.
- Ciclo 2: "Abre Caminho" (12 dias) - Ativação da prosperidade, inicia 01 de janeiro.
- Preço Individual: R$333,00 por ciclo.
- Preço Completo (Recomendado): R$555,00.
- Benefícios: Limpeza energética, gravações diárias, alinhamento espiritual.
- Autoridade: Ariana Borges é referência, similar a Elaine Ourives e Max Tovar.

Seja breve e sempre incentive a pessoa a se inscrever ("Liberte-se").
`;

export const sendMessageToGemini = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the chat history for the model
    // Note: The specific Chat API formatting might vary, but generateContent with history context works well for single-turn stateless or simple stateful simulations.
    // However, leveraging the chat capabilities is better.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "Desculpe, senti uma oscilação na energia. Poderia repetir?";
  } catch (error) {
    console.error("Erro ao conectar com o guia espiritual:", error);
    return "No momento, estamos em silêncio profundo. Tente novamente em instantes.";
  }
};