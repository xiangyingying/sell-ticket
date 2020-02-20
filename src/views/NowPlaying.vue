<template>
    <div>       
        <list-item class="item" :data="item" v-for="item of subjects" :key="item.id">
                <div slot="icon" class="icon">
                    <p>购票</p>
                </div>
        </list-item>
    </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
    export default {
        name:"NowPlaying",
        data(){
            return{
                subjects:[]
            }
        },
        components:{
            ListItem
        },
        mounted(){
            this.axios.get('/movie/in_theaters').then(res=>{
            this.subjects=res.data.subjects
            })
        }
    }
</script>

<style  scoped>
   .item{
            margin-top: 20px;
            margin-left: 20px;
            position: relative;
        }
    .router-link-active{
            border-bottom: 2px solid #FF5F16;
            color: #FF5F16;
        }
    .icon{
        position: absolute;
        top: 50px;right: 50px;
        border: 1px solid  #FF5F16;
        color: #FF5F16;
        width: 120px;height: 60px;
        text-align: center;
    }
    .icon p{
        line-height:0;
    }
</style>