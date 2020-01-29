import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    questions: []
  },
  mutations: {
    SET_IS_LOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_QUESTIONS(state, items) {
      state.questions = items
    }
  },
  actions: {
    isLoginAction(context, payload) {
      context.commit('SET_IS_LOGIN', payload)
    },
    fetchQuestions({commit}) {
      axios({
        method : `GET`,
        url : `http://localhost:3000/questions`
      })
        .then(({data}) => {
          console.log(data, `ini fetch baru om`);
          commit('SET_QUESTIONS', data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  modules: {
  }
})
