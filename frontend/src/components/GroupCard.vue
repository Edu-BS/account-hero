<template>
<router-link :to="'/group/' + id" style="text-decoration: none; color: inherit;">
   <div class="card card-efect">
    <h5 class="card-header">{{name}}</h5>
    <div class="card-body">
      <p class="card-text">{{description}}</p>
      <div class="row justify-content-center">
        <div class=" text-center fw-bold">
          <p class="mb-0 text-secondary">{{users.length}}</p>
          <p class="mb-0" width="100%">Integrantes</p>
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

    .card-efect {
    transition: width 2s, left 2s, height 2s, opacity 2s,transform 0.5s ;
      /*el transition tambien puedo el top*/
      -moz-transition: width 2s, left 2s, height 2s, opacity 2s ,transform 0.5s;
  }

    .card-efect:hover {
      transform: scale(1.2);
      z-index: 90;
      box-shadow: 2px 2px 10px #666;
  }


</style>