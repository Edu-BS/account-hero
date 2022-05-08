<template>
  <main>
    <NavComponent view="Dashboard" />
    <div class="container mb-5">
      <!-- User info -->
      <div class="border border-1 rounded-3 m-4 d-lg-none">
        <div class="d-flex">
          <div class="col-3 col-md-2 m-3 me-0">
            <img class="img-fluid" src="profile_icon.png" alt="" />
          </div>
          <div class="col-auto ms-3 m-3">
            <p class="fw-bold fs-4">{{ this.$auth.userName }}</p>
          </div>
          <div class="col-1 col-md-1 ms-auto m-3">
            <router-link to="/user" id="userSetting_router-link">
              <img class="img-fluid" src="gear.png" alt="" />
            </router-link>
          </div>
        </div>
        <div class="row justify-content-center fs-4">
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">{{ this.groups.length }}</p>
            <p>Groups</p>
          </div>
        </div>
      </div>

      <!-- Add groups button -->
      <div class="text-center justify-content-center d-lg-none">
          <router-link to="/group/create" class="btn btn-primary rounded-pill btn-circle align-middle fw-bold fs-1">+</router-link>
      </div>

      <Invitations />

      <!-- Groups container -->
      <div v-if="groups.length > 0" class="row justify-content-center mt-4 mx-auto">
        <div v-for="group in groups" :key="group._id" class="col-lg-4 col-xs col-md-6 col-sm-6 my-3">
          <GroupCard :name="group.name" :description="group.description" :users="group.users" />
        </div>
      </div>
    </div>
    <footer class="footer d-none d-lg-block fixed-bottom py-3 bg-light text-center">
      <router-link to="/group/create" class="btn btn-primary rounded-pill">Crear Grupo</router-link>
    </footer>
  </main>
</template>
<script>
import GroupCard from "../components/GroupCard.vue";
import Invitations from "../components/Invitations.vue";

export default {
  components: {
    GroupCard,
    Invitations,
  },
  data() {
    return {
      username: "",
      groups: [],
    };
  },
  methods: {
    async getGroups() {
      const res = await fetch(
        import.meta.env.VITE_APP_URL_API + "/user/groups",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$auth.token,
          },
        }
      );

      const data = await res.json();
      if (data.errors?.token) {
        this.$auth.logout();
        this.$router.push("login");
      } else {
        this.groups = data;
      }
    },
  },
  async created() {
    await this.getGroups();
  },
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

#userSetting_router-link img:hover {
  cursor: pointer;
  /* Filter to make the image more dark */
  filter: invert(40%);
  /* Spin the image until the cursor is hover */
  animation: spin 1s infinite;

}

@keyframes spin { 
    100% { 
        -webkit-transform: rotate(360deg); 
        transform:rotate(360deg); 
    } 
}

</style>
