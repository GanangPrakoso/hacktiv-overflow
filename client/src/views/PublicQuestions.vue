<template>
  <div class="home" style=" padding-top: 80px;">
    <img
      class="mb-1"
      alt="disctractor"
      src="../assets/anime-chibi-gif-2.gif"
      style="max-width: 250px"
    />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1 style="font-family: 'Patrick Hand SC', cursive">
      <strong>Public questions</strong>
    </h1>
    
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import PublicQuestionCard from "../components/PublicQuestionCard.vue";
export default {
  components: {
    PublicQuestionCard
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  },
  created() {
    this.$store.dispatch('fetchAnswers')
    this.$store.dispatch("fetchQuestions");
  }
};
</script>
