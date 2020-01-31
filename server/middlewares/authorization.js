const Question = require ('../models/questionModel')

module.exports = (req, res, next) => {
   Question.findOne({_id : req.params.questionId})
      .then(data => {
         if (data) {
            if (data.userId == req.currentUserId) {
               next()
            }
            else {
               res.status(401).json({msg : `you're not allowed to make this request`})
            }
         }
         else {
            res.status(404).json({msg: `data not found`})
         }
      })
      .catch(err => {
         next(err)
      })
}