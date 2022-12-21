<template>
<Header/>
<div class="container-sm">
        <h1>การจัดการเมนู</h1>
    <div class="row justify-content-md-center">
        <div class="col col-lg-10">
                hello
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>รูปภาพ</th>
                        <th>ชื่อเมนูภาษาอังกฤษ</th>
                        <th>ชื่อภาษาไทย</th>
                        <th>ราคา</th>
                        <th>การจัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(menus, index) in MenuList" :key="menus._id">
                        <td>{{index+1}}</td>
                        <td>{{ menus.MenuImg }}</td>
                        <td>{{menus.CoffeeName}}</td>
                        <td>{{menus.CoffeeNameTH}}</td>
                        <td>{{menus.PriceCoffee}}</td>
                        <td> 
                            <router-link :to="{name: 'Edit', params: { id: menus._id }}" class="btn btn-success ">แก้ไข</router-link>
                            <button v-on:click="deleteMenu(menus._id)" class="btn btn-danger">ลบเมนู</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';
import Header from './Header.vue'
export default {
    name:'Menu',
    components: {
        Header
    },
    data(){
        return {
            MenuList: []
        }
    },
    created() {
        document.title = "Kwanma.brew | Menu";
        let apiURL = 'http://localhost:4000/api-menu/';
        axios.get(apiURL)
        .then(res => {
        this.MenuList = res.data;
        console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
        if(localStorage.getItem('token') === null){
            this.$router.push('/login');
        }
    },
    // /delete-menu/:id
    methods:{
        async deleteMenu(id) {
            let apiURL = `http://localhost:4000/api-menu/delete-menu/`
            let indexOfArrayItem = this.MenuList.findIndex(i => i._id === id);
            if(window.confirm("ต้องการลบรายการอาหารนี้หรือไม่ ?")) {
                await axios.delete(apiURL + id).then(() => {
                    this.MenuList.splice(indexOfArrayItem, 1);
                }).catch(err => {
                    console.warn(err);
                })
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;1,300;1,700&display=swap');
div{
    font-family: 'Sarabun', sans-serif;
}
</style>
