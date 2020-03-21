import Vue from 'vue'
import './plugins/fontawesome'
import VueDragscroll from 'vue-dragscroll'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'cssgram/source/scss/cssgram.scss'

Vue.use(VueDragscroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
