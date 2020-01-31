const express = require ('express')
const router = express.Router()
const userRouter = require ('./users')
const questionRouter = require ('./questions')
const answerRouter = require ('./answers')

router.use('/users', userRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)

module.exports = router