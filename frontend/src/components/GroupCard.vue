<template>
  <div class="card">
    <h5 class="card-header">{{name}}</h5>
    <div class="card-body">
      <p class="card-text">{{description}}</p>
      <div class="row justify-content-center">
        <div class="col-3 text-center fw-bold">
          <p class="mb-0 text-secondary">10</p>
          <p class="mb-0">Groups</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        name: String,
        description: String,
    }
};
</script>

<style>
</style>