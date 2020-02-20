<template>
    <div class="container">
        <div class="nav" :style="{opacity:opacity}">  
           <button @click="handleBack" class="active"><i class="iconfont icon-fanhui"></i></button>         
           <p class="nav-title">{{data.title}}</p> 
        </div>   
         <button @click="handleBack"><i class="iconfont icon-fanhui"></i></button>      
        <img class="bg" :src="data.images.small" alt="">
        <div class="detail">
            <p class="title">{{data.title}}</p>
            <p><span v-for="item of data.genres" :key="item">{{item}} | </span></p>
            <p>{{data.mainland_pubdate}}上映</p>
            <p><span>{{data.countries[0]}}</span> | {{data.durations[0]}}</p>
            <p class="summary">{{data.summary}}</p>
        </div>
        <div class="author">
            <p>演职人员</p>
            <div class="wrapper">
                <div class="swiper-img">
                    <div v-for="(item,index) of data.casts" :key="index">
                        <img :src="item.avatars.small" alt="">
                        <p >{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div> 
        <div class="photo">
            <div class="phone-title">
                <span>剧照</span>
                <span>全部({{data.clips.length}}) ></span>
            </div>
            <div class="wrapper">
                <div class="swiper-img">
                    <img v-for="item of data.clips" :key="item.id" :src="item.small" alt="">
                </div>
            </div>
        </div>
        <div class="btn">选座购票</div>
    </div>
</template>

<script>
    export default {
        name:"Film",
        data(){
            return{
                data:{},
                opacity:0
            }
        },
         computed:{
            id(){
                return this.$route.query.id
            }
        }, 
        mounted() {
             var id=this.id
            this.axios.get(`/movie/subject/${id}`).then(res=>{
                this.data=res.data
            }) 
            window.addEventListener("scroll",this.handle)
        },
        methods:{
            handleBack(){
                this.$router.back()
            }, 
            handle(){
                var height=document.documentElement.scrollTop              
                var opacity=height/100;
                if(opacity>1){
                    opacity=1
                }
                this.opacity=opacity 
            } 
        },
        destroyed(){
            window.removeEventListener("scroll",this.handle)
        }  
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 500px;
    }
    .title{
        font-size:50px;
    }
    .detail{
        padding: 10px 20px;
        font-size: 35px;
    }
    p{
        margin: 10px;
    }
    .summary{
        margin-top: 20px;
    }
    button{
        position: absolute;
        top: 10px;left: 10px;
        z-index: 200;
        width: 100px;height: 100px;
        border-radius: 50%;
        opacity: .5;
        border: none;
    }
    .swiper-img img{
        width: 200px;height: 250px;
    }
    .wrapper{
        overflow-x: auto;
        overflow-y: hidden;
        border: 1px solid #eeeeee;
    }
    .swiper-img{
        display: grid;
        grid-template-columns: repeat(5,200px);
        gap: 50px;
    } 
    .nav{
        width: 100%;line-height: 100px;
        background:white;
        position: fixed;
        top: 0;left: 0;
        display: flex;
      }
     .nav-title{
        margin-left: 360px;
    } 
    .container{
         height: 2200px;
    }
    .active{
        background: none;
    }
    .phone-title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }
    .author,.photo{
        padding: 20px;
    }
    .photo{
        height:500px;
    }
    .btn{
        position: fixed;
        bottom: 0;
        background: #FF5F16;
        width: 100%;
        line-height: 150px;
        color: white;
        text-align: center;
        font-size: 50px;
    }
</style>