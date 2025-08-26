const http = require('http');
var data = []
http.createServer((req, res) => {
    if (req.method == "POST") {

        let body = "";
        req.on('data', chunck => {
            body += chunck;
        })
        req.on('end', () => {
            let finaldata = JSON.parse(body);
            data.push(finaldata);
            console.log(data);
            req.statusCode = 200;
            res.end("successs");

        })


    }
    if (req.method == "GET") {
        let body = "";
        req.on('data', chunck => {
            body += chunck;
        })

        req.on('end', () => {
            if (!body) {
            req.statusCode = 200;
            res.end(JSON.stringify(data));
        }
        else{
            let fd = JSON.parse(body);
                if (fd.rollno) {
                    let result = data.find(s => s.rollno === fd.rollno);
                    req.statusCode = 200;
                    res.end(JSON.stringify(result || {}));
                } else {
                    req.statusCode = 200;
                    res.end(JSON.stringify(data));
                }
            
        }})
    }
    if(req.method=="DELETE")
    {
        let body = "";
        req.on('data', chunck => {
            body += chunck;
        })

        req.on('end', () => {
            if (!body) {
            req.statusCode = 200;
            res.end(JSON.stringify(data));
        }
        else{
            let fd = JSON.parse(body);
                if (fd.rollno) {
                    d = data.filter(s => s.rollno != fd.rollno);
                    req.statusCode = 200;
                    if(d.length!=data.length){
                        data=d;
                        res.end("succefully deleted");
                    }
                    else
                        res.end("given not available");
                } else {
                    
                    res.end("given not available");
                }
        }
    })}
    if (req.method == "PUT") {

        let body = "";
        req.on('data', chunck => {
            body += chunck;
        })
        req.on('end', () => {
            let finaldata = JSON.parse(body);
            data=data.map((el)=>{
                if(el.rollno==finaldata.rollno)
                {
                    return finaldata;
                }
                return el;
                
            })
            console.log(data);
            res.end("updated succesfully");
        })
    }
}).listen(3001);

