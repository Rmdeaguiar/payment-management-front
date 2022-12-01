import { createContext } from 'react';
import useClientProvider from '../Hooks/useClientProvider';

const ClientContext = createContext({});

export function ClientProvider(props) {
    const clientProvider = useClientProvider();

    return (
        <ClientContext.Provider value={clientProvider}>{props.children}</ClientContext.Provider>
    )
}


export default ClientContext;