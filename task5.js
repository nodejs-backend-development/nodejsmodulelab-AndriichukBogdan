const http = require('http');
const fs = require('fs');
const split = require('split2');
const through = require('through2');

const server = http.createServer((req, res) => {
    const result = [];
    let headers = [];

    fs.createReadStream('data.csv')
        .pipe(split())
        .pipe(through.obj(function (line, _, next) {
            if (headers.length === 0) {
                headers = line.split(',');
            } else {
                const values = line.split(',');
                const obj = {};
                headers.forEach((h, i) => obj[h] = values[i]);
                result.push(obj);
            }
            next();
        }))
        .on('finish', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        });
});

server.listen(3000, () => {
    console.log('Сервер запущено на http://localhost:3000');
});
