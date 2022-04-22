<template>
  <main>
    <NavComponent />
    <div class="container">
      <div class="border border-1 rounded-3 m-4">
        <div class="d-flex">
          <div class="col-3 col-md-2 m-3 me-0">
            <img class="img-fluid" src="profile_icon.png" alt="">
          </div>
          <div class="col-auto ms-3 m-3">
            <p class="fw-bold fs-4">Username</p>
          </div>
          <div class="col-1 col-md-1 ms-auto m-3">
            <router-link to="">
              <img class="img-fluid" src="gear.png" alt="">
            </router-link>
          </div>
        </div>
        <div class="row justify-content-center fs-4">
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">10</p>
            <p>Groups</p>
          </div>
          <!-- <div class="col-3">
            <p>0</p>
          </div> -->
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {

}
</script>