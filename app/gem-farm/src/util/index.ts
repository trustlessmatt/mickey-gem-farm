import axios from "axios";

export const getToken = async () => {
  return await axios.post('https://rpc.degods.com/auth').then(res => {return res?.data?.access_token}).catch(err => console.log("ERROR:", err))
};