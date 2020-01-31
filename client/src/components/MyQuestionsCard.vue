<template>
  <div class="row justify-content-center my-4">
    <div class="col-8 text-left">
      <div class="card shadow">
        <h6 class="card-header text-right"></h6>
        <div class="card-body">
          <h5 class="card-title">
            <strong>{{item.title}}</strong>
          </h5>
          <p class="card-text">{{item.description}}</p>
          <button class="btn btn-success" data-toggle="modal" data-target=".bd-modal-sm">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <div
            class="modal fade bd-modal-sm"
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
                      @click.prevent="editQuestion(item._id)"
                      data-dismiss="modal"
                    >Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <button class="btn btn-danger ml-3" @click="deleteQuestion(item._id)">
            <i class="fas fa-trash"></i>
          </button>

          <p class="text-right p-0 m-0">
            <strong>total upvotes: {{totalVotes}}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: `publicQuestionCard`,
  props: ["item"],
  data() {
    return {
      title: this.item.title,
      description: this.item.description
    };
  },
  methods: {
    deleteQuestion(questionId) {
      axios({
        method: `DELETE`,
        url: `http://localhost:3000/questions/${questionId}`,
        headers: {
          token: localStorage.getItem(`token`)
        }
      })
        .then(({ data }) => {
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
            title: "question deleted successfully"
          });

          console.log(data, `deleted`);
          this.$store.dispatch("fetchMyQuestions");
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    editQuestion(questionId) {
      if (this.title.length < 1 || this.description.length < 1) {
        this.title = this.item.title;
        this.description = this.item.description;
        Swal.fire({
          icon: "error",
          title: "Ngisinya yang lengkap dong bosq",
          text: "diisi yuk"
        });
      } else {
        axios({
          method: `PUT`,
          url: `http://localhost:3000/questions/${questionId}`,
          data: {
            title: this.title,
            description: this.description
          },
          headers: {
            token: localStorage.getItem(`token`)
          }
        })
          .then(({ data }) => {
            console.log(data);
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
              title: "updated in successfully"
            });
            this.$store.dispatch("fetchMyQuestions");
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    }
  },
  computed: {
    totalVotes() {
      let total = 0;
      for (let i = 0; i <= this.item.votes.length - 1; i++) {
        total += this.item.votes[i].vote;
      }
      return total;
    }
  }
};
</script>

<style>
</style>