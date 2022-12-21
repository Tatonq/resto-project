<template>
<Header/>
      <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">แก้ไขรายการเมนู</h3>
            <form @submit.prevent="UpdateForm">
                <div class="form-group mt-3">
                    <label>ชื่อเมนู (EN)</label>
                    <input type="text" class="form-control" v-model="menus.CoffeeName" placeholder="ชื่อเมนูภาษาอังกฤษ" required>
                </div>

                <div class="form-group mt-3">
                    <label>ชื่อภาษาไทย</label>
                    <input type="text" class="form-control" v-model="menus.CoffeeNameTH" placeholder="ชื่อเมนูภาษาไทย" required>
                </div>

                <div class="form-group mt-3">
                  <label>ราคา</label>
                  <div class="input-group mb-3">
                    <input type="number" class="form-control" v-model="menus.PriceCoffee" placeholder="ราคา" required>
                    <span class="input-group-text">บาท (THB)</span>
                    </div>
                </div>

                <div class="form-group mt-3">
                    <button class="btn btn-primary btn-block">Update Menu</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name:'Edit',
    data(){
        return {
          menus: {}
        }
    },
    components:{
        Header
    },
    created(){
      document.title = "Kwanma.brew | Edit Menu"
        if(localStorage.getItem('token') === null){
            this.$router.push('/login');
        }
      let apiURL = `http://localhost:4000/api-menu/edit-menu/${this.$route.params.id}`;
      axios.get(apiURL)
      .then((res) => {
        this.menus = res.data
      })
    },
    methods: {
     async UpdateForm(){
        let apiURL = `http://localhost:4000/api-menu/update-menu/${this.$route.params.id}`;
        await axios.put(apiURL, this.menus)
        .then((res) => {
          console.log(res);
          this.$router.push('/list-menu');
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
}
</script>

<style>

</style>