const express = require('express');
const formidable= require('formidable');
const fs = require('fs');
const path = require('path');

const app = express();
//folder
var folderPath = path.join(__dirname, "store");

app.use(express.static(__dirname));

app.post('/submit', (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,async function (err, fields, files) {
        var data = {n: fields.name, c: fields.city, d: fields.Birth};
        //console.log(files.pic);
        fs.copyFile(files.pic.path, path.join(folderPath, files.img.name),(err)=>{
            if(err) return console.log(err);
            data.p = `/store/${files.img.name}`;
            res.json(data);
            res.end();
        });
       
    });
   
});
app.listen(9005);
console.log("Runing Server at Address http://localhost:9005")
    