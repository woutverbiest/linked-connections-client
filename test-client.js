var http = require("http");
var fs = require('fs')
var gunzip = require('gunzip-file');
require('dotenv').config()

var start_time = new Date();

let requestparams = {
    'agency':'sncb',
    'file':'2021-09-20T03:51:51.000Z.json.gz'
}

const file = fs.createWriteStream(`storage/${requestparams.agency}/file.json.gz`)

const httprequest = http.get(`${process.env.HOST}:${process.env.PORT}/${requestparams.agency}/linkedconnection/${requestparams.file}`, function(response){

    console.log('writing zipped file')
    var stream = response.pipe(file)

    stream.on('finish', ()=>{
        console.log("unzipping")
        gunzip(`storage/${requestparams.agency}/file.json.gz`, `storage/${requestparams.agency}/file.json`, function() {
            var end_time = new Date(); 

            console.log(`Done (took ${time_difference(start_time, end_time)}s)`)
        });
    })
})

function time_difference(start_time, end_time){
    return  Math.round((end_time - start_time) / 1000);
}