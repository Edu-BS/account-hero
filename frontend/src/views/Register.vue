<template>
  <main>
    <NavComponent />
    <div class="container ">
      <form @submit.prevent="submit" class="form justify-content-center col-9 col-md-5 m-auto mt-5">
        <div class="row">
          <div class="col-6">
            <label for="name_input" class="form-label">Nombre</label>
            <input v-model="formData.name" type="text" name="name" id="name_input" class="form-control" required>
          </div>
          <div class="col-6">
            <label for="surname_input" class="form-label">Apellido</label>
            <input v-model="formData.surname" type="text" name="surname" id="surname_input" class="form-control" required>
          </div>
        </div>

        <label for="username_input" class="form-label mt-3">Nombre de usuario</label>
        <input v-model="formData.username" type="text" name="username" id="username_input" class="form-control" required>

        <label for="birthday_input" class="form-label mt-3">Fecha de nacimiento</label>
        <input v-model="formData.birthday" type="date" name="birthday" id="birthday_input" class="form-control" required>

        <label for="email_input" class="form-label mt-3">Email</label>
        <input v-model="formData.email" type="email" name="email" id="email_input" class="form-control" required>


        <div class="row">
          <div class="col-6">
            <label for="password_input" class="form-label mt-3">Contraseña</label>
            <input v-model="formData.password" type="password" name="password" id="password_input" class="form-control" required>
          </div>
          <div class="col-6">
            <label for="passwordRepeat_input" class="form-label mt-3">Repetir contraseña</label>
            <input v-model="formData.passwordRepeat" :class="borderColor" type="password" name="passwordRepeat"
              id="passwordRepeat_input" class="form-control" required>
          </div>
        </div>

        <div class="d-flex">
          <button type="submit" class="btn btn-primary rounded-pill ms-auto mt-4"
            :class="{ disabled: !passwordsMatch }">Verificar</button>
        </div>
      </form>
      <div class="text-center m-auto mt-5">
        <p class="d-lg-none">¿Ya tienes una cuenta? <router-link to="/login" class="text-decoration-none">Inicia sessión
          </router-link>
        </p>
        <p class="d-none">¿Has olvidado la contraseña?<a href="" class="text-decoration-none">Cambiar contraseña</a></p>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: 'Edu',
        surname: 'Borrego',
        username: 'edubs',
        birthday: '15/10/1996',
        email: 'edu@gmail.com',
        password: '1',
        passwordRepeat: '',
      },
      borderColor: '',
      passwordsMatch: false
    }
  },
  watch: {
    formData: {
      handler: function (val) {
        this.passwordsMatch = val.password === val.passwordRepeat;
        this.borderColor = this.passwordsMatch ? val.password === '' ? '' : 'border-success' : 'border-danger';
      },
      deep: true
    },
  },
  methods: {
    submit(form) {
      this.register(this.formData)
    },
    register({name, surname, username, birthday, email, password}) {
      this.$auth.register(name, surname, username, birthday, email, password);
    }
  }
}
</script>