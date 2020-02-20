<template>
  <div>
    <div class="nav-top" :style="{opacity:opacity}">
      <div class="title">
        <router-link to="/city">
          <p class="city active">{{city}}<i class="iconfont icon-xialasanjiao"></i></p>
        </router-link>       
        <p class="sm-title">电影</p>
      </div>
    </div>
    <router-link to="/city">
      <p class="city">{{city}}<i class="iconfont icon-xialasanjiao"></i></p>
    </router-link>   
      <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index" @click="handleImg(index)">
                <img class="banner" v-lazy="image" />
            </van-swipe-item>
      </van-swipe>
      <div class="nav">
        <div :class="opacity==1?'pos':''">
          <router-link @click="handleToggle" to="/films/nowPlaying" >正在热映</router-link>
          <router-link @click="handleToggle" to="/films/comingSoon">即将上映</router-link>
        </div>
      </div>
        <router-view></router-view>         
  </div>
</template>

<script>
export default {
  name: 'Films', 
  data() {
    return {
      images: [
        require('../assets/banner_1.jpg'),
        require('../assets/banner_2.jpg'),
      ],
      opacity:0
    }
  },
  mounted() {
    window.addEventListener("scroll",this.handle)
  },
  methods:{
    handle(){
      var height=document.documentElement.scrollTop
      var opacity=height/200;
      if(opacity>1){
        opacity=1
      }
      this.opacity=opacity
    },
    handleToggle(){
      this.isShow=!this.isShow
    }
  },
  destroyed(){
    window.removeEventListener("scroll",this.handle)
  },
  computed:{
    city(){
      return this.$store.state.city
    }
  }
}
</script>
<style scoped>
   .banner{
     width: 100%;
     height: 600px;
   }
   .nav a{
     margin:20px 120px;
     display: inline-block;     
      padding: 20px 0;
      color: black;
   }
   .nav .router-link-active{
     border-bottom: 2px solid #FF5F16;
     color: #FF5F16;
   }
   .title{
     display: flex;
   }
    .sm-title{
    margin-left: 400px;
   } 
   .nav-top{
     position: fixed;
     top: 0;left: 0;
     background: white;
     width: 100%;height: 150px;
     display: flex;
     z-index: 400;
   }
    .city{
     z-index: 400;
     position:absolute;
     top: 0;left: 10px;
     padding: 10px 30px;
     line-height: 50px;
     border-radius: 50px;
     border: 1px solid #333;
     color: white;
     background: #333;
     opacity: .5;
     font-size: 30px;
     text-align: center;
   } 
   .active{
     color: black;
     border: none;
     background: none;
   }
   .pos{
     position: fixed;
     top: 150px;
     background: white;
     width: 100%;
     z-index: 400;
   }
</style>
