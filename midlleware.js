const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(()=>console.log("connected"))
.catch(err=>console.log(err));

const sschema=new mongoose.Schema({
    rollno:String,
    name : String,
    dept:String,
    age:Number
});
const student=mongoose.model("student",sschema);
app.post('/insert',middleware,async(req,res)=>{
    const newstudent=new student(req.body);
    try{
        await newstudent.save();
        res.status(201).send("INSERTED")
    }
    catch(error){
        res.status(404).send("error")
    }
})
function middleware(req,res,next)
{
    const{rollno,name,dept,age}=req.body
    if(rollno&&name&&dept&&age){
    console.log("mid");
    next();}
    else{
    res.send("missing require params");
    }
}
app.listen(8001);