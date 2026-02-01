import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Calendar, CheckCircle, User, Phone, Mail, ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { useScheduling } from './SchedulingContext';
import {
    checkAvailability,
    bookAppointment,
    validatePhone,
    validateEmail,
    formatPhone,
    SERVICE_TYPES
} from '../services/schedulingService';
import { createCheckoutLink } from '../services/infinityPayService';

type Step = 'name' | 'phone' | 'email' | 'service' | 'service_variant' | 'payment' | 'timeframe' | 'checking' | 'confirming' | 'success' | 'error' | 'recovery';

interface Message {
    id: string;
    role: 'assistant' | 'user';
    content: string;
}

const SchedulingChat: React.FC = () => {
    const { isOpen, closeScheduling, initialState } = useScheduling();
    // ... preexisting code ...

    // Clear storage on close or success?
    // Maybe better to only clear on explicit success or reset.
    // If user just closes the modal, we want to keep state? 
    // Yes, user request implies keeping state if "accidentally closed".

    // We'll clear on Unmount ONLY if success? No, React state handles unmount.
    // We add a clear method for success.

    const clearSavedState = () => {
        localStorage.removeItem('scheduling_chat_state');
    };
    const [step, setStep] = useState<Step>('name');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [clientData, setClientData] = useState({ name: '', phone: '', email: '' });
    const [selectedService, setSelectedService] = useState<typeof SERVICE_TYPES[0] | null>(null);
    const [preferredTimeframe, setPreferredTimeframe] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lastAvailabilityMessage, setLastAvailabilityMessage] = useState('');
    const [paymentOrderNsu, setPaymentOrderNsu] = useState<string | undefined>(undefined);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Save state to localStorage whenever it changes
        // CRITICAL: Do not save if we are in the initial empty state, to avoid overwriting saved data on mount.
        if (isOpen && step !== 'success' && step !== 'recovery') {
            const isInitialState = step === 'name' && clientData.name === '' && messages.length <= 1;
            if (isInitialState) return;

            const stateToSave = {
                step,
                messages,
                clientData,
                selectedService,
                preferredTimeframe,
                timestamp: Date.now()
            };
            localStorage.setItem('scheduling_chat_state', JSON.stringify(stateToSave));
        }
    }, [isOpen, step, messages, clientData, selectedService, preferredTimeframe]);

    useEffect(() => {
        if (isOpen) {
            // Check if we are returning from payment
            if (initialState?.skipTo === 'timeframe' && initialState?.paymentData?.status === 'paid') {
                const storedData = localStorage.getItem('scheduling_client_data');
                const parsedData = storedData ? JSON.parse(storedData) : { name: '', phone: '', email: '' };

                setClientData(parsedData);
                setStep('timeframe');
                setPaymentOrderNsu(initialState.paymentData.orderNsu);

                setMessages([{
                    id: 'welcome_back',
                    role: 'assistant',
                    content: `Pagamento confirmado! 🎉\n\nOlá de volta, ${parsedData.name.split(' ')[0]}.\n\nAgora que está tudo certo, quando você gostaria de agendar seu atendimento?`
                }]);

                // Try to restore selected service if possible, or default to a generic one/null?
                // Ideally we should have stored selectedService too.
                const storedService = localStorage.getItem('scheduling_selected_service');
                if (storedService) {
                    setSelectedService(JSON.parse(storedService));
                }

                setPreferredTimeframe('');
                setInput('');
                setLastAvailabilityMessage('');
            } else {
                // Check for saved state in localStorage
                const savedState = localStorage.getItem('scheduling_chat_state');
                if (savedState) {
                    const parsedState = JSON.parse(savedState);
                    // Check if state is recent (e.g., less than 24 hours)
                    if (Date.now() - parsedState.timestamp < 24 * 60 * 60 * 1000) {
                        // Found valid saved state - Trigger Recovery Flow
                        setClientData(parsedState.clientData);
                        setSelectedService(parsedState.selectedService);
                        setPreferredTimeframe(parsedState.preferredTimeframe);
                        setPaymentOrderNsu(undefined);

                        // Set temporary recovery state
                        setStep('recovery');
                        const firstName = parsedState.clientData.name.split(' ')[0] || 'Visitante';
                        const serviceName = parsedState.selectedService?.name || 'seu atendimento';
                        const priceText = parsedState.selectedService?.price
                            ? `R$ ${(parsedState.selectedService.price / 100).toFixed(2).replace('.', ',')}`
                            : '';

                        setMessages([{
                            id: 'recovery_msg',
                            role: 'assistant',
                            content: `Olá, ${firstName}! 👋 Bem-vindo(a) de volta.\n\nNotei que você não finalizou o agendamento de **${serviceName}** ${priceText ? `(${priceText})` : ''}.\n\nDeseja retomar de onde parou?`
                        }]);
                        return;
                    }
                }

                // Normal flow / Reset if no valid saved state
                setStep('name');
                setMessages([{
                    id: 'welcome',
                    role: 'assistant',
                    content: 'Olá, ser de luz! ✨\n\nQue alegria recebê-lo(a) aqui no Instituto Ariana Borges.\n\nPara agendar seu atendimento, preciso de algumas informações.\n\nQual é o seu nome completo?'
                }]);
                setClientData({ name: '', phone: '', email: '' });
                setSelectedService(null);
                setPreferredTimeframe('');
                setInput('');
                setLastAvailabilityMessage('');
                setPaymentOrderNsu(undefined);
            }
        }
    }, [isOpen, initialState]);

    useEffect(() => {
        scrollToBottom();
        if (inputRef.current && isOpen && ['name', 'phone', 'email', 'timeframe'].includes(step)) {
            inputRef.current.focus();
        }
    }, [messages, isOpen, step]);

    // Helper to resume specific state from storage
    const handleResumeState = () => {
        const savedState = localStorage.getItem('scheduling_chat_state');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setStep(parsedState.step);
            setMessages(parsedState.messages);
            // Append a resumption message?
            setMessages(prev => [...parsedState.messages, {
                id: 'resumed',
                role: 'assistant',
                content: 'Ok! Vamos continuar. 👇'
            }]);
        }
    };

    const handleResetState = () => {
        localStorage.removeItem('scheduling_chat_state');
        setStep('name');
        setClientData({ name: '', phone: '', email: '' });
        setSelectedService(null);
        setPreferredTimeframe('');
        setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: 'Tudo bem! Vamos começar do zero. ✨\n\nQual é o seu nome completo?'
        }]);
    };

    const addMessage = (role: 'assistant' | 'user', content: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            role,
            content
        }]);
    };

    const handleNameSubmit = () => {
        if (!input.trim()) return;

        const name = input.trim();
        addMessage('user', name);
        setClientData(prev => ({ ...prev, name }));
        setInput('');

        setTimeout(() => {
            addMessage('assistant', `Prazer em conhecê-lo(a), ${name.split(' ')[0]}! 🙏\n\nAgora, por favor, informe seu número de telefone com DDD:\n\n(Exemplo: 11999998888)`);
            setStep('phone');
        }, 500);
    };

    const handlePhoneSubmit = () => {
        if (!input.trim()) return;

        const phone = input.trim();

        if (!validatePhone(phone)) {
            addMessage('user', phone);
            setTimeout(() => {
                addMessage('assistant', 'O número informado não parece válido. 📱\n\nPor favor, digite seu telefone com DDD (exemplo: 11999998888):');
            }, 300);
            setInput('');
            return;
        }

        addMessage('user', formatPhone(phone));
        setClientData(prev => ({ ...prev, phone }));
        setInput('');

        setTimeout(() => {
            addMessage('assistant', 'Perfeito! 📧\n\nPor último, qual é o seu e-mail?');
            setStep('email');
        }, 500);
    };

    const handleEmailSubmit = () => {
        if (!input.trim()) return;

        const email = input.trim().toLowerCase();

        if (!validateEmail(email)) {
            addMessage('user', email);
            setTimeout(() => {
                addMessage('assistant', 'Este e-mail não parece válido. ✉️\n\nPor favor, verifique e digite novamente:');
            }, 300);
            setInput('');
            return;
        }

        addMessage('user', email);
        setClientData(prev => ({ ...prev, email }));
        setInput('');

        setTimeout(() => {
            addMessage('assistant', `Maravilha, ${clientData.name.split(' ')[0]}! 🌟\n\nAgora, selecione o tipo de atendimento que deseja agendar:`);
            setStep('service');
        }, 500);
    };

    const handleServiceSelect = async (service: typeof SERVICE_TYPES[0] | any) => {
        // If service has variants and we haven't selected one yet (checked by seeing if it's the main service object)
        if ('variants' in service && service.variants && service.variants.length > 0) {
            setSelectedService(service);
            addMessage('user', service.name);
            setTimeout(() => {
                addMessage('assistant', `Excelente! Para a ${service.name}, temos algumas opções especiais. Qual você prefere?`);
                setStep('service_variant');
            }, 500);
            return;
        }

        setSelectedService(service);
        addMessage('user', service.name);

        // Se for "Outro/Dúvida" ou preço for 0, pula pagamento
        if (service.price === 0) {
            setTimeout(() => {
                addMessage('assistant', `Sem problemas! Vamos conversar melhor. 💜\n\nQuando você gostaria de agendar?\n\n(Escreva de forma natural, ex: "Amanhã à tarde")`);
                setStep('timeframe');
            }, 500);
            return;
        }

        // Inicia fluxo de pagamento
        setStep('payment');
        setIsLoading(true);
        setTimeout(() => {
            addMessage('assistant', `Ótima escolha! ✨\n\nO valor deste atendimento é R$ ${(service.price / 100).toFixed(2).replace('.', ',')}.\n\nEstou gerando seu link de pagamento seguro... 🔒`);
        }, 300);

        try {
            const checkoutData = await createCheckoutLink({
                handle: 'institutoarianaborges',
                items: [{
                    quantity: 1,
                    price: service.price,
                    description: service.name
                }],
                customer: {
                    name: clientData.name,
                    email: clientData.email,
                    phone_number: clientData.phone
                },
                redirectUrl: `${window.location.origin}/payment-return`,
                webhookUrl: 'https://webhook.digitalfisher.com.br/webhook/infinitypay_webhook'
            });

            // Persist data for return
            localStorage.setItem('scheduling_client_data', JSON.stringify(clientData));
            localStorage.setItem('scheduling_selected_service', JSON.stringify(service));

            setTimeout(() => {
                addMessage('assistant', 'Prontinho! Clique no botão abaixo para realizar o pagamento. Vou te esperar aqui! 😉');
                setIsLoading(false);
            }, 500);

            // Store the payment URL in a state if needed, or just let the button handle it.
            // For now, we rely on the button we will add in the render part.
            // Using a hack to store the url in the message (not ideal) or state. 
            // Better: Add a state for `paymentUrl`.
            setLastAvailabilityMessage(checkoutData.url); // Reusing this state to store URL temporarily to avoid new state 

        } catch (error) {
            setIsLoading(false);
            addMessage('assistant', 'Ops! Tive um probleminha para gerar o pagamento. Tente novamente ou escolha "Outro" para falarmos direto.');
            setStep('service');
        }
    };

    const handleTimeframeSubmit = async () => {
        if (!input.trim()) return;

        const timeframe = input.trim();
        setPreferredTimeframe(timeframe);
        addMessage('user', timeframe);
        setInput('');
        setStep('checking');

        setTimeout(() => {
            addMessage('assistant', '🔍 Verificando disponibilidade na agenda...');
        }, 300);

        setIsLoading(true);

        try {
            const response = await checkAvailability(timeframe);
            setIsLoading(false);
            setLastAvailabilityMessage(response.message);

            if (response.available) {
                // Time is available - proceed to booking
                setTimeout(() => {
                    addMessage('assistant', `✅ ${response.message}\n\nDeseja confirmar o agendamento?`);
                    setStep('confirming');
                }, 500);
            } else {
                // Time not available - show alternatives
                setTimeout(() => {
                    addMessage('assistant', `😔 ${response.message}\n\nPor favor, escolha outro horário:`);
                    setStep('timeframe');
                }, 500);
            }
        } catch (error) {
            setIsLoading(false);
            addMessage('assistant', '❌ Ocorreu um erro ao verificar a disponibilidade. Por favor, tente novamente.');
            setStep('timeframe');
        }
    };

    const handleConfirmBooking = async () => {
        if (!selectedService) return;

        addMessage('user', 'Sim, confirmar agendamento');
        setIsLoading(true);

        setTimeout(() => {
            addMessage('assistant', '📅 Finalizando seu agendamento...');
        }, 300);

        try {
            const response = await bookAppointment(
                clientData,
                selectedService.name,
                selectedService.description,
                preferredTimeframe,
                paymentOrderNsu
            );
            setIsLoading(false);

            if (response.success) {
                setTimeout(() => {
                    addMessage('assistant', `🎉 ${response.message}\n\n📋 Resumo do seu agendamento:\n\n👤 ${clientData.name}\n📧 ${clientData.email}\n📱 ${formatPhone(clientData.phone)}\n🌟 ${selectedService.name}\n📅 ${preferredTimeframe}\n\nVocê receberá um e-mail de confirmação em breve.\n\nNos vemos em breve, ser de luz! ✨`);
                    setStep('success');
                    clearSavedState(); // Clear state on success
                }, 500);
            } else {
                setTimeout(() => {
                    addMessage('assistant', `😔 ${response.message}\n\nPor favor, tente selecionar outro horário:`);
                    setStep('timeframe');
                }, 500);
            }
        } catch (error) {
            setIsLoading(false);
            addMessage('assistant', '❌ Ocorreu um erro ao confirmar o agendamento. Por favor, tente novamente.');
            setStep('timeframe');
        }
    };

    const handleCancelBooking = () => {
        addMessage('user', 'Escolher outro horário');
        setTimeout(() => {
            addMessage('assistant', 'Sem problemas! 🙏\n\nDigite outro horário de sua preferência:');
            setStep('timeframe');
        }, 300);
    };

    const handleSubmit = () => {
        if (isLoading || !input.trim()) return;

        switch (step) {
            case 'name':
                handleNameSubmit();
                break;
            case 'phone':
                handlePhoneSubmit();
                break;
            case 'email':
                handleEmailSubmit();
                break;
            case 'timeframe':
                handleTimeframeSubmit();
                break;
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const getInputPlaceholder = () => {
        switch (step) {
            case 'name': return 'Digite seu nome completo...';
            case 'phone': return 'Digite seu telefone com DDD...';
            case 'email': return 'Digite seu e-mail...';
            case 'timeframe': return 'Ex: Segunda às 14h, Amanhã de manhã...';
            default: return '';
        }
    };

    const getInputIcon = () => {
        switch (step) {
            case 'name': return <User size={16} className="text-gray-400" />;
            case 'phone': return <Phone size={16} className="text-gray-400" />;
            case 'email': return <Mail size={16} className="text-gray-400" />;
            case 'timeframe': return <Clock size={16} className="text-gray-400" />;
            default: return null;
        }
    };

    const canShowInput = ['name', 'phone', 'email', 'timeframe'].includes(step);
    const currentStep = ['name', 'phone', 'email', 'service', 'timeframe', 'success'].indexOf(step) + 1;
    const totalSteps = 5;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-lilac to-brand-lilac/80 p-4 flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <Calendar size={20} className="text-brand-dark" />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-brand-dark">Agendar Atendimento</h3>
                            <p className="text-xs text-brand-dark/70">Instituto Ariana Borges</p>
                        </div>
                    </div>
                    <button
                        onClick={closeScheduling}
                        className="text-brand-dark/70 hover:text-brand-dark transition-colors p-1"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Indicator */}
                <div className="px-4 py-3 bg-brand-beige border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-sans">Passo {Math.min(currentStep, totalSteps)} de {totalSteps}</span>
                        <span className="text-xs text-brand-lilacDark font-sans font-medium">
                            {step === 'name' && 'Identificação'}
                            {step === 'phone' && 'Telefone'}
                            {step === 'email' && 'E-mail'}
                            {step === 'service' && 'Serviço'}
                            {(step === 'timeframe' || step === 'checking' || step === 'confirming') && 'Agendamento'}
                            {step === 'success' && 'Confirmado!'}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                            className="bg-brand-gold h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${(Math.min(currentStep, totalSteps) / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-brand-beige/50 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] p-3 rounded-2xl font-sans text-sm leading-relaxed whitespace-pre-line ${msg.role === 'user'
                                    ? 'bg-brand-gold text-white rounded-br-sm'
                                    : 'bg-white text-gray-700 shadow-sm rounded-bl-sm border border-gray-100'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Service Selection */}
                    {step === 'service' && (
                        <div className="space-y-2">
                            {SERVICE_TYPES.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => handleServiceSelect(service)}
                                    className="w-full p-3 bg-white rounded-xl border border-brand-lilac/30 hover:border-brand-gold hover:shadow-md transition-all duration-200 flex items-center gap-3 group text-left"
                                >
                                    <div className="bg-brand-lilac/20 p-2 rounded-lg group-hover:bg-brand-gold/20 transition-colors flex-shrink-0">
                                        <Sparkles size={18} className="text-brand-lilacDark group-hover:text-brand-gold" />
                                    </div>
                                    <div>
                                        <span className="font-sans text-sm text-brand-dark font-medium block">{service.name}</span>
                                        <span className="font-sans text-xs text-gray-500">
                                            {service.price > 0 && !('variants' in service)
                                                ? `R$ ${(service.price / 100).toFixed(2).replace('.', ',')} • ${service.description}`
                                                : service.description}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Service Variant Selection */}
                    {step === 'service_variant' && selectedService && 'variants' in selectedService && (
                        <div className="space-y-2">
                            {/* @ts-ignore - Validated by check above */}
                            {selectedService.variants.map((variant: any) => (
                                <button
                                    key={variant.id}
                                    onClick={() => handleServiceSelect(variant)}
                                    className="w-full p-3 bg-white rounded-xl border border-brand-lilac/30 hover:border-brand-gold hover:shadow-md transition-all duration-200 flex items-center gap-3 group text-left"
                                >
                                    <div className="bg-brand-lilac/20 p-2 rounded-lg group-hover:bg-brand-gold/20 transition-colors flex-shrink-0">
                                        <Sparkles size={18} className="text-brand-lilacDark group-hover:text-brand-gold" />
                                    </div>
                                    <div>
                                        <span className="font-sans text-sm text-brand-dark font-medium block">{variant.name}</span>
                                        <span className="font-sans text-xs text-gray-500">
                                            R$ {(variant.price / 100).toFixed(2).replace('.', ',')} • {variant.description}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Payment Link Button */}
                    {step === 'payment' && !isLoading && lastAvailabilityMessage && (
                        <div className="flex flex-col gap-2">
                            <a
                                href={lastAvailabilityMessage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-sans font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 animate-pulse"
                            >
                                Pagar Agora 💳
                            </a>
                            <p className="text-xs text-center text-gray-500">
                                Após o pagamento, você será redirecionado para finalizar o agendamento.
                            </p>
                        </div>
                    )}

                    {/* Confirmation Buttons */}
                    {step === 'confirming' && !isLoading && (
                        <div className="flex gap-2">
                            <button
                                onClick={handleConfirmBooking}
                                className="flex-1 bg-brand-gold hover:bg-brand-goldDark text-white font-sans font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={18} />
                                Confirmar
                            </button>
                            <button
                                onClick={handleCancelBooking}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans font-medium py-3 px-4 rounded-xl transition-all"
                            >
                                Outro horário
                            </button>
                        </div>
                    )}

                    {/* Loading */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5">
                                <span className="w-2 h-2 bg-brand-lilacDark rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-brand-lilacDark rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-brand-lilacDark rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}

                    {/* Success Actions */}
                    {step === 'success' && (
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={closeScheduling}
                                className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Fechar
                            </button>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                {canShowInput && (
                    <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
                        <div className="flex gap-2 items-center">
                            <div className="flex-1 relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {getInputIcon()}
                                </div>
                                <input
                                    ref={inputRef}
                                    type={step === 'email' ? 'email' : step === 'phone' ? 'tel' : 'text'}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder={getInputPlaceholder()}
                                    disabled={isLoading}
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-brand-lilac focus:bg-white rounded-xl pl-10 pr-4 py-3 font-sans text-sm transition-all outline-none focus:ring-2 focus:ring-brand-lilac/20"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !input.trim()}
                                className="bg-brand-gold text-white p-3 rounded-xl hover:bg-brand-goldDark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Error/Retry state */}
                {step === 'error' && (
                    <div className="p-4 bg-white border-t border-gray-100 flex gap-2 flex-shrink-0">
                        <button
                            onClick={() => {
                                localStorage.removeItem('scheduling_chat_state'); // Clear saved state
                                setStep('name');
                                setMessages([{
                                    id: 'restart',
                                    role: 'assistant',
                                    content: 'Vamos tentar novamente. 🙏\n\nQual é o seu nome completo?'
                                }]);
                                setClientData({ name: '', phone: '', email: '' });
                                setSelectedService(null);
                                setPreferredTimeframe('');
                            }}
                            className="flex-1 flex items-center justify-center gap-2 bg-brand-lilac text-brand-dark font-sans font-bold py-3 px-4 rounded-xl hover:bg-brand-lilacDark hover:text-white transition-all"
                        >
                            <ArrowLeft size={18} />
                            Recomeçar
                        </button>
                        <a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-sans font-bold py-3 px-4 rounded-xl hover:bg-green-600 transition-all"
                        >
                            WhatsApp
                        </a>
                    </div>
                )}

                {/* Recovery Actions */}
                {step === 'recovery' && (
                    <div className="p-4 bg-white border-t border-gray-100 flex gap-3 flex-shrink-0 flex-col sm:flex-row">
                        <button
                            onClick={handleResumeState}
                            className="flex-1 bg-brand-gold text-white font-sans font-bold py-3 px-4 rounded-xl hover:bg-brand-goldDark transition-all shadow-md flex items-center justify-center gap-2"
                        >
                            <CheckCircle size={18} />
                            Retomar (Continuar)
                        </button>
                        <button
                            onClick={handleResetState}
                            className="flex-1 bg-gray-100 text-gray-600 font-sans font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Começar do Zero
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
};

export default SchedulingChat;
