import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/config.js'
import axios from 'axios'
axios.interceptors.request.use(function (config) {
  store.state.isLoading = true;
  return config;
});
axios.interceptors.response.use(function (response) {
  store.state.isLoading = false;
  return response;  
});
Vue.config.productionTip = false
Vue.prototype.axios=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
