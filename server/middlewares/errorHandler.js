module.exports = (err, req, res, next) => {
   let status = 500
   let message = err.message
   let errors
   // console.log(err);
   
   if (err.code == 404) {
      res.status(404).json({message: err.msg})
   }

   if (err.name === 'ValidationError') {
      status = 400
      message = 'Validation Error'
      error = err.message
      res.status(status).json({
         msg: message, error
      })
   }
   else if (err.name === `MongoError`) {
      status = 400
      message = `Email already used`
      res.status(status).json({ msg: message })
   }
   else {
      res.status(status).json({
         msg: message
      })
   }

}