import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return (new Date(value)).toLocaleString()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

