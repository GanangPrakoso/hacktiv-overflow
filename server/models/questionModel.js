const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
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
   userId: {
      type: `ObjectId`,
      ref: `User`,
      required: true,
   },
   time: { type: Date, default: Date.now }
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question