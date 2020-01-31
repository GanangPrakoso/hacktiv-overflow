<template>
  <div class="card text-black bg-light mx-3 my-3 col-3 p-0 shadow" style="max-width: 18rem">
    <div class="card-header">Total vote: {{totalVotes}}</div>
    <div class="card-body">
      <h5 class="card-title mb-3"><strong>{{item.title}}</strong></h5>
      <p
        class="card-text mb-3 "
      >{{item.description}}</p>
      <a href="#" class="btn btn-success btn-sm" @click.prevent="upvote(item._id)">
        <i class="fas fa-chevron-up"></i>
      </a>
      <a href="#" class="btn btn-danger ml-2 btn-sm" @click.prevent="downvote(item._id)">
        <i class="fas fa-chevron-down"></i>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   name : `Reply`,
   data () {
      return {

      }
   },
   props : ['item'],
   methods : {
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
          console.log(`upvoted`);
          this.$store.dispatch('fetchAnswers')         
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
          console.log(`downvoted`);
          this.$store.dispatch('fetchAnswers')         
        })
        .catch (err => {
          console.log(err.message);          
        })
    }
   },
   computed : {
    totalVotes () {
      let total = 0
      for (let i=0; i<=this.item.votes.length-1; i++) {
        total += this.item.votes[i].vote
      }
      return total
    }
  }
};
</script>

<style>
</style>