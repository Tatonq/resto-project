<template>
<Header/>
  <div class="container-sm ">
      <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col" v-for="(menus, index) in MenuList" :key="menus._id">
              <div class="card border-dark mb-3" style="max-width: 20rem;">
                  <div class="card-body">
                      <img src="../../src/assets/MenuPhoto/Cappu.png" class="card-img-top" alt="เมนูคาปู">
                      <h2 class="card-title">{{index+1 + `.`}} {{menus.CoffeeName}}</h2>
                      <p class="card-text"> {{menus.CoffeeNameTH}}</p>
                      
                  </div>
                  <div class="card-footer">
                      <h5>{{menus.PriceCoffee + ` Bath`}}</h5>
                      <a class="btn btn-primary">Buy</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
                    //   
<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name:'Home',
    components:{
        Header
    },
    data(){
        return {
            username:'',
            email:'',
            MenuList: []
        }
    },
    mounted(){
        axios.get('http://localhost:4000/api-user/user-info', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            this.username = res.data.user.username;
            this.email = res.data.user.email;
        })
    },
    created() {
    document.title = "Kwanma.brew | Home";
    let apiURL = 'http://localhost:4000/api-menu/';
    axios.get(apiURL)
    .then(res => {
        this.MenuList = res.data;
    }).catch(err => {
        console.log(err);
    })
    //user is not authorized
        if(localStorage.getItem('token') === null){
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>