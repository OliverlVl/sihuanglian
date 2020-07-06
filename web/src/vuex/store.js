import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // token:{}
    user: {}
}

const mutations = {
    // setToken (state,token) {
    //     state.token = token
    // }
    isLogin(state, user) {
        state.user = user
    }
}


export default new Vuex.Store({
    state,
    mutations
})
