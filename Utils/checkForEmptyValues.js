import errorMessage from "./errorMessage";

function checkForEmptyValues(values) {
  const error = { isEmpty: false, empty: [], message: "" };
  values.forEach((obj) => {
    if (Object.entries(obj)[0][1].trim() === "") {
      error.empty.push(Object.entries(obj)[0][0]);
    }
  });

  error.isEmpty = error.empty.length > 0 ? true : false;
  error.message = error.isEmpty ? errorMessage("emptyValue") : "";
  return error;
}

export default checkForEmptyValues;
