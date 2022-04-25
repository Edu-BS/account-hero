<template>
  <main>
    <NavComponent view="Register" />
    <div class="container ">
      <form action="/api/signin" method="post" class="form justify-content-center col-9 col-md-5 m-auto mt-5">

        <div class="row">
          <div class="col-6">
            <label for="name_input" class="form-label">Nombre</label>
            <input type="text" name="name" id="name_input" class="form-control" required>
          </div>
          <div class="col-6">
            <label for="surname_input" class="form-label">Apellido</label>
            <input type="text" name="name" id="surname_input" class="form-control" required>
          </div>
        </div>

        <label for="username_input" class="form-label mt-3">Nombre de usuario</label>
        <input type="text" name="name" id="username_input" class="form-control" required>
        
        <label for="email_input" class="form-label mt-3">Email</label>
        <input type="email" name="email" id="email_input" class="form-control" required>

        <div class="row">
          <div class="col-6">
            <label for="password_input" class="form-label mt-3">Contraseña</label>
            <input type="password" name="password" id="password_input" class="form-control" v-model="password" required>
          </div>
          <div class="col-6">
            <label for="passwordRepeat_input" class="form-label mt-3">Repetir contraseña</label>
            <input type="password" id="passwordRepeat_input" class="form-control" :class="borderColor" v-model="passwordRepeat" required>
          </div>
        </div>

        <div class="d-flex">
          <button v-on:click="submit" type="submit" class="btn btn-primary rounded-pill ms-auto mt-4" :class="{disabled: !passwordsMatch}">Verificar</button>
        </div>
      </form>   
      <div class="text-center m-auto mt-5">
        <p class="d-lg-none">¿Ya tienes una cuenta? <router-link to="/register" class="text-decoration-none">Inicia sessión</router-link></p>
        <p class="d-none">¿Has olvidado la contraseña?<a href="" class="text-decoration-none">Cambiar contraseña</a></p>
      </div>   
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      password: '',
      passwordRepeat: '',
      borderColor: '',
      passwordsMatch: false
    }
  },
  watch: {
    password: function(val) {
      if (val == this.passwordRepeat) {
        if (val.length > 0) {
          this.borderColor = 'border-success'
          this.passwordsMatch = true
        } else {
          this.borderColor = ''
        }
      } else {
        this.borderColor = 'border-danger';
        this.passwordsMatch = false
      }
    },
    passwordRepeat: function(val) {
      if (val == this.password) {
        if (val.length > 0) {
          this.borderColor = 'border-success'
          this.passwordsMatch = true
        } else {
          this.borderColor = ''
        }
      } else {
        this.borderColor = 'border-danger';
        this.passwordsMatch = false
      }
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
    },
  }
}
</script>