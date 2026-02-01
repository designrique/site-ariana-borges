import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ClientData {
    name: string;
    phone: string;
    email: string;
}

export interface SchedulingContextType {
    isOpen: boolean;
    openScheduling: (initialState?: any) => void;
    closeScheduling: () => void;
    clientData: ClientData | null;
    initialState: any;
    setClientData: (data: ClientData) => void;
    clearClientData: () => void;
}

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

export const useScheduling = (): SchedulingContextType => {
    const context = useContext(SchedulingContext);
    if (!context) {
        throw new Error('useScheduling must be used within a SchedulingProvider');
    }
    return context;
};

interface SchedulingProviderProps {
    children: ReactNode;
}

export const SchedulingProvider: React.FC<SchedulingProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clientData, setClientDataState] = useState<ClientData | null>(null);
    const [initialState, setInitialState] = useState<any>(null);

    const openScheduling = (state?: any) => {
        setInitialState(state);
        setIsOpen(true);
    };
    const closeScheduling = () => {
        setIsOpen(false);
        setInitialState(null);
    };
    const setClientData = (data: ClientData) => setClientDataState(data);
    const clearClientData = () => setClientDataState(null);

    return (
        <SchedulingContext.Provider value={{
            isOpen,
            openScheduling,
            closeScheduling,
            clientData,
            initialState,
            setClientData,
            clearClientData
        }}>
            {children}
        </SchedulingContext.Provider>
    );
};
