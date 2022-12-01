function changeInputValue(e, state, setState) {
  if (typeof state === "object" && !Array.isArray(state)) {
    return setState({ ...state, [e.target.name]: e.target.value });
  }

  //   if (Array.isArray(state)) {
  //     return;
  //   }

  return setState(e.target.value);
}

export default changeInputValue;
