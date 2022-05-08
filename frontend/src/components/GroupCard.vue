<template>
<router-link :to="'/group/' + id" style="text-decoration: none; color: inherit;">
   <div class="card">
    <h5 class="card-header">{{name}}</h5>
    <div class="card-body">
      <p class="card-text">{{description}}</p>
      <div class="row justify-content-center">
        <div class="col-3 text-center fw-bold">
          <p class="mb-0 text-secondary">{{users.length}}</p>
          <p class="mb-0">Groups</p>
        </div>
      </div>
    </div>
  </div>
</router-link>
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        description: String,
        users: Array,
    },
    methods: {
      
    },
};
</script>

<style>
</style>