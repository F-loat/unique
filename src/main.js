import Vue from 'vue'
import store from './vuex/store'
import router from './router/'
import uniqueCake from './unique-cake'

const unique = Vue.extend({
  components: { uniqueCake },
  store
})

router.start(unique, '#unique')
