<template>
    <div>
        <list-item class="item" :data="item" v-for="item of subjects" :key="item.id"></list-item>
    </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
    export default {
        name:"ComingSoon",
        data(){
            return{
                subjects:[]
            }
        },
        components:{
            ListItem
        },
        mounted() {
            this.axios.get('/movie/coming_soon').then(res=>{
                this.subjects=res.data.subjects
            })
        },
    }
</script>

<style scoped>
        .item{
            margin-top: 20px;
            margin-left: 20px;
        }
</style>