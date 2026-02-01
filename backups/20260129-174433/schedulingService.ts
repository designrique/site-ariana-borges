export interface ClientData {
    name: string;
    phone: string;
    email: string;
}

export interface AvailabilityResponse {
    message: string;
    available?: boolean;
}

export interface BookingResponse {
    message: string;
    success: boolean;
}

// N8N Webhook URL - Configure in .env
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://seu-n8n.com/webhook';

/**
 * Check availability for a preferred timeframe
 * Calls: POST /get_availability
 * Payload: { preferred_timeframe: "Monday next week at 3pm" }
 * Response: { message: "Great news, Monday next week at 3pm is available." }
 *           or { message: "Unfortunately that time is not available, however we have from 9:00 AM to 12:00 PM available." }
 */
export const checkAvailability = async (preferredTimeframe: string): Promise<AvailabilityResponse> => {
    try {
        const response = await fetch(`${N8N_WEBHOOK_URL}/get_availability`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                preferred_timeframe: preferredTimeframe
            }),
        });

        if (!response.ok) {
            throw new Error(`N8N webhook error: ${response.statusText}`);
        }

        const data = await response.json();

        // Parse the response to determine if available
        const message = data.message || '';
        const isAvailable = message.toLowerCase().includes('great news') ||
                           message.toLowerCase().includes('is available') ||
                           message.toLowerCase().includes('está disponível');

        return {
            message: data.message,
            available: isAvailable
        };

    } catch (error) {
        console.error("Erro ao verificar disponibilidade:", error);
        return {
            message: "Não foi possível verificar a disponibilidade. Por favor, tente novamente.",
            available: false
        };
    }
};

/**
 * Book an appointment
 * Calls: POST /book_appointment
 * Payload: {
 *   customer_name: "João Silva",
 *   customer_phone: "11999998888",
 *   customer_email: "joao@email.com",
 *   service_type: "Terapia Individual",
 *   description: "Sessão de terapia",
 *   preferred_timeframe: "Monday next week at 3pm"
 * }
 * Response: { message: "All set, you are booked for Monday next week at 3pm." }
 */
export const bookAppointment = async (
    clientData: ClientData,
    serviceType: string,
    description: string,
    preferredTimeframe: string
): Promise<BookingResponse> => {
    try {
        const response = await fetch(`${N8N_WEBHOOK_URL}/book_appointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_name: clientData.name,
                customer_phone: clientData.phone,
                customer_email: clientData.email,
                service_type: serviceType,
                description: description,
                preferred_timeframe: preferredTimeframe
            }),
        });

        if (!response.ok) {
            throw new Error(`N8N webhook error: ${response.statusText}`);
        }

        const data = await response.json();

        // Parse the response to determine if booking was successful
        const message = data.message || '';
        const isSuccess = message.toLowerCase().includes('all set') ||
                         message.toLowerCase().includes('booked') ||
                         message.toLowerCase().includes('confirmado') ||
                         message.toLowerCase().includes('agendado');

        return {
            message: data.message,
            success: isSuccess
        };

    } catch (error) {
        console.error("Erro ao realizar agendamento:", error);
        return {
            message: "Não foi possível completar o agendamento. Por favor, tente novamente.",
            success: false
        };
    }
};

/**
 * Validate Brazilian phone number
 */
export const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Format phone number for display
 */
export const formatPhone = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 11) {
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
    } else if (cleanPhone.length === 10) {
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
    }
    return phone;
};

/**
 * Service types available for booking
 */
export const SERVICE_TYPES = [
    { id: 'terapia-individual', name: 'Terapia Individual', description: 'Sessão de terapia personalizada' },
    { id: 'taro-salomao', name: 'Tarô de Salomão', description: 'Leitura oracular (45 min)' },
    { id: 'mesa-salomao', name: 'Mesa de Salomão', description: 'Cura vibracional (1h)' },
    { id: 'leitura-aura', name: 'Leitura de Aura', description: 'Método Essence (1h)' },
    { id: 'registros-akashicos', name: 'Registros Akáshicos', description: 'Leitura de registros (1h)' },
    { id: 'thetahealing', name: 'ThetaHealing®', description: 'Sessão de ThetaHealing (1h)' },
    { id: 'constelacao', name: 'Constelação Sistêmica', description: 'Sessão individual (1h30)' },
    { id: 'reiki', name: 'Reiki', description: 'Terapia energética (1h)' },
    { id: 'barras-access', name: 'Barras de Access®', description: 'Presencial (1h)' },
    { id: 'outro', name: 'Outro / Dúvida', description: 'Quero saber mais sobre os serviços' },
];
