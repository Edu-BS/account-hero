import { defineStore } from 'pinia'

export const authStore = defineStore({
  id: 'auth',
  state: () => {

    const auth = localStorage.getItem('auth');

    if (auth) {
        return JSON.parse(auth);
    }

    return {
        token: null,
        isAuthenticated : false

    }
},
  getters: {
    getToken: (state) => state.token
  },
  actions: {
    // funcion para login
    async login(email, password) {
      // enviar al servidor las crendeciales para pedir el token
      const url = import.meta.env.VITE_APP_URL_API + "/signin"
      const response = await fetch(
        url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({email,password})
      })
      const data = await response.json();
      console.log(data);
      // verifico si el token existe o es diferente a null
      if (data.token && data.token !== null) {
        this.token = data.token;
        localStorage.setItem('token', JSON.stringify({
           token: this.token,
            isAuthenticated : true 
        }));
      }
    },

    // funcion para registrar un nuevo usuario 
    async registrer(username,email, password) {
      // enviar al servidor las crendeciales para pedir el token
      const url = import.meta.env.VITE_APP_URL_API + "/signup"
      const res = await fetch(
        url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username,email, password })
      })
      console.log("entra");
      const data = await res.json();
      // verifico si el token existe o es diferente a null
      if (data.token && data.token !== null) {
        this.token = data.token;
        localStorage.setItem('token', JSON.stringify({ 
          token: this.token, 
          isAuthenticated : true 
        }));
      }
    },

    // funcion para eliminar el token
    logout() {
      this.token = null,
      localStorage.removeItem('token');
    }
  }
})
