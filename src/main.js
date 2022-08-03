import Vue from 'vue'
import App from './App.vue'

import router from "./router/index";
import store from "./store/index";
import axios from 'axios';

import "./style/index.less"
import "./utils/element-ui"
import "./api/mock";

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.user.token;
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    });
  } else if (token && to.name === 'login') {
    next({
      name: 'home'
    })
  } {
    next();
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', router);
  },
}).$mount('#app')