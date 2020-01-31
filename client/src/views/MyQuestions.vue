<template>
  <div class="home" style=" padding-top: 80px;">
    <img class="mb-1" alt="disctractor" src="../assets/giphy.webp" style="max-width: 250px" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1 style="font-family: 'Patrick Hand SC', cursive">
      <strong>my questions?</strong>
    </h1>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target=".bd-example-modal-sm"
    >
      Post question
      <i class="fas fa-plus-circle ml-1"></i>
    </button>
    
    <div
      class="modal fade bd-example-modal-sm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="mx-4 my-3">
            <form>
              <input
                type="text"
                class="form-control my-4"
                placeholder="Enter title"
                v-model="title"
              />
              <input
                type="text"
                class="form-control my-4"
                placeholder="Enter your question"
                v-model="description"
              />
              <button
                type="submit"
                class="btn btn-primary mt-3"
                @click.prevent="addQuestion"
                data-dismiss="modal"
              >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-4">
      <MyQuestionsCard v-for="item in myQuestions" :key="item._id" :item="item" />
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import MyQuestionsCard from "../components/MyQuestionsCard.vue";
export default {
  name: `MyQuestions`,
  data() {
    return {
      title: "",
      description: ""
    };
  },
  components: {
    MyQuestionsCard
  },
  methods: {
    addQuestion() {
      if (this.title.length < 1 || this.description.length < 1) {
        Swal.fire({
          icon: "error",
          title: "Kurang lengkap nih isiannya",
          text: "isi kolom title dan description dong bos"
        });
      } else if (!localStorage.getItem(`token`)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You're not logged in yet?",
          footer: "please login first"
        });
        this.$router.push(`/login`);
      } else {
        axios({
          method: `POST`,
          url: `http://localhost:3000/questions`,
          data: {
            title: this.title,
            description: this.description
          },
          headers: {
            token: localStorage.getItem(`token`)
          }
        })
          .then(({ data }) => {
            (this.title = ""), (this.description = "");
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              onOpen: toast => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              }
            });

            Toast.fire({
              icon: "success",
              title: "question has been sent!"
            });
            this.$store.dispatch("fetchMyQuestions");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  computed: {
    myQuestions() {
      return this.$store.state.myQuestions;
    }
  },
  created() {
    this.$store.dispatch("fetchMyQuestions");
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem(`token`)) {
      next();
    } else {
      Swal.fire("Have you logged in yet?", "sign in dulu dong bos", "question");
      next("/login");
    }
  }
};
</script>

<style>
</style>
