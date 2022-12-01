import { createContext } from "react";
import Example_sts from "../States/Example_sts";

const ContextExample = createContext({});

function ContextExampleProvider(props) {
  const values = Example_sts();
  return (
    <ContextExample.Provider value={values}>
      {props.children}
    </ContextExample.Provider>
  );
}

exports = {
  ContextExample,
  ContextExampleProvider,
};
