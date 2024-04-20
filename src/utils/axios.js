import axios from "axios";
import {useAuthedUserStore} from "@/stores/authedUser.js";

const createAxiosClient = (baseURL) => {
  const axiosClient = axios.create({
    baseURL,
  });

  axiosClient.interceptors.request.use((config) => {
    const authedUser = useAuthedUserStore();

    const token = authedUser.auth.token;
    if (token) {
      config.headers = {
        ...config.headers,
        "auth-token": `${token}`,
      };
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const authedUser = useAuthedUserStore();
        authedUser.clearUserData();
        console.log("Error 401, logging out user and redirecting to login page");
        // window.location.href = "/";
      }
      throw error;
    },
  );

  return axiosClient;
};

// instances with different base URLs
const axiosClient = createAxiosClient("http://localhost:3000/api");


export { axiosClient };
