<template>
    <main>
        <NavComponent view="User" />
        <div class="container">
            <div v-if="this.error" class="alert alert-warning alert-dismissible fade show" role="alert">
              {{ this.error }}
              <button @click="deleteError" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="mt-3 mx-auto col-lg-6 ">
                <div class="row text-center">
                    <img class="col-3 mx-auto img-fluid" :src="user.picture" alt="">
                </div>
                <div class="row mt-4 gx-5 gy-4 mt-0">
                    <div class="col">
                        <EditableField :fieldValue="user.name" :originalValue="userOriginalData.name" @updateField="this.user.name = $event" />

                        <!-- <div @click="editField" class="border border-dark rounded py-1">
                            <p class="text-center mb-0 fs-4">{{ user.name }}</p>
                        </div> -->
                    </div>
                    <div class="col">
                        <EditableField :fieldValue="user.surname" :originalValue="userOriginalData.surname" @updateField="this.user.surname = $event" />
                        <!-- <div @click="editField" class="border border-dark rounded py-1">
                            <p class="text-center mb-0 fs-4">{{ user.surname }}</p>
                        </div> -->
                    </div>
                    <div class="col-12">
                        <EditableField :fieldValue="user.username" :originalValue="userOriginalData.username" @updateField="this.user.username = $event" />
                        <!-- <div @click="editField" class="border border-dark rounded py-1">
                            <p class="text-center mb-0 fs-4">{{ user.username }}</p>
                        </div> -->
                    </div>
                    <div class="col-12">
                        <EditableField :fieldValue="user.email" :originalValue="userOriginalData.email" @updateField="this.user.email = $event" />
                        <!-- <div @click="editField" class="border border-dark rounded py-1">
                            <p class="text-center mb-0 fs-4">{{ user.email }}</p>
                        </div> -->
                    </div>
                    <div class="col-12 text-break">
                        <EditableField v-if="user.walletAddress" :fieldValue="user.walletAddress" :originalValue="userOriginalData.walletAddress" @updateField="this.user.walletAddress = $event" />
                    </div>
                    <div v-if="userDataChanged" class="col-12 text-left">
                        <button @click="updateUser()" class="btn btn-outline-primary rounded-pill">Guardar cambios</button>
                    </div>
                    
                    <div v-if="!user.walletAddress" class="col-12 mt-5 text-left">
                        <button @click="addWalletAddress" class="btn btn-primary rounded-pill align-middle">
                          <p class="d-inline">Añadir cartera</p>
                          <img src="/ether.png" class="img-fluid ms-2" width="20">
                        </button>
                    </div>

                    <div class="col-12 mt-5 text-left d-lg-none">
                        <button @click="logout()" class="btn btn-outline-danger rounded-pill">Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer d-none d-lg-block fixed-bottom py-3 bg-light text-center">
            <button @click="logout()" class="btn btn-outline-danger rounded-pill">Cerrar sesión</button>
        </footer>
    </main>
</template>

<script>
import UserController from "../controllers/userController";
import EditableField from "../components/EditableField.vue";
import EthereumController from "../blockchain/ethereumController"
export default {
  components: {
    EditableField,
  },
  mounted() {
    this.getUser();
  },
  data() {
    return {
      error: null,
      endpoint: import.meta.env.VITE_APP_URL_API,
      userOriginalData: {},
      user: {
        username: "edbosu",
        name: "Edu",
        surname: "Borrego",
        email: "edbosu@gmail.com",
        picture: "profile_icon.png",
        walletAddress: "Cartera",
      },
      userDataChanged: false,
    };
  },
  watch: {
    user: {
      handler(newValue) {
        console.log(newValue);
        console.log(this.userOriginalData);
        console.log(JSON.stringify(this.user) !== JSON.stringify(this.userOriginalData));
        this.userDataChanged = JSON.stringify(this.user) !== JSON.stringify(this.userOriginalData)
      },
      deep: true,
    },
  },
  methods: {
    async getUser() {
      const user = await UserController.getUser(
        this.endpoint + "/user",
        this.$auth.token
      );
      user.picture = user.picture !== undefined ? user.picture : "profile_icon.png";

      this.user = user;
      this.userOriginalData = {...user};
    },
    async updateUser() {
      const userUpdated = await UserController.updateUser(
        this.endpoint + "/user",
        this.$auth.token,
        this.user
      );
      this.$auth.userName = userUpdated.username;
      localStorage.setItem('auth', JSON.stringify({
          token: this.$auth.token,
          isAuthenticated: this.$auth.isAuthenticated,
          userName: userUpdated.username,
          userId : this.$auth.userId
        }));
      this.getUser();
    },
    logout() {
      console.log("logout");
      this.$auth.logout();
      this.$router.push("login");
    },
    async addWalletAddress() {
      await EthereumController.connectWallet()
        .then(async walletAddres => {
          if (walletAddres) {
            this.user.walletAddress = walletAddres.toString();
            // this.updateUser();
            // this.getUser();
          }
        })
        .catch(error => {
          this.error = "Error al conectar con la cartera";
        });      
    },
  },
};
</script>

<style>
</style>
                <!-- <div class="row mt-4 justify-content-center gx-5">
                    <div class="border border-dark  rounded-pill col">
                        <div>
                            <p class="text-center mb-0 fs-3">{{ user.name }}</p>
                        </div>
                    </div>
                    <div class="border border-dark rounded-pill col ">
                        <div>
                            <p class="text-center mb-0 fs-3">{{ user.surname }}</p>
                        </div>
                    </div>
                </div> -->
