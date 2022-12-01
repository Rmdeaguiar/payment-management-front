import { useContext } from 'react';
import GlobalContext from '../Contexts/GlobalContext'

function useGlobal() {
  return useContext(GlobalContext);
}

export default useGlobal;