const { Transform } = require('stream');

class CustomStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformedChunk = chunk.toString().replace(/[a-z]/g, char => char.toUpperCase());
        this.push(transformedChunk);
        callback();
    }
}

process.stdin.pipe(new CustomStream()).pipe(process.stdout);