import { defineStore } from "pinia";
import { axiosClient } from "../utils/axios";

export const useAuthedUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    auth: {
      id: "",
      token: "",
      refreshToken: "",
      user: {},
    },
  }),
  actions: {
    async login(email, password) {
        try {
            let response = await axiosClient.post("/auth/login", {
              email,
              password,
            });
            await this.init(response.data);

        } catch (error) {
            console.error("login failed", error);
        }
    },
    async init(authData) {
      try {
        this.isAuthenticated = true;
        this.auth.id = authData.id;
        this.auth.token = authData["auth-token"];
        await this.fetchUserDetails();
      } catch (error) {
        console.error("authData initialization failed", error);
      }
    },
    async fetchUserDetails() {
      try {
        let response = await axiosClient.get("/users/me");
        this.auth.user = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    clearUserData() {
      this.$state.isAuthenticated = false;
      this.$state.auth = {
        email: "",
        token: "",
        refreshToken: "",
        user: {},
      }
    },
  },
});