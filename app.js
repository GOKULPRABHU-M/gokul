var data = []
const express=require("express")
const controller=require("./controller")
const app=express();
app.use(express.json());
app.post('/insert',controller.insertdata)
app.put('/update',controller.updatedata)
app.get('/read',controller.readdata)
app.get('/getallstudent',controller.getallstudent)
app.delete('/delete',controller.deletedata)
app.get('/paramscheck/:id',(req,res)=>{
    res.send(req.params.id);
})
app.get('/querycheck',(req,res)=>{
    res.send(req.query);
})
app.listen(3002);