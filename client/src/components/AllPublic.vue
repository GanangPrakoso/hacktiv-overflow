<template>
  <div class="container mt-4">
      <PublicQuestionCard v-for="item in questions" :key="item._id" :item="item" />
  </div>
</template>

<script>
import PublicQuestionCard from "./PublicQuestionCard";

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
}
</script>

<style>
</style>
