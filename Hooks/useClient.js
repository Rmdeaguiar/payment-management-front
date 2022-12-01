import { useContext } from "react";
import ClientContext from '../Contexts/ClientContext'

function useClient() {
    return useContext(ClientContext);
}

export default useClient;