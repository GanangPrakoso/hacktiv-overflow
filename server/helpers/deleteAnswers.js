const Question = require('../models/questionModel')
var CronJob = require('cron').CronJob

const job = new CronJob('0 0 1 * *', function () {
   Question.deleteMany({votes: {$exists : true, $size:0}})
      .then(data => {
         console.log(data);
         
      })
      .catch (err => {
         console.log(err.message);
         
      })
}, null, true, 'Asia/Jakarta')

module.exports = job