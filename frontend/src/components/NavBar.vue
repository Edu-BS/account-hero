<template>
    <nav>
        <div class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid p-2 mx-2">
                <router-link to="/" class="navbar-brand">
                    <img src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30"
                        height="24" class="d-inline-block align-text-top">
                    Account-Hero
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
                    aria-controls="offcanvasTop">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- Login -->
                <div v-if="!this.$auth.isAuthenticated" class="collapse navbar-collapse justify-content-end">

                </div>
                <!-- Register -->
                <div v-if="!this.$auth.isAuthenticated" class="collapse navbar-collapse justify-content-end">
                    <router-link to="/login" class="btn btn-primary rounded-pill ">Iniciar sessión</router-link>
                    <router-link to="/register" class="btn btn-outline-primary rounded-pill text-black me-4 ms-4">Registrarse</router-link>
                </div>
                <!-- Dashboard -->
                <div v-if="this.$auth.isAuthenticated" class="collapse navbar-collapse justify-content-end">
                    
                    <router-link to="/dashboard" class="btn btn-primary rounded-pill ">Home</router-link>
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle iconoUsuario" href="#" id="navbarDropdown" 
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img class="" src="/public/profile_icon.png" alt="" height="50" width="50" style="border-radius:200px;"/>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <p class="text-center">{{this.$auth.userName}}</p>
                            <li><a class="dropdown-item" href="/user">Mi perfil</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><button @click="logout" class="dropdown-item" href="#">Cerrar sesion</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <router-link to="/" class="text-decoration-none">
                    <h5 id="offcanvasTopLabel">Account-Hero</h5>
                </router-link>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div v-if="!this.$auth.isAuthenticated" class="offcanvas-body">
                <ul class="list-group">
                    <router-link to="register" class="btn btn-outline-primary rounded-pill text-black">Registrarse </router-link>
                    <router-link to="login" class="btn btn-primary rounded-pill mt-2">Iniciar sessión</router-link>
                </ul>
            </div>
            <div v-if="this.$auth.isAuthenticated" class="offcanvas-body">
                <ul class="list-group">
                    <router-link to="/user" class="btn btn-outline-primary rounded-pill text-black">Perfil</router-link>
                    <button @click="logout" id="logout_button" ref="logout_button" type="button" class="btn btn-primary rounded-pill mt-2">Logout</button>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        view: String
    },
    data() {
        return {
            username: this.$auth.userName,
        }
    },
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.push('login');
        }
    },

}
</script>

<style>
.iconoUsuario {
    text-decoration: none !important;
    color: black !important;
}
</style>