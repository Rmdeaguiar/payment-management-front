import { useState } from 'react';

function useClientProvider() {
    const [currentClient, setCurrentClient] = useState({})
    const [clients, setClients] = useState([]);
    const [localClients, setLocalClients] = useState([]);
    const [noClients, setNoClients] = useState(false)

    return {
        currentClient,
        setCurrentClient,
        clients,
        setClients,
        localClients,
        setLocalClients,
        noClients,
        setNoClients
    }
}

export default useClientProvider;