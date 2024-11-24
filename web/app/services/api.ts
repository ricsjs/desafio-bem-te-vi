import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const api = axios.create({
  baseURL: "https://desafio-bem-te-vi.onrender.com/",
  // baseURL: "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${cookies["btv.token"]}`,
  },
});
