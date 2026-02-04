import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../helpers/axios";

export const useAuthStore = defineStore("auth", () => {
const token = ref(localStorage.getItem("authToken") || null);
const user = ref(JSON.parse(localStorage.getItem("user")) || null);

const setToken = (authToken) => {
    localStorage.setItem("authToken", authToken);
    token.value = authToken;     
}

const clearToken = () => {
    localStorage.removeItem("authToken");
    token.value = null;
}

const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
}
});
