const express= require('express')
const cors= require('cors')
const { default: mongoose } = require('mongoose')
const app= express()
const UserRoute= require('./Routes/UserRoute')
const AdminRoute = require('./Routes/AdminRoute')
const bodyParser= require("body-parser")



app.use(cors({
    origin:['http://localhost:4200']
}))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use('',UserRoute)
app.use('/admin',AdminRoute)


mongoose.connect('mongodb://127.0.0.1:27017/Event-project')
.then(() => {
  console.log('Database connected successfully');
})
.catch((error) => {
  console.error('Error connecting to database:', error);
});


app.listen(5000,()=>{
    console.log('server started')
})