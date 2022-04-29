<template>
  <main>
    <NavComponent view="Dashboard" />
    
    <div class="container mb-5">
      
    <form @submit.prevent="submit" class="form justify-content-center col-9 col-md-5 m-auto mt-5">
      <label for="name_input" class="form-label">Nombre</label>
      <input v-model="group.name" type="name" name="name" id="name_input" class="form-control" required>

      <label for="description_input" class="form-label mt-3">Descripción</label>
      <textarea v-model="group.description" name="description" id="description_input" class="form-control" rows="4"></textarea>

      <label for="usuarios_input" class="form-label mt-3">Usuarios</label>
      <input v-model="group.users" type="usuarios" name="usuarios" id="usuarios_input" class="form-control" required>

      <div class="d-flex">
        <button @click="submit" ref="formButton" type="submit" class="btn btn-primary rounded-pill mx-auto mt-4">Crear</button>
      </div>
    </form>

    <footer class="footer d-none d-lg-block fixed-bottom py-3 bg-light text-center">
      <button @click="$refs.formButton.click()" class="btn btn-primary rounded-pill">Crear</button>
    </footer>
  </div>

{{this.group.name}}
  </main>
</template>
<script>
import GroupController from '../controllers/groupController';

export default {
  data() {
    return {
      group: {
        name: '',
        description: '',
        users: []
      }
    };
  },

  created() {},

  methods: {
    submit: function() {
      this.createGroup(this.group)
    },
    createGroup: async function(group) {
      console.log(group);
      const res = await GroupController.createGroup(this.$auth.token, group);
      if (res.ok && res.status === 201) {
        this.$router.push('/dashboard');
      }
    }
  },
};
</script>

<style>
</style>
