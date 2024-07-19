import api from "../api";
import { Login } from "../../types/auth/loginTypes";
const register = () => {
//   api.post("/Auth/register", userData);
};

const login = async(credentials: Login) => {
    const response = await api.post("api/Auth/login", credentials);
    return response.data
};

export default {
  login,
  register,
};
