import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return (new Date(value)).toLocaleString()
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')

