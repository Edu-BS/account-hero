<template>
  <main>
    <NavComponent view="Dashboard" />
    
    <div class="container mb-5">
      <div v-if="this.error !== null" class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ this.error }}
      </div>
    <form @submit.prevent="submit" class="form justify-content-center col-9 col-md-5 m-auto mt-5">
      <label for="name_input" class="form-label">Nombre</label>
      <input v-model="group.name" type="name" name="name" id="name_input" class="form-control" required>

      <label for="description_input" class="form-label mt-3">Descripción</label>
      <textarea v-model="group.description" name="description" id="description_input" class="form-control" rows="4"></textarea>

      <label for="usuarios_input" class="form-label mt-3">Usuarios</label>
      <input v-model="userToAdd" type="usuarios" name="usuarios" autocomplete="off" id="usuarios_input" class="form-control">
      <div v-if="usersResearch">
        <ul class="list-group" style="max-height: 200px;">
          <li v-for="user in usersResearch" :key="user._id" class="list-group-item">
            <p class="d-inline align-middle">{{ user.username }}</p>
            <button @click="addUser(user)" class="btn btn-primary btn-sm float-end float-right">Agregar</button>
          </li>
        </ul>
      </div>

      <div id="users_in_group" v-if="this.group.users.length > 0" class="mt-4">
        <ul class="list-group overflow-auto" style="max-height: 200px;" >
          <li v-for="user in this.group.users" :key="user._id" class="list-group-item">
            <p class="d-inline align-middle">{{ user.username }}</p>
            <button @click="removeUser(user)" class="btn btn-danger btn-sm float-end float-right">Eliminar</button>
          </li>
        </ul>
      </div>

      <div class="d-flex">
        <button ref="formButton" type="submit" class="d-lg-none btn btn-primary rounded-pill mx-auto mt-4">Crear</button>
      </div>
    </form>

    <footer class="footer d-none d-lg-block fixed-bottom py-3 bg-light text-center">
      <button @click="$refs.formButton.click()" class="btn btn-primary rounded-pill">Crear</button>
    </footer>
  </div>
  </main>
</template>
<script>
import GroupController from '../controllers/groupController';
import UserController from '../controllers/userController';

export default {
  data() {
    return {
      apiEndpoint: import.meta.env.VITE_APP_URL_API,
      error: null,
      userToAdd: null,
      usersResearch: [],
      group: {
        name: '',
        description: '',
        users: []
      }
    };
  },
  watch: {
    userToAdd(newUsername, oldName) {
      console.log(newUsername);
      this.getByUsernameLike(newUsername)
    }
  },
  methods: {
    submit() {
      this.deleteError()
      this.createGroup()
    },
    async createGroup() {
      let endpoint = this.apiEndpoint + '/group';
      
      const res = await GroupController.createGroup(endpoint, this.$auth.token, this.group);
      console.log(res);
      const resJson = await res.json() 

      if (res.ok && res.status === 201) {
        this.$router.push('/dashboard');
      } else {
        if (resJson['message'] == 'User not found') {
          this.error = 'Usuario no encontrado'
        }
      }

    },
    async getByUsernameLike(username) {
      let endpoint = this.apiEndpoint + '/users/nameLike'
      
      const res = await UserController.getByUsernameLike(endpoint, this.$auth.token, username)
      let resJson = await res.json()

      if (this.group.users.length > 0) 
        resJson = resJson.filter(user => !this.group.users.find(userInGroup => userInGroup.username == user.username))
      
      this.usersResearch = resJson
    },
    deleteError() {
      this.error = null;
    },
    addUser(user) {
      this.group.users.push(user);
      this.userToAdd = null;
      this.usersResearch = [];
    },
    removeUser(user) {
      this.group.users = this.group.users.filter(u => u._id !== user._id);
    }
  },
};
</script>

<style>
</style>
