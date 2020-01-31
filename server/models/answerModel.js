const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   votes: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      vote: Number
   }],
   questionId: String,
   userId: String,
   time: { type: Date, default: Date.now }
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer