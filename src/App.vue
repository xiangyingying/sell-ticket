<template>
  <div id="app">
    <transition>
      <router-view v-if="isShow"/>
    </transition>  
    <van-loading size="24px" type="spinner" color="#1989fa" v-if="this.$store.state.isLoading">加载中...</van-loading>
  </div>
</template>
<script>
export default {
  name:"App",
  data(){
    return{
      isShow:true
    }
  },
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.van-loading{
  margin-left: 350px;
  margin-top: 300px;
}
.v-leave-active,.v-enter-active{
    transition:opacity 1s
  }
  .v-leave-to{
    opacity: 0;
  }
  .v-enter{
    opacity: 0;
  }
</style>
