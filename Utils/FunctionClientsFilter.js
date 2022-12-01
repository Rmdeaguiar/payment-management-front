
function useClientsFilter() {

    function getClientsDay(data) {
        const clientsDay = data.filter((client) => {
            return client.status === 'Em dia'
        })
        return clientsDay;
    }

    function getClientsDefaulter(data) {
        const clientsDefaulter = data.filter((client) => {
            return client.status === 'Inadimplente'
        })
        return clientsDefaulter;
    }


    return {
        getClientsDay,
        getClientsDefaulter,
    }
}

export default useClientsFilter;