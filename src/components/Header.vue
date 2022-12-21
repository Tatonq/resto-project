<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
      <router-link to="/" class="navbar-brand ">Kwanma.brew</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
        </button> 
      <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto me-5 pe-3" v-if="isLogged === false">
          <li class="nav-item">
              <router-link to="/sign-up" class="nav-link active p-3">SignUp</router-link>
          </li>
          <li class="nav-item">
              <router-link to="/login" class="nav-link active p-3">Login</router-link>
          </li>
      </ul>
      <ul class="navbar-nav ms-auto me-5 pe-3" v-else>
          <li class="nav-item dropdown">
            <a class="nav-link active dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Settings
            </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/profile" class="dropdown-item">Profile</router-link></li>
            <li><router-link to="/create-menu" class="dropdown-item">Create Menu</router-link></li>
            <li><router-link to="/list-menu" class="dropdown-item">List Menu</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item btn btn-danger" v-on:click="logout">Logout</button></li>
          </ul>
          </li>
      </ul>
      </div>
  </div>
</nav>
</template>

<script>
export default {
    data(){
        return {
            isLogged: this.checkIfIsLogged()
        }
    },
    created(){
        if(localStorage.getItem('token') === null) {
            console.log('Logout');
            return true
        } else if(localStorage.getItem('token') === !null){
            console.log('Login');
            return false
        }
    },
    methods:{
        logout(){
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
        ,
        checkIfIsLogged() {
        if(localStorage.getItem('token') === null) {
            console.log('Login');
            return false
        } else if(localStorage.getItem('token') === !null){
            return true
        }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;1,300;1,700&display=swap');
template{
    font-family: 'Sarabun', sans-serif;
}
</style>