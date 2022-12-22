const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    if(req.url !== '/'){
        return res.end();
    }
    // res.end('Hello');

    // downloading big file bad way
    // const file = fs.readFileSync('plan.txt');
    // return res.end(file);

    //downloading the files good way by using streams
    // const readableStream = fs.createReadStream('plan.txt'); // this is a readable stream

    // readableStream.pipe(res);


    //coping the large files
    //bad way
    const file = fs.readFileSync('plan.txt');
    fs.writeFileSync('output.txt',file);
    res.end();

    // good way
    const readStream = fs.createReadStream('plan.txt');

    const writeStream = fs.createWriteStream('output.txt');

    readStream.on('data' , (chunk) => {
        console.log(chunk);
        writeStream.write(chunk);
    })

    res.end();


})

server.listen(5000,() => console.log(`server is running at 5000`));