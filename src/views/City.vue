<template>
    <div>
        <div class="nav">
            <router-link to="/films/nowPlaying">
                <button class="secede">X</button>
            </router-link>          
            <p>当前城市 - 武汉</p>
        </div>
        <div class="search">
            <i class="iconfont icon-sousuo"></i>
            <input @click="handleFocus" @keydown="handleDown"
             @keyup.enter="handleEnter" v-model="keyword" type="text" placeholder="输入城市名或拼音">
            <button class="cancel" v-show="isFocus" @click="handleCancel">取消</button>
        </div>
        <div class="content" id="search-content">
            <div class="city">
                <div class="position">
                    <p>GPS定位你所在城市</p>
                    <span class="pos">武汉</span>
                </div>
                <div class="hot-city">
                    <p>热门城市</p>
                    <router-link to="/films/nowPlaying" @click.native="handleCity(item.name)"
                        v-for="item of hotCities" :key="item.id"
                    >
                        <span >{{item.name}}</span>
                    </router-link>          
                </div>
             </div>
            <van-index-bar>
                <div v-for="(item,index) of cities" :key="index">
                        <van-index-anchor :index="index"  />
                        <router-link to="/films/nowPlaying" @click.native="handleCity(value.name)"
                        v-for="value of item" :key="value.id"
                        >
                        <van-cell :title="value.name"  />
                        </router-link>               
                    </div>
            </van-index-bar>
            <div class="content-active" id="content-active" style="display:none"></div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name:"City",
        data() {
            return {
                hotCities:[],
                cities:{},
                isFocus:false,
                keyword:"",
            }
        },
        mounted() {
            this.axios.get('http://yapi.demo.qunar.com/mock/43104/film').then(res=>{
                this.hotCities=res.data.data.hotCities
                this.cities=res.data.data.cities
            })
        },
        methods:{
            handleCity(city){
                this.$store.dispatch("changeCity",city)
            },
            handleFocus(){
                this.isFocus=true;              
            },
            handleCancel(){
                this.isFocus=false;
                var contentActive=document.getElementById("content-active");
                var searchContent=document.getElementById("search-content")
                  contentActive.style.display="none";
                  searchContent.style.display="block";
                  this.keyword=""
            },
            handleEnter(){
               /*  console.log(this.keyword)    */           
                
                /* var arrCity=[]; 
                Object.keys(this.cities).forEach(item=>{
                     console.log(this.cities[item]) 
                     if(this.cities[item].name.includes("this.keyword")){
                        arrCity.push(this.cities[item].name)
                        console.log(arrCity)
                    } 
                }) */

            },
            handleDown(){
                var contentActive=document.getElementById("content-active")   
                var searchContent=document.getElementById("search-content")            
                contentActive.style.display="block";
                searchContent.style.display="none";
            }
        }
    }
</script>

<style scoped>
    /deep/ .van-index-bar__index {
        line-height: 1.1rem;
    }
    .nav{
        display: flex;
    }
    button{
        background: none;
        border: none;
    }
    .nav p{
        margin-left: 300px;
    }
         .nav,.search{
        position:fixed;
        z-index: 300;
    } 
    .nav{
        top: 0;
        background: white;
        width: 100%;
    }
    .search{
        top:100px;
    }
    .search{
        line-height: 100px;
        background: #EEE;
        width: 100%;
    }
    .search input{
        height: 50px;
        border: none;
        padding-left: 60px;
        margin-left: 40px;
        font-size: 30px;
        width: 80%;
    }
    .search input::placeholder{
        color: #999;
    }
    .search i{
         position: absolute;
        left:50px;
        color: #999;
    }
    .position{
        font-size: 30px;
    }
    .city{
        margin-left: 20px;
        margin-top: 240px;
    }
    .pos{
        padding: 20px;
        background: #EEE;
    }
    .hot-city span{
        display: inline-block;
        padding: 20px 40px;
        background: #EEE;
        margin-right: 20px;margin-top: 20px;
        color: black;
    }
    /deep/ .van-index-anchor{
        background: #eee;
        margin-top: 20px;
        line-height: 60px;
        font-size: 37px;
    }
    /deep/ .van-cell__title span{
        font-size: 35px;
        line-height: 80px;
    }
    .secede{
        color: black;
        margin-top: 40px;
    }
    .cancel{
        width: 200px;
        position: absolute;
        right: 50px;
    }
    .content-active{
        content: "";
        display: table;
        height: 100%;
        width: 100%;
        z-index: 500;
        background:white;
        position: absolute;
        top: 0px;
    }
</style>