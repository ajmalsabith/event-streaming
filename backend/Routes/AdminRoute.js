const express= require('express')
const adminController= require('../Controllers/AdminController')

const adminRoute=express() 

adminRoute.post('/login',adminController.veryfilogin)
adminRoute.get('/users',adminController.usersget)
adminRoute.post('/delete',adminController.userdelete)
adminRoute.post('/eventdelete',adminController.eventdelete)
adminRoute.post('/editget',adminController.editget)
adminRoute.post('/editpost',adminController.postedit)
adminRoute.post('/eventadd',adminController.postevent)
adminRoute.get('/eventget',adminController.eventget)
adminRoute.post('/eventeditget',adminController.eventeditget)
adminRoute.post('/posteditevent',adminController.editevent)




module.exports= adminRoute