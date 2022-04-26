<template>
  <main>
    <NavComponent view="Register" />
    <div class="container ">
      <form @submit.prevent="submit" class="form justify-content-center col-9 col-md-5 m-auto mt-5">
        <div class="row">
          <div class="col-md-6 ">
            <label for="name_input" class="form-label mt-3">Nombre</label>
            <input v-model="formData.name" type="text" name="name" id="name_input" class="form-control" required>
          </div>
          <div class="col-md-6">
            <label for="surname_input" class="form-label mt-3">Apellido</label>
            <input v-model="formData.surname" type="text" name="surname" id="surname_input" class="form-control" required>
          </div>
        </div>

        <label for="username_input" class="form-label mt-3">Nombre de usuario</label>
        <input v-model="formData.username" :class="{ 'is-invalid': formFeedback.username }" type="text" name="username" id="username_input" class="form-control" required>
        <div id="email_input_feedbak" class="invalid-feedback">
          {{formFeedback.username}}
        </div>
        
        <label for="birthday_input" class="form-label mt-3">Fecha de nacimiento</label>
        <input v-model="formData.birthday" type="date" name="birthday" id="birthday_input" class="form-control" required>

        <label for="email_input" class="form-label mt-3">Email</label>
        <input v-model="formData.email" :class="{ 'is-invalid': formFeedback.email }" type="email" name="email" id="email_input" class="form-control" aria-describedby="email_input_feedbak" required>
        <div id="email_input_feedbak" class="invalid-feedback">
          {{formFeedback.email}}
        </div>


        <div class="row">
          <div class="col-lg-6 col-sm">
            <label for="password_input" class="form-label mt-3">Contraseña</label>
            <input v-model="formData.password" type="password" name="password" id="password_input" class="form-control" required>
          </div>
          <div class="col-lg-6 col-sm">
            <label for="passwordRepeat_input" class="form-label mt-3 text-nowrap">Repetir contraseña</label>
            <input v-model="formData.passwordRepeat" :class="borderColor" type="password" name="passwordRepeat"
              id="passwordRepeat_input" class="form-control" required>
            <div class="valid-feedback">
            </div>
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
        birthday: '1995-01-01',
        email: 'edu@gmail.com',
        password: '1',
        passwordRepeat: '',
      },
      formFeedback: {
        email: '',
        username: '',
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
    async register({name, surname, username, birthday, email, password}) {
      
      for (const [key, value] of Object.entries(this.formFeedback)) {
        this.formFeedback[key] = '';
      }

      const res = await this.$auth.register(name, surname, username, birthday, email, password);

      if (res.errors) {
        for (let index = 0; index < res.errors.length; index++) {
          if (res.errors[index].message == "correo ya existe") {
            this.formFeedback.email = 'El email ya está en uso'
          } else if (res.errors[index].message == "username ya existe") {
            this.formFeedback.username = 'El nombre de usuario ya está en uso'
          }
        }
      } else  {
        this.$router.push('login');
      }
    }
  }
}
</script>