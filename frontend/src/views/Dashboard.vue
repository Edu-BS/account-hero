<template>
  <main>
    <NavComponent view="Dashboard" />
    <div class="container">
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
      <!-- Groups container -->
      <div class="row justify-content-center mt-4 mx-auto">
        <div v-for="group in groups" :key="group._id" class="col-lg-4 col-sm my-3">
          <GroupCard :name="group.name" :description="group.description" />
        </div>
      </div>
    </div>
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
      ],
    }
  }
};
</script>