const Answer = require('../models/answerModel')

class AnswerController {
   static getAll(req, res, next) {
      Answer.find()
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
         questionId: req.body.questionId,
         userId: req.currentUserId
      }

      Answer.create(newQuestion)
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {
            console.log(err.message);
            next(err)
         })
   }

   // static upvote(req, res, next) {
   //    let newUpvote = {
   //       user : req.currentUserId
   //    }
   //    Answer.findOne({ _id: req.params.answerId }).populate('upvote.user')
   //       .then(data => {            
   //          if (data) {
   //             let userSearch = data.upvote.filter (search => {
   //                return search.user._id = req.currentUserId
   //             })


   //             if (userSearch.length < 1) {
   //                Answer.updateOne({ _id: req.params.answerId }, { $push: { upvote: newUpvote} })
   //                   .then(data => {
   //                      res.status(200).json({data, msg : `upvoted`})                     
   //                   })
   //                   .catch(err => {
   //                      next(err)
   //                   })
   //             }
   //             else {
   //                res.status(400).json({msg : `you already upvoted it`})
   //             }

   //          }
   //          else {
   //             next({code: 404, msg: `data not found`})
   //          }
   //       })
   //       .catch(err => {
   //          next(err)
   //       })
   // }

   // static downvote(req, res, next) {
   //    let newDownvote = {
   //       user : req.currentUserId
   //    }
   //    Answer.findOne({ _id: req.params.answerId }).populate('downvote.user')
   //       .then(data => {            
   //          if (data) {
   //             let userSearch = data.downvote.filter (search => {
   //                return search.user._id = req.currentUserId
   //             })


   //             if (userSearch.length < 1) {
   //                Answer.updateOne({ _id: req.params.answerId }, { $push: { downvote: newDownvote} })
   //                   .then(data => {
   //                      res.status(200).json({data, msg : `downvoted`})                     
   //                   })
   //                   .catch(err => {
   //                      next(err)
   //                   })
   //             }
   //             else {
   //                res.status(400).json({msg : `you already downvoted it`})
   //             }

   //          }
   //          else {
   //             next({code: 404, msg: `data not found`})
   //          }
   //       })
   //       .catch(err => {
   //          next(err)
   //       })
   // }

   static update(req, res, next) {
      let updateData = {
         title: req.body.title,
         description: req.body.description
      }

      Answer.findOneAndUpdate({ _id: req.params.answerId }, updateData)
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
      Answer.findOne({
         _id: req.params.answerId,
         'votes.userId': req.currentUserId
      })
         .then(answer => {
            if (answer) {
               if (answer.votes[0].vote == req.body.vote) {
                  return Answer.findOneAndUpdate({_id: req.params.answerId}, {
                     $pull: {
                        'votes': {
                           userId: req.currentUserId
                        }
                     }
                  });
               } else {
                  return Answer.updateOne({
                     _id: req.params.answerId,
                     'votes.userId': req.currentUserId
                  }, {
                     '$set': {
                        'votes.$.vote': req.body.vote
                     }
                  });
               }
            } else {
               return Answer.update({
                  _id: req.params.answerId
               }, {
                  $push: {
                     votes: newVote
                  }
               })
            }
         })
         .then(answer => {
            res.status(201).json(answer);
         })
         .catch(err => {
            next(err)
         });
   }
}

module.exports = AnswerController