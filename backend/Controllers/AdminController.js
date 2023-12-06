const User= require('../../backend/Models/UserModel')
const event= require('../../backend/Models/EventModel')
const jwt = require('jsonwebtoken');
const { count } = require('console');

const veryfilogin = async (req, res) => {
    try {

        const {email,password} = req.body

        const admindata = await User.findOne({ email: email })
        if (admindata) {

            if (admindata.is_admin == true) {
              console.log(admindata.password,password);
                if (admindata.password==password) {

                    const token = jwt.sign({ _id: admindata._id }, "adminsecret")
                    res.send({
                        token: token
                    })

                } else {
                    res.status(400).send({
                        message: 'password is incorrect'
                    })
                }
            } else {
                return res.status(400).send({
                    message: "you are not admin"
                })
            }

        } else {
            res.status(400).send({
                message: 'email is incorrect..!'
            })
        }


    } catch (error) {
        console.log(error.message);
    }
}

const usersget=async(req,res)=>{
    try {
console.log('reachhere');
      const userdata= await User.find({})
      console.log(userdata);
      if(userdata){
        res.send({
            data:userdata
        })
      }else{
        res.status(400).send({
            message:'somthing..wrong..'
        })
      }
    
    } catch (error) {
        console.log(error);
    }
}



const editget=async(req,res)=>{
    try {

        const email= req.body.email
      const userdata= await User.findOne({email:email})
      console.log(userdata);
      if(userdata){
        res.send({
            data:userdata
        })
      }else{
        res.status(400).send({
            message:'somthing..wrong..'
        })
      }
    
    } catch (error) {
        console.log(error);
    }
}

const userdelete=async(req,res)=>{
    try {
    console.log('iseleelte')

        const email= req.body.email
        const userdata= await User.deleteOne({email:email})
        if(userdata){
            res.send({
                message:'success'
            })
        }else{
            res.status(400).send({
                message:'somthing..went wrong'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}


const postedit=async(req,res)=>{
    try {

    
        const {name,email,phone,password,is_verified,ogemail} =req.body
        console.log(ogemail,email);

        const updatedata= await User.updateOne({email:ogemail},{$set:{name:name,phone:phone,email:email,password:password,is_verified:is_verified}})
        if(updatedata){
            res.send({
                message:'success'
            })
        }else{
            res.status(400).send({
                message:'somthing..wrong..'
            })
        }
        
    } catch (error) {
        console.log(error.message);
    }
}



const postevent=async(req,res)=>{
    try {

    
        const {eventname,startdate,enddate,eventurl} =req.body
        console.log(startdate,eventurl);

        const newevent= new event({
            name:eventname,
            startdate:startdate,
            enddate:enddate,
            eventurl:eventurl

        })

        const result= await newevent.save()
        if(result){
            res.send({
                message:"success"
            })
        }else{
            res.status(400).send({
                message:'somthing..wrong..'
            })
        }
        
    } catch (error) {
        console.log(error.message);
    }
}



const eventget=async(req,res)=>{
    try {
        const result= await event.find()
        for (let i = 0; i < result.length; i++) {
            if(new Date() <result[i].startdate){
                console.log('upcoming');
              await event.updateOne({_id:result[i]._id},{$set:{status:"upcoming"}})
            }else if(new Date()> result[i].startdate && new Date()< result[i].enddate){
                console.log('ongoing');

                await event.updateOne({_id:result[i]._id},{$set:{status:"ongoing"}})

            }else if(new Date()>result[i].enddate){
                console.log('completed');

                await event.updateOne({_id:result[i]._id},{$set:{status:"completed"}})
            }
        }

        const events= await event.find()
        if(events){
            res.send({
                data:events
            })
        }else{
            res.status(400).send({
                message:'somthing..wrong..'
            })
        }
        
    } catch (error) {
        console.log(error.message);
    }
}



const eventdelete=async(req,res)=>{
    try {

        const id= req.body.id
        const succ= await event.deleteOne({_id:id})
        if(succ){
            res.send({
                message:'success'
            })
        }else{
            res.status(400).send({
                message:'somthing..went wrong'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}




const eventeditget=async(req,res)=>{
    try {

        const id= req.body.id
        const succ= await event.findOne({_id:id})
        if(succ){
            res.send({
                data:succ
            })
        }else{
            res.status(400).send({
                message:'somthing..went wrong'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}



const editevent=async(req,res)=>{
    try {

    
        const {eventname,enddate,startdate,eventurl,ogid,status} =req.body
        console.log(enddate);

        const updatedata= await event.updateOne({_id:ogid},{$set:{name:eventname,eventurl:eventurl,startdate:startdate,enddate:enddate,status:status}})
        if(updatedata){
            res.send({
                message:'success'
            })
        }else{
            res.status(400).send({
                message:'somthing..wrong..'
            })
        }
        
    } catch (error) {
        console.log(error.message);
    }
}



module.exports={
    veryfilogin,
    usersget,
    userdelete,
    editget,
    postedit,
    postevent,
    eventget,
    eventdelete,
    eventeditget,
    editevent
}