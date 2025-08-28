const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
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
app.post('/verify', (req, res) => {
    let token = req.body.token;
    if (!token) return res.send("token expired")
    jwt.verify(token, "SECRETKEY", (err, decoded) => {
        if(err) 
            {res.send("invalid");}
        else
        {
        console.log(decoded);
        res.send("verify")}
    })
})
app.listen(3004);