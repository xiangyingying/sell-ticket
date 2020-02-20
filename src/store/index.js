import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
function getCity(){
  let defaultCity="北京";
  if(localStorage.getItem("cities")){
    defaultCity=localStorage.getItem("cities")
  }
  return defaultCity
}
export default new Vuex.Store({
  state: {
    isLoading:true,
    city:getCity()
  },
  mutations: {
    toggleCity(state,city){
      state.city=city
    }
  },
  actions: {
    changeCity(ctx,city){
      ctx.commit("toggleCity",city)
      localStorage.setItem("cities",city)
    }
  },
  modules: {
  }
})
