import { format } from 'date-fns';


function formatDate(data){
   return format(new Date(data), "dd/MM/yyyy")
}

export default formatDate;