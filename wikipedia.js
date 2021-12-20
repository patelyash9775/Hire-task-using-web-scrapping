const request = require("request");
const cheerio = require("cheerio");
let fs = require("fs");
let xlsx = require("xlsx")
const url = "https://en.wikipedia.org/wiki/Y";
request(url, cb);

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractHTML(html);
    }
}

// inspect -> 
// unique 
function extractHTML(html) {
    let $ = cheerio.load(html);
    let elemsArr = $(".mw-parser-output p");
    let Name=[];
    Name[0] = $(elemsArr[2]).text();
    Name[1] = $(elemsArr[3]).text();
    Name[2] = $(elemsArr[4]).text();

    let history=[];
    history[0] = $(elemsArr[5]).text();
    history[1] = $(elemsArr[6]).text();
    
    let vowel=[];
    vowel[0] = $(elemsArr[7]).text();
    vowel[1] = $(elemsArr[8]).text();
    vowel[2] = $(elemsArr[9]).text();
    vowel[3] = $(elemsArr[10]).text();
    vowel[4] = $(elemsArr[11]).text();

    let data = [
        {
            "Name": Name[0],
            "History": history[0],
            "Vowel": vowel[0]
        },
        {
            "Name": Name[1],
            "History": history[1],
            "Vowel": vowel[1]
        },
        {
            "Name": Name[2],
            "History": " ",
            "Vowel": vowel[2]
        },
        {
            "Name": " ",
            "History": " ",
            "Vowel": vowel[3]
        },
        {
            "Name": " ",
            "History": " ",
            "Vowel": vowel[4]
        }
    ]
    
    let newB = xlsx.utils.book_new();

    let newWS = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(newB,newWS,"sheet-1");

    xlsx.writeFile(newB,"Y.xlsx")

    
    
}