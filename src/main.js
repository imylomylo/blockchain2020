import Vue from 'vue'
import App from './app/app'
import router from './app/app-routes'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')