import errorMessage from "./errorMessage";

function throwError(errorState, setError, wrongInputs, errorType) {
  const message = errorMessage(errorType);
  if (Array.isArray(wrongInputs)) {
    wrongInputs.forEach((value) => {
      errorState[value].status = true;
      errorState[value].message = message;
    });

    setError(errorState);
    return;
  }
}

export default throwError;
