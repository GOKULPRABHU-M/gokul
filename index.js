const express=require("express");
const mongoose=require("mongoose");
const app=express();
const jwt = require("jsonwebtoken");
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
app.post('/login', (req, res) => {
    let {
        username,
        password
    } = req.body;
    if (username == 'gokul' && password == "123") {
        let token = jwt.sign({
            username    
        }, "SECRETKEY", {
            expiresIn: '1h'
        });
        res.send(token)
    }

});
app.post('/insert',middleware,insertdata)
async function insertdata(req,res){
    const dup=await student.findOne({rollno : req.body.rollno});
    console.log(dup);
    if(!dup){
    const newstudent=new student(req.body);
    try{
        await newstudent.save();
        res.status(201).send("INSERTED")
    }
    catch(error){
        res.status(404).send("error")
    }}
    else{
        res.send("duplicate")
    }

}
function middleware(req,res,next)
{
    let token = req.body.token;
        if (!token) return res.send("token expired")
        jwt.verify(token, "SECRETKEY", (err, decoded) => {
            if(err) 
                {res.send("invalid");}
            else
            {
            console.log(decoded);
            next();}
        })
}
app.get('/getallstudent',middleware,getallstudent)
async function getallstudent(req,res){
    try{
        const data=await student.find();
        res.send(data);
    }
    catch(error)
    {
        res.send("error");
    }
}
app.get('/getstudentbyroll',middleware,getstudentbyroll)
async function getstudentbyroll(req,res){
    try{
        const data=await student.findOne({rollno : req.body.rollno});
        if(data)
            res.send(data);
        else
            res.send("no data")
        
    }
    catch(error)
    {
        console.log(error);
        
        res.send("error");
    }
}
app.delete('/deletestudent',middleware,deletestudent)
async function deletestudent(req,res){
    try{
        const data=await student.findOneAndDelete({rollno : req.body.rollno}); //deleteone returns how may data is deleted;
        if(data)
            res.send(data)
        else
            res.send("data not found")
    }
    catch(error)
    {
        res.send("error");
    }
}

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
app.put('/updatestudent',middleware,updatestudent)
async function updatestudent(req,res){
    const {rollno,name,dept,age}=req.body;
    try{
        const data=await student.findOneAndUpdate({rollno},{name,dept,age},{new:true}); //deleteone returns how may data is deleted;
        if(data)
            res.send("updated successfully")
        else
            res.send("data not found")
    }
    catch(error)
    {
        res.send("error");
    }
}
app.listen(3003);

