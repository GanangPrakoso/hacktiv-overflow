<template>
  <div class="container">
    <div class="row justify-content-center my-4">
      <div class="col-8 text-left">
        <div class="card shadow">
          <h6 class="card-header text-right"></h6>
          <div class="card-body">
            <h5 class="card-title">
              <strong>{{question.title}}</strong>
            </h5>
            <p class="card-text">{{question.description}}</p>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
            >Reply</button>

            <!-- <button class="btn btn-primary" @click="seeThread(item._id)">Answer</button> -->
            <a href="#" class="btn btn-success ml-3 btn-sm" @click.prevent="upvote(question._id)">
              <i class="fas fa-chevron-up"></i>
            </a>
            <a href="#" class="btn btn-danger ml-2 btn-sm" @click.prevent="downvote(question._id)">
              <i class="fas fa-chevron-down"></i>
            </a>
            <p class="text-right p-0 m-0">
              <strong>total upvotes: {{totalVotes}}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2 style="font-family: 'Patrick Hand SC', cursive">
      <strong>Replies</strong>
    </h2>

    <div class="container">
      <div class="row justify-content-center">
        <Reply v-for="item in questionAnswers" :key="item._id" :item="item" />
      </div>
    </div>

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
                v-model="answerTitle"
              />
              <input
                type="text"
                class="form-control my-4"
                placeholder="Enter your answer"
                v-model="answerDescription"
              />
              <button
                type="submit"
                class="btn btn-primary mt-3"
                @click.prevent="addAnswer"
                data-dismiss="modal"
              >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Reply from "./Reply";
import Swal from "sweetalert2";

export default {
  name: `QuestionDetail`,
  components: {
    Reply
  },
  data() {
    return {
      question: [],
      answerTitle: "",
      answerDescription: ""
    };
  },
  methods: {
    getQuestion() {
      axios({
        method: `GET`,
        url: `http://localhost:3000/questions/${this.$route.params.questionId}`
      })
        .then(({ data }) => {
          this.question = data
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    addAnswer() {
      if (this.answerTitle.length < 1 || this.answerDescription.length < 1) {
        Swal.fire({
          icon: "error",
          title: "Kurang lengkap nih isiannya",
          text: "isi kolom title dan jawabannya dong bos",
        })
      }
      else
      if (!localStorage.getItem(`token`)) {
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
          url: `http://localhost:3000/answers`,
          data: {
            title: this.answerTitle,
            description: this.answerDescription,
            questionId: this.$route.params.questionId
          }
        })
          .then(({ data }) => {
            (this.answerTitle = ""), (this.answerDescription = "");
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
              title: "reply has been sent!"
            });
            this.$store.dispatch("fetchAnswers");
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    upvote (questionId) {
      axios({
        method : `PATCH`,
        url: `http://localhost:3000/questions/${questionId}`,
        data : {
          vote : 1
        },
        headers: {
          token : localStorage.getItem(`token`)
        }
      })
        .then(_ => {
          this.getQuestion()
        })
        .catch (err => {
          console.log(err.message);          
        })
    },
    downvote (questionId) {
      axios({
        method : `PATCH`,
        url: `http://localhost:3000/questions/${questionId}`,
        data : {
          vote : -1
        },
        headers: {
          token : localStorage.getItem(`token`)
        }
      })
        .then(_ => {
          this.getQuestion()
        })
        .catch (err => {
          console.log(err.message);          
        })
    }
  },
  computed: {
    questionAnswers() {
      let arr = [];
      let answers = this.$store.state.answers;
      for (let i = 0; i <= answers.length - 1; i++) {
        if (answers[i].questionId == this.$route.params.questionId) {
          arr.push(answers[i]);
        }
      }
      return arr;
    },
    totalVotes () {
      let total = 0
      for (let i=0; i<=this.question.votes.length-1; i++) {
        total += this.question.votes[i].vote
      }
      return total
    }
  },
  created() {
    this.$store.dispatch('detailAnswer')
    this.getQuestion();
  }
};
</script>

<style>
</style>
