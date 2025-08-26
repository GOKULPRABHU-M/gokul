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
app.post('/insert',async(req,res)=>{
    const newstudent=new student(req.body);
    try{
        await newstudent.save();
        res.status(201).send("INSERTED")
    }
    catch(error){
        res.status(404).send("error")
    }
})
app.get('/getallstudent',async(req,res)=>{
    try{
        const data=await student.find();
        res.send(data);
    }
    catch(error)
    {
        res.send("error");
    }
})
app.get('/getstudentbyroll',async(req,res)=>{
    try{
        const data=await student.findOne(req.body);
        if(data)
            res.send(data);
        else
            res.send("no data")
        
    }
    catch(error)
    {
        res.send("error");
    }
})
app.delete('/deletestudent',async(req,res)=>{
    try{
        const data=await student.findOneAndDelete(req.body); //deleteone returns how may data is deleted;
        if(data)
            res.send(data)
        else
            res.send("data not found")
    }
    catch(error)
    {
        res.send("error");
    }
})
app.get('/getstudentbyparams/:rollno',async(req,res)=>{
    try{
        const data=await student.findOne(req.params);
        if(data)
            res.send(data);
        else
            res.send("no data")
        
    }
    catch(error)
    {
        res.send("error");
    }
})
app.get('/getstudentbyquery',async(req,res)=>{
    try{
        const data=await student.findOne(req.query);
        if(data)
            res.send(data);
        else
            res.send("no data")
        
    }
    catch(error)
    {
        res.send("error");
    }
})
app.listen(3003);

