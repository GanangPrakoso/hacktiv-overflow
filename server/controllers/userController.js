const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
   static register(req, res, next) {

      let newData = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
      }

      User.create(newData)
         .then(data => {
            res.status(201).json({
               _id: data._id,
               name: data.name,
               email: data.email,
            })
         })
         .catch(err => {
            next(err)
         })
   }

   static login(req, res, next) {
      User.findOne({ email: req.body.email })
         .then(data => {
            if (data) {
               let verified = bcrypt.compareSync(req.body.password, data.password)
               if (verified) {
                  const userId = data._id
                  const token = jwt.sign({ id: userId }, process.env.SECRET)

                  res.status(200).json({
                     token,
                     name: data.name,
                     userId: data._id,
                     email: data.email,
                  })
               }
               else {
                  res.status(404).json({ msg: `email / password wrong` })
               }
            }
            else {
               res.status(404).json({ msg: `email / password wrong` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static getUser (req, res, next) {
      console.log(`masuk sini lohhhhhhhhhhhhhhh`);
      
      User.find()
         .then (data => {
            console.log(data);
            res.status(200).json(data)
         })
         .catch (err => {
            next(err)
         })
   }
}

module.exports = UserController