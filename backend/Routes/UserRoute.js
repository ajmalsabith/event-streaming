const express= require('express')
const UserRoute=express() 
const userController= require('../Controllers/UserController')
const adminController= require('../Controllers/AdminController')


UserRoute.post('/register',userController.userRegister)
UserRoute.post('/otp',userController.postotp)
UserRoute.post('/login',userController.loginUser)
UserRoute.get('/eventget',adminController.eventget)


module.exports = UserRoute