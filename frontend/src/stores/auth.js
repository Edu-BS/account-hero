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
        isAuthenticated : false,
        userName: null
    }
},
  getters: {
    getToken: (state) => state.token
  },
  actions: {
    // Funcion para login
    async login(email, password) {
      // Enviar al servidor las crendeciales para pedir el token
      const url = import.meta.env.VITE_APP_URL_API + "/login"
      
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
      // Verifico si el token existe o es diferente a null
      if (data.token && data.token !== null) {
        this.token = data.token;
        localStorage.setItem('token', JSON.stringify({
           token: this.token,
            isAuthenticated : true 
        }));
      } 
    },

    // Funcion para registrar un nuevo usuario 
    async register(username,email, password) {
      // Enviar al servidor las crendeciales para pedir el token
      const url = import.meta.env.VITE_APP_URL_API + "/register"
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
      // Verifico si el token existe o es diferente a null
      if (data.token && data.token !== null) {
        this.token = data.token;
        localStorage.setItem('token', JSON.stringify({ 
          token: this.token, 
          isAuthenticated : true 
        }));
      }
    },

    // Funcion para eliminar el token
    logout() {
      this.token = null,
      localStorage.removeItem('token');
    }
  }
})
