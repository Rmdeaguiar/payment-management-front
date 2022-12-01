
function useChargesFilter(){

    function getChargesPaid(data){
        const chargesPaid = data.filter((charge)=>{
            return charge.statuscharge === 'pago'
          })
          return chargesPaid;
    }

    function getChargesPending(data){
        const chargesPending = data.filter((charge)=> {
            return charge.statuscharge === 'pendente'
        })
        return chargesPending;
    }

    function getChargesOverdue(data){
        const chargesOverdue = data.filter((charge)=> {
            return charge.statuscharge === 'Vencida'
        })
        return chargesOverdue;
    }

    return {
        getChargesPaid,
        getChargesPending,
        getChargesOverdue
    }
}

export default useChargesFilter;