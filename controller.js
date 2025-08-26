var data=[];
function insertdata(req, res) {
    check = data.find(el => el.rollno == req.body.rollno)
    if (!check) {
        data.push(req.body);
        console.log(data);
        console.log("[INFO] inserted succesfully")
        res.send("inserted succesfully")
    } else {
        console.log("[INFO] inserted succesfully")
        res.send("data exist")
    }


};

function updatedata(req, res) {
    data = data.map((el) => {
        if (req.body.rollno == el.rollno)
            return req.body;
        return el;
    })
    res.send("updated succesfully")
};

function readdata(req, res) {
    let d = req.body;
    if (req.body) {
        let ans = data.find(el => d.rollno == el.rollno);
        if (ans)
            res.send(ans);
        res.send("roll no not matched")
    } else {
        res.send(data);
    }

};

function getallstudent(req, res) {
    console.log("[INO]getting all student")
    res.send(data)
}

function deletedata(req, res) {
    if (req.body) {
        d = data.filter(s => s.rollno != req.body.rollno);
        req.statusCode = 200;
        if (d.length != data.length) {
            data = d;
            res.end("succefully deleted");
        } else
            res.end("given not available");
    } else {

        res.end("give correct data");
    }
}
module.exports={insertdata,updatedata,readdata,deletedata,getallstudent}