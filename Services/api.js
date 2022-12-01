import axios from "axios";

export default axios.create({
  baseURL: "https://desafio-back-cubos.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});
