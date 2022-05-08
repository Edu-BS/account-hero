<template>
  <main>
    <NavComponent view="Dashboard" />
    
    <div class="container mb-5">
     <div class="border border-1 rounded-3 m-4 d-lg-none">
        <div class="d-flex">
          <div class="col-3 col-md-2 m-3 me-0">
            <img class="img-fluid" src="../../public/profile_icon.png" alt="" />
          </div>
          <div class="col-auto ms-3 m-3">
            <p class="fw-bold fs-4">{{ this.$auth.userName }}</p>
          </div>
          <div class="col-1 col-md-1 ms-auto m-3">
            <router-link to="">
              <img class="img-fluid" src="../../public/gear.png" alt="" />
            </router-link>
          </div>
        </div>
        <div class="row justify-content-center fs-4">
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">{{numUsers}}</p>
            <p>Miembros</p>
          </div>
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">0</p>
            <p>Gastos</p>
          </div>
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">0</p>
            <p>Debes</p>
          </div>
        </div>
      </div>

      <!-- Add groups button -->
      <div class="text-center justify-content-center d-lg-none">
          <router-link to="/group/create" class="btn btn-primary rounded-pill btn-circle align-middle fw-bold fs-1">+</router-link>
      </div>
    </div>
  </main> 
</template>
<script>
export default {
  data() {
    return {
        group : null
    }
  },

  created() {
    this.getGroup()    
  },

  methods: {
    async getGroup() {
      const res = await fetch(
        import.meta.env.VITE_APP_URL_API + "/group/" + this.$route.params.id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Authorization': "Bearer " + this.$auth.token,
          },
        }
      );

      const data = await res.json()
      console.log(data)
      this.group = data
    }
  },

  computed: {
    numUsers() {
      let numUsers = 0
      if (this.group) {
        numUsers = this.group.users.length
      }
      return numUsers
    },

    totalGasto() {
      let gasto = 0
      if (this.group) {
        this.group
      }
    }


  }
}
</script>