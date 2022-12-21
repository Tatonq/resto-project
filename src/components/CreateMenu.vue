<template>
<Header/>
      <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">เพิ่มรายการเครื่องเดิม</h3>
            <form @submit.prevent="SubmitFrom" enctype="multipart/form-data">
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

                <!-- <label for="forFile" class="form-label" >รูปเมนู</label>
                <input class="form-control" type="file" ref="fileImg1" name="fileImg" @change="Img"> -->

                <div class="form-group mt-3">
                    <button class="btn btn-success btn-block">สร้างเมนู</button>
                    <!-- <button class="btn btn-success btn-block">อัพรูปภาพ</button> -->
                </div>
            </form>
            <form @submit.prevent="sendFile" enctype="multipart/form-data">

            <div v-if="message" :class="`alert ${error ? 'alert-danger' : 'alert-success'}`">
              <div class="message-bodyu">{{message}}</div>
            </div>

            <div class="field">
            <div class="form-group mt-3">
                    <label for="formFile" class="form-label">รูปเมนู</label>
                    <input class="form-control" type="file" ref="file" name="fileImg" @change="selecFile">
                    <hr>
                    <div class="card border-dark mb-3" style="max-width: 18rem;">
                      <div class="card-body">
                        <!-- <img :src="ImgMenu" class="card-img-top img-fluid"> -->
                        <h2 class="card-title">{{menus.CoffeeName}}</h2>
                        <p class="card-text"> {{menus.CoffeeNameTH}}</p>
                      </div>
                      <div class="card-footer">
                        <h5 v-if="menus.PriceCoffee !== 0">{{menus.PriceCoffee + ` Bath`}}</h5>
                        <a class="btn btn-primary">Buy</a>
                      </div>
                    </div>
            </div>
            </div>

            <div class="field">
              <button class="btn btn-primary">Send</button>
            </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue'
export default {
    name:'CreateMenu',
    data(){
      return {
        menus:{
          CoffeeName:'',
          CoffeeNameTH:'',
          PriceCoffee:0
        },
        MenuImg:'',
        message:'',
        error:''
      }
    },
    methods:{
      async SubmitFrom(){
        let apiURL = "http://localhost:4000/api-menu/create-menu";
        await axios.post(apiURL, this.menus).then(() => {
          this.$router.push('/list-menu')
          this.menus = {
            CoffeeName:'',
            CoffeeNameTH:'',
            PriceCoffee:0
          }
        }).catch(error => {
          console.log(error);
        })
      },
      selecFile(){
        const file = this.$refs.file.files[0]
        const allowedType = ["image/jpeg", "image/png", "image/gif"];
        const MAX_SIZE = 3000000;
        const tooLarge = file.size > MAX_SIZE;

        if(allowedType.includes(file.type) && !tooLarge){
        this.MenuImg = file
        this.error = false;
        this.message = '';
        } else {
          this.error = true;
          this.message = tooLarge ? `Toolarge. Max size is ${MAX_SIZE/1000000}MB` : "Only images are allowed";

        }
      },
      async sendFile(){
        const formData = new FormData();
        formData.append('file', this.MenuImg)
        try {
          await axios.post("http://localhost:4000/api-menu/create-img", formData)
          this.message = "File has been uploaded";
          this.file = "";
          this.error = false;
        } catch(error) {
          this.message = error.response.data.error;
          this.error = true;
        }
      }
    },
    components:{
        Header
    },
    created() {
      document.title = "Kwanma.brew | Create Menu"
        if(localStorage.getItem('token') === null){
            this.$router.push('/login');
        }
    }
  
}
</script>

<style>

</style>