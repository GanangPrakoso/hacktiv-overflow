const Question = require('../models/questionModel')

class QuestionController {
   static getAll(req, res, next) {
      Question.find().populate('userId')
         .then(data => {
            res.status(200).json(data)
         })
         .catch(err => {
            console.log(err.message);
            next(err)
         })
   }

   static add(req, res, next) {
      let newQuestion = {
         title: req.body.title,
         description: req.body.description,
         userId: req.currentUserId
      }

      Question.create(newQuestion)
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {
            console.log(err.message);
            next(err)
         })
   }

   static deleteQuestion(req, res, next) {
      Question.findOneAndDelete({ _id: req.params.questionId })
         .then(data => {
            if (data) {
               res.status(200).json(data)
            }
            else {
               next({ code: 404, msg: `data not found` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   // static upvote(req, res, next) {
   //    let newUpvote = {
   //       user: req.currentUserId
   //    }
   //    Question.findOne({ _id: req.params.questionId }).populate('upvote.user')
   //       .then(data => {
   //          if (data) {
   //             let userSearch = data.upvote.filter(search => {
   //                return search.user._id = req.currentUserId
   //             })

   //             if (userSearch.length < 1) {
   //                Question.updateOne({ _id: req.params.questionId }, { $push: { upvote: newUpvote } })
   //                   .then(data => {
   //                      res.status(200).json({ data, msg: `upvoted` })
   //                   })
   //                   .catch(err => {
   //                      next(err)
   //                   })
   //             }
   //             else {
   //                Question.updateOne({ _id: req.params.questionId }, { $pull: { upvote: newUpvote } })
   //                   .then (data => {
   //                      res.status(200).json({data, msg : `upvote back to 0`})
   //                   })
   //                   .catch (err => {
   //                      next(err)
   //                   })
   //             }

   //          }
   //          else {
   //             next({ code: 404, msg: `data not found` })
   //          }
   //       })
   //       .catch(err => {
   //          next(err)
   //       })
   // }

   // static downvote(req, res, next) {
   //    let newDownvote = {
   //       user: req.currentUserId
   //    }
   //    Question.findOne({ _id: req.params.questionId }).populate('downvote.user')
   //       .then(data => {
   //          if (data) {
   //             let userSearch = data.downvote.filter(search => {
   //                return search.user._id = req.currentUserId
   //             })


   //             if (userSearch.length < 1) {
   //                Question.updateOne({ _id: req.params.questionId }, { $push: { downvote: newDownvote } })
   //                   .then(data => {
   //                      res.status(200).json({ data, msg: `downvoted` })
   //                   })
   //                   .catch(err => {
   //                      next(err)
   //                   })
   //             }
   //             else {
   //                Question.updateOne({ _id: req.params.questionId }, { $pull: { downvote: newDownvote } })
   //                   .then (data => {
   //                      res.status(200).json({data, msg : `downvote back to 0`})
   //                   })
   //                   .catch (err => {
   //                      next(err)
   //                   })
   //             }

   //          }
   //          else {
   //             next({ code: 404, msg: `data not found` })
   //          }
   //       })
   //       .catch(err => {
   //          next(err)
   //       })
   // }

   static update(req, res, next) {
      console.log(`masuk siniiiii`);
      
      let updateData = {
         title: req.body.title,
         description: req.body.description
      }

      Question.findOneAndUpdate({ _id: req.params.questionId }, updateData)
         .then(data => {
            if (data) {
               res.status(201).json({ data, msg: `updated` })
            }
            else {
               next({ code: 404, msg: `data not found` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static vote(req, res, next) {
      const newVote = {
         vote: req.body.vote,
         userId: req.currentUserId
      };
      Question.findOne({
         _id: req.params.questionId,
         'votes.userId': req.currentUserId
      })
         .then(question => {
            if (question) {
               const indexOfUser = question.votes.findIndex(el => el.userId.toString() == req.currentUserId)
               if (question.votes[indexOfUser].vote == req.body.vote) {
                  return Question.findOneAndUpdate({_id: req.params.questionId}, {
                     $pull: {
                        'votes': {
                           userId: req.currentUserId
                        }
                     }
                  });
               } else {
                  return Question.updateOne({
                     _id: req.params.questionId,
                     'votes.userId': req.currentUserId
                  }, {
                     '$set': {
                        'votes.$.vote': req.body.vote
                     }
                  });
               }
            } else {
               return Question.update({
                  _id: req.params.questionId
               }, {
                  $push: {
                     votes: newVote
                  }
               })
            }
         })
         .then(question => {
            res.status(201).json(question);
         })
         .catch(err => {
            next(err)
         });
   }

   static getOne (req, res, next) {
      Question.findOne({_id: req.params.questionId})
         .then(data=> {
            res.status(200).json(data)
         })
         .catch(err => {
            next(err)
         })
   }

   static getMyQuestions (req, res, next) {
      console.log(`jalan lhooooooo`);
      
      console.log(req.currentUserId, `iniiiiiiii`);
      
      Question.find({userId: req.currentUserId})
         .then(data => {
            console.log(data);         
            res.status(200).json(data)
         })
         .catch(err => {
            console.log(err.message)          
            next(err)
         })
   }
}

module.exports = QuestionController
