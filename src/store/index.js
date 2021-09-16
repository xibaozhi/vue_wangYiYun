import Vue from 'vue'
import Vuex from 'vuex'

// import types from './types'
import music from './modules/play'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    music
  }
})
