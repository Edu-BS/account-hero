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
      isAuthenticated: false,
      userName: null,
      error : null
    }
  },
  getters: {
    getToken: (state) => state.token,
    // isAuthenticated: (state) => state.isAuthenticated
  },
  actions: {
    // Funcion para login
    async login(email, password) {
      // Enviar al servidor las crendeciales para pedir el token
      const url = import.meta.env.VITE_APP_URL_API + "/login"

      this.error = null;
      const response = await fetch(
        url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();
 
      // Verifico si el token existe o es diferente a null
      if (data.token && data.token !== null) {
        this.token = data.token;
        this.isAuthenticated = true;
        this.userName = data.username
        localStorage.setItem('auth', JSON.stringify({
          token: this.token,
          isAuthenticated: true,
          userName: this.userName
        }));
      } else if (data.errors) {
        this.error = data.errors.login.message
      }

      return data
    },

    // Funcion para registrar un nuevo usuario 
    async register(name, surname, username, birthday, email, password) {
      // Enviar al servidor las crendeciales para pedir el token
      const url = import.meta.env.VITE_APP_URL_API + "/register"

      this.error = null;
      const res = await fetch(
        url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        },
        body: (JSON.stringify({ name, surname, username, birthday, email, password }))
      })

      const data = await res.json();
      
      // Verifico si el token existe o es diferente a null
      if (data.token && data.token !== null) {
        this.token = data.token;
        localStorage.setItem('auth', JSON.stringify({
          token: this.token,
          isAuthenticated: true
        }));
      }else if (data.errors) {
        this.error = data.errors.user.message
      }
      return data
    },

    // Funcion para eliminar el token
    logout() {
      this.token = null 
      this.isAuthenticated = false 
      this.username = null
      localStorage.removeItem('auth')
    }
  }
})
