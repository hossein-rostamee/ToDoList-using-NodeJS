const http = require("http");

let urls = [];

const server = http.createServer((req, res) => {
    let url = req.url;
    let splits = url.split('/').slice(1, url.length);

    if (splits[0] === "add") {
        urls.push(splits[1]);
        res.end(splits[1]);
    }
    else if (splits[0] === "list") {
        for (let i = 0; i < urls.length; i++) {
            res.write(`<p>${urls[i]}</p>`);
        }
        res.end();
    }
    else {
        res.statusCode = 400;
        res.end("Eshtebah mizani dadach");
    }
}

);

server.listen(4000);




// Seperation of Concerns

// const { createServer } = require ( 'http' );

// createServer ( ( req, res ) => {
//     res.write ( 'Ali' );
//     res.write ( 'Gholam' );
//     res.write ( 'Hassan' );
//     res.end ();
// } ).listen ( 4000 );




// let fname = "Gholam"
// let a = { firstName: fname }

// // const firstName = a.firstName
// const { firstName } = a
