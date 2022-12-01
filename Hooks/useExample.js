import { useContext } from "react";
import ContextExample from "../Contexts/ContextExample";

function useExample() {
  return useContext(ContextExample);
}

export default useExample;
