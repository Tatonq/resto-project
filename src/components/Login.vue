<template>
<section class="vh-100" style="background-color: #F8ECD1;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block align-self-center">
              <img src="../assets/Kwan-ma-logo.png"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem; " />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form @submit.prevent="SubmitForm">

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                    <!-- <img src="../assets/Kwan-ma-logo-icon.png" alt="" width="auto" height="50" class="d-inline-block align-text-top"> -->
                    <span class="h1 fw-bold mb-0">Kwanma.brew | Login</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" v-model="user.email"/>
                    <label class="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" v-model="user.password" />
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="alert alert-warning mb-4 text-center" role="alert" v-if="this.user.error !== ''">
                    <strong>{{ this.user.error}}</strong>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block">Login</button>
                  </div>

                  <!-- <a class="small text-muted" href="#!">Forgot password?</a> -->
                  <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <router-link to="/sign-up"
                      style="color: #393f81;">Register here</router-link></p>
                  <!-- <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a> -->
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- <Header/>
<img class="rounded-circle" id="logo" src="../assets/Kwan-ma-logo.png" />
<div class="row justify-content-center">

        <div class="col-md-3">
            <h1 class="row justify-content-center">Login</h1>
            <form @submit.prevent="SubmitForm">
                <div class="from-group mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input id="email" type="email" class="form-control" placeholder="name@example.com" v-model="user.email" required>
                </div>
                <div class="from-group mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" type="password" class="form-control" placeholder="Password" v-model="user.password" required>
                </div>
                <div class="col text-center ">
                <div class="alert alert-danger ms-5 me-5" role="alert" v-if="this.user.error !== ''">
                    <strong>{{ this.user.error}}</strong>
                </div>
                <div class="from-group mb-3">
                    <button class="btn btn-primary btn-block">Login</button>
                </div>
                </div>
            </form>
        </div>
</div> -->
</template>

<script>
import axios from 'axios'
export default {
  name:'Login',
  data(){
    return {
      user: {
        email:"",
        password:"",

        error:''
      }
    }
  },
  methods:{
    SubmitForm(){
      axios.post('http://localhost:4000/api-user/login-user', this.user)
      .then(res => {
        // if successfull
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token);
          
          this.$router.push('/');
        }
      }, err => {
        console.log(err.response);
        this.user.error = err.response.data.title
      })
    }
  },
  created() {
    document.title = "Kwanma.brew | Login";
    //user is logged
    if(localStorage.getItem('token')){
        this.$router.push('/');
    }
  }
}
</script>

<style>

</style>