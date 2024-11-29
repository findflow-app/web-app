import { api } from "./api"
import { TokenManager } from "./tokenmanager"

export const getUsers = async (name: string) => {
  const res = await api.post<{success: string, result: [number, string][]}>("/search", {
    name_string: name,
    token: TokenManager.getToken(),
  });

  console.log(res.data);

  return res.data.result.map((item) => ({
    id: item[0],
    name: item[1],
  }));
}

export const getUserLocation = async (id: number) => {
  const res = await api.post<{mac: string, type: string, timestamp: string}>("/get_position", {
    user_id: id,
    token: TokenManager.getToken(),
  });

  return res.data;
}