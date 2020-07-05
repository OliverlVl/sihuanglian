import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const login = {

  state: {

    //这里放全局参数

    token:{}

  },

  mutations: {

    //这里是set方法

    setToken(state,token){

            state.token = token

        }

  },

  

  actions: {

        setToken ({commit}, data) {
        commit('setToken', data);
    },

  },

  modules: {

//这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里

  }

}

