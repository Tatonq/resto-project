<template>
<Header/>
  <h1>Profile {{ username }}</h1>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios'
export default {
    name:"Profile",
    components:{
        Header
    },
    data(){
        return {
            username:'',
        }
    },
    mounted() {
        axios.get('http://localhost:4000/api-user/user-info', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            this.username = res.data.user.username
            document.title = `${this.username} | Kwanma.brew`
        })
    },
    created() {
        if(localStorage.getItem('token') === null){
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>