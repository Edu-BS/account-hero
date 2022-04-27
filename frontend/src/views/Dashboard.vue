<template>
  <main>
    <NavComponent view="Dashboard" />
    <div class="container">
      <!-- User info -->
      <div class="border border-1 rounded-3 m-4 d-lg-none">
        <div class="d-flex">
          <div class="col-3 col-md-2 m-3 me-0">
            <img class="img-fluid" src="profile_icon.png" alt="" />
          </div>
          <div class="col-auto ms-3 m-3">
            <p class="fw-bold fs-4">Username</p>
          </div>
          <div class="col-1 col-md-1 ms-auto m-3">
            <router-link to="">
              <img class="img-fluid" src="gear.png" alt="" />
            </router-link>
          </div>
        </div>
        <div class="row justify-content-center fs-4">
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">10</p>
            <p>Groups</p>
          </div>
        </div>
      </div>

      <div class="text-center justify-content-center d-lg-none">
        <!-- Increase button size -->
          <button class="btn btn-primary btn-circle align-middle fw-bold fs-1">+</button>
      </div>
      
      <!-- Groups container -->
      <div class="row justify-content-center mt-4 mx-auto">
        <div v-for="group in groups" :key="group._id" class="col-lg-4 col-xs col-md-6 col-sm-6 my-3">
          <GroupCard :name="group.name" :description="group.description" />
        </div>
      </div>
    </div>
    <footer class="footer d-none d-lg-block fixed-bottom py-3 bg-light text-center">
      <button class="btn btn-primary rounded-pill">Crear Grupo</button>
    </footer>
  </main>
</template>
<script>
import GroupCard from "../components/GroupCard.vue";

export default {
  components: {
    GroupCard,
  },
  data() {
    return {
      username: "",
      groups: [
        {
          name: "Group 1",
          description: "Group description",
        },
        {
          name: "Group 2",
          description: "Group description",
        },
        {
          name: "Group 3",
          description: "Group description",
        },
        {
          name: "Group 3",
          description: "Group description",
        },
        {
          name: "Group 3",
          description: "Group description",
        },
        {
          name: "Group 3",
          description: "Group description",
        },
        {
          name: "Group 1",
          description: "Group description",
        },
        {
          name: "Group 2",
          description: "Group description",
        },
        {
          name: "Group 3",
          description: "Group description",
        },
        {
          name: "Group 3",
          description: "Group description",
        },
        {
          name: "Group 3",
          description: "Group description",
        },
        {
          name: "Group 3",
          description: "Group description",
        },
        
      ],
    }
  }
};
</script>

<style>
.btn-circle {
    width: 60px;
    height: 60px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
}
</style>
