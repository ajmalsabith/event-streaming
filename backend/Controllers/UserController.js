const user= require('../../backend/Models/UserModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


var ogotp
var ogemail
const userRegister=async(req,res)=>{
    try {
        
        console.log('herere');
        const {name,email,phone,password} =req.body
        console.log(name);
        const exist= await user.findOne({email:email})
        if(exist){
            res.status(400).send({
                message:'this email already exist'
            })
        }else{
            const userdata= new user({
                name:name,
                phone:phone,
                email:email,
                password:password
            })

            const result= await userdata.save()

            if(result){
                
                const token = jwt.sign({ _id:result._id}, "usersecret")
                const message='register success'
                sendmail(email)
                return res.send({token:token,message:message})
            }else{
                res.status(400).send({
                    message:'somthing..wrong..!'
                })
            }
        }


    } catch (error) {
        console.log(error.message);
    }
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendmail(email) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user:'ajmalsabith444@gmail.com',
            pass:'roapvammbmkxzlck'
        }
    });
    const otp = generateOTP()
    ogotp = otp
    ogemail=email
    const mailOptions = {
        from:'ajmalsabith444@gmail.com',
        to:email,
        subject: 'Your OTP code',
        text: `Your OTP is ${otp}.`
    };


    console.log(otp + 'this you otp');

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {

            console.log(`Email sent: ${info.response}`);
        }
    });
}


const postotp = async (req,res) => {
    try {

            const otp = req.body.otp

         console.log(otp);

            if(otp == ogotp) {
              const update=  await user.updateOne({ email:ogemail }, { $set: { is_verified: true } })
                if (update) {
                    return res.send({
                        message: 'verification success'
                    })
                }else{
                    return res.status(400).send({
                        message: 'verification failed..!'
                    })
                }
               
            } else {
                return res.status(400).send({
                    message: 'otp is wrong'
                })
            }
        


    } 
    catch(error) {
        console.log(error.message);
    }
}



const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body
        const userdata = await user.findOne({ email: email })

        if (userdata) {
            if (userdata.is_verified) {           
                 if (userdata.password==password) {
                        const token = jwt.sign({ _id:userdata._id},"usersecret")

                        const message='login success'
                       return res.send({token:token,message:message})
               
                    } else {
                        res.status(400).send({
                            message: 'password is incorrect'
                        })
                    }

            } else {
                res.status(400).send({
                    message: 'user not verified'
                })
            }
        } else {
            res.status(400).send({
                message: 'email is incorrect'
            })
        }
    } catch (error) {
        console.log(error.message);
        }


    
}


module.exports={
    userRegister,
    postotp,
    loginUser
}