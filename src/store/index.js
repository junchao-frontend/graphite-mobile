import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 130424LRTTS001 焙烧cems code
// 130424LRTTS002 隧道窑 code
export default new Vuex.Store({
  state: {
    code: '130424LRTTS001' // cems设备号
  },
  getters: {
    currentCode: state => state.code
  },
  mutations: {
    getCemsCode(state,code) {
      state.code = code
    }
  },
  actions: {
  },
  modules: {
  }
})
