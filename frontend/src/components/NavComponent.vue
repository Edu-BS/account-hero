<template>
<nav>
  <div class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid p-2">
            <a class="navbar-brand" href="#">
                <img src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30"
                    height="24" class="d-inline-block align-text-top">
                Account-Hero
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <router-link to="register" class="btn btn-outline-primary rounded-pill text-black me-4">Registrarse</router-link>
                <router-link to="login" class="btn btn-primary rounded-pill ">Iniciar sessión</router-link>
            </div>
        </div>
        
    </div>
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasTopLabel">Account-Hero</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
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
    data () {
        return {

        }
    }
}
</script>

<style>

</style>