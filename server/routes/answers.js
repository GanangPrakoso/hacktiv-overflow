const express = require ('express')
const router = express.Router()
const AnswerController = require ('../controllers/answerController')
const authentication = require ('../middlewares/authentication')

router.get('/', AnswerController.getAll)
router.post('/', AnswerController.add)
router.put('/:answerId', authentication, AnswerController.update)
router.patch('/:answerId', authentication, AnswerController.vote)

module.exports = router