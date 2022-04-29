<template>
<nav>
  <div class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid p-2 mx-2">
            <router-link to="/" class="navbar-brand">
                <img src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30"
                    height="24" class="d-inline-block align-text-top">
                Account-Hero
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Login -->
            <div v-if="view == 'Login'" class="collapse navbar-collapse justify-content-end">
                <router-link to="/register" class="btn btn-outline-primary rounded-pill text-black me-4">Registrarse</router-link>
            </div>
            <!-- Register -->
            <div v-if="view == 'Register'" class="collapse navbar-collapse justify-content-end">
                <router-link to="/login" class="btn btn-primary rounded-pill ">Iniciar sessión</router-link>
            </div>
            <!-- Dashboard -->
            <div v-if="view == 'Dashboard'" class="collapse navbar-collapse justify-content-end">
                <div class="row align-items-center">
                    <div class="col-2 ms-auto text-end">
                        <router-link to="" class="btn btn-outline-primary rounded-pill">{{username}}</router-link>
                    </div>
                    <div class="col-1 ms-3 me-3 px-2">
                        <!-- <div class="col-6"> -->
                            <img class="img-fluid" src="profile_icon.png" alt="" />
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <router-link to="/" class="text-decoration-none">
                    <h5 id="offcanvasTopLabel">Account-Hero</h5>
                </router-link>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div v-if="view == 'Login' || view == 'Register'" class="offcanvas-body">
                <ul class="list-group">
                    <router-link to="register" class="btn btn-outline-primary rounded-pill text-black">Registrarse</router-link>
                    <router-link to="login"  class="btn btn-primary rounded-pill mt-2">Iniciar sessión</router-link>
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
    data () {
        return {    
            username: this.$auth.userName,
        }
    },
    
}
</script>

<style>

</style>