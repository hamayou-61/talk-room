import axios from "axios";
import store from "../store";

const http = () => {
  const instance = axios.create({
    baseURL: "https://api.openai.com/v1/chat",
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${store.state.apiKey}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default http;
