import { useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";
function useGlobalProvider() {
  const [user, setUser] = useState("");
  const [chargeFilter, setChargeFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const navigate = useNavigate();

  async function loadUser() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/get-user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data === "jwt expired") {
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }

  return {
    user,
    loadUser,
    chargeFilter,
    setChargeFilter,
    clientFilter,
    setClientFilter,
  };
}

export default useGlobalProvider;
