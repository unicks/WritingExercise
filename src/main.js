import Vue from 'vue'
import App from './App.vue'
import VueYoutube from 'vue-youtube'
import { createProvider } from './vue-apollo'
import './css/mystyles.css'

Vue.use(VueYoutube)
Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  render: function (h) { return h(App) }
}).$mount('#app')
