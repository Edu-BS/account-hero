<template>
  <main>
    <NavComponent view="Login" />
    <div class="container ">
      <form @submit.prevent="submit" class="form justify-content-center col-9 col-md-5 m-auto mt-5">
        <label for="email_input" class="form-label">Email</label>
        <input v-model="formData.email" type="email" name="email" id="email_input" class="form-control" required>

        <label for="password_input" class="form-label mt-3">Contraseña</label>
        <input v-model="formData.password" type="password" name="password" id="password_input" class="form-control" required>

        <div class="d-flex">
          <button v-on:click="submit" type="submit" class="btn btn-primary rounded-pill ms-auto mt-4">Verificar</button>
        </div>
      </form>
      
      <div class="text-center m-auto mt-5">
        <p class="d-lg-none">¿Aún no tienes una cuenta? <router-link to="register" class="text-decoration-none">
            Registrate</router-link>
        </p>
        <p class="d-none">¿Has olvidado la contraseña?<router-link to="login" class="text-decoration-none">Cambiar
            contraseña</router-link>
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email : '',
        password : '',
      }
    }
  },
  methods: {
    submit(form) {
      this.login(this.formData);
    },
    async login({email, password}) {
      const res = await this.$auth.login(email, password);
      console.log(this.$auth.isAuthenticated);
      if (this.$auth.isAuthenticated && "errors" in res === false) {
        this.$router.push('dashboard');
      }
    }
  }
};
</script>