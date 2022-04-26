<template>
  <main>
      
    <h1>Login</h1>
    <div class="container">
        <label for="username">username</label>
        <input type="text" v-model="username" class="form form-control">
        <label for="email">email</label>
        <input type="text" v-model="email" class="form form-control">
         <label for="password">password</label>
        <input type="password" v-model="password" class="form form-control">
    </div>
    <button @click="login" class="btn btn-primary">prueba</button>
    <button @click="logout">logout</button>
    <button @click="registrer" >registrer</button>
    <p>{{this.$auth.getToken}}</p>
  </main>
</template>
<script>
export default {
    data() {
        return {
            username : '',
            email : '',
            password : ''
        }
    },

    methods: {
        login() {
            this.$auth.login(this.username,this.email,this.password);
        },
        logout() {
            this.$auth.logout()
        },
        registrer() {
            this.$auth.registrer(this.username,this.email,this.password)
        }
    }
}
</script>