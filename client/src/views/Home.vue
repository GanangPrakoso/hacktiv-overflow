<template>
  <div class="container-fluid" style=" padding-top: 40px; background-color: whitesmoke">
    <img
      src="https://66.media.tumblr.com/079d96a2d46ccda38c2d892b191ea482/tumblr_ocu6d9hxFK1s2kirpo3_640.gifv"
      alt
      style="width: 100%"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import PublicQuestionCard from "../components/PublicQuestionCard.vue";
export default {
  name: "home",
  components: {
    HelloWorld,
    PublicQuestionCard
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  },
  created() {
    this.$store.dispatch("fetchQuestions");
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0
}
</style>