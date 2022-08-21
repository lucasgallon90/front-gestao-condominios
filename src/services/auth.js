import toast from 'react-hot-toast';
import api from "./api";

export async function recoverUserInformation(token) {
  const result = await api
    .get("auth/authenticate", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  return result;
}

export async function signInRequest(email, senha) {
  const result = await api
    .post("auth/login/local", { email, senha })
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      toast.error(
        error.response?.status === 401
          ? "Usuário ou senha incorretos"
          : "Não foi possível conectar-se com o servidor, tente novamente mais tarde"
      );
      return null;
    });
  return result;
}

export async function registerUser(params) {
  const result = await api
    .post("auth/register", params)
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error(
        error.response?.status === 400
          ? error.response.data?.error
          : "Não foi possível conectar-se com o servidor, tente novamente mais tarde"
      );
      return null;
    });
  return result;
}
