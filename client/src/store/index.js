import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    questions: [],
    answers: [],
    myQuestions: [],
  },
  mutations: {
    SET_IS_LOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_QUESTIONS(state, items) {
      state.questions = items
    },
    SET_ANSWERS(state, items) {
      state.answers = items
    },
    SET_MY_QUESTIONS(state, items) {
      state.myQuestions = items
    },
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
    },
    fetchAnswers ({commit}) {
      axios({
        method : `GET`,
        url : `http://localhost:3000/answers`
      })
        .then(({data}) => {
          console.log(data, `ini answeeeeeeeeersss`);
          commit('SET_ANSWERS', data)
        })
        .catch (err => {
          console.log(err.message);
        })
    },
    fetchMyQuestions({commit}) {
      console.log('jalan nih bos');  
      axios({
        method : `GET`,
        url: `http://localhost:3000/questions/myquestions`,
        headers : {
          token : localStorage.getItem(`token`)
        }
      })
        .then(({data}) => {
          console.log(data, `nih datanyaaa`);
          
          commit('SET_MY_QUESTIONS', data)
        })
        .catch(err => {
          console.log(`lho errorrrrrrrr`);
          
          console.log(err.message);         
        })
    }
  },
  modules: {
  }
})
