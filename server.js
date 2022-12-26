const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    let filePath = 'index.html';
    if (request.url !== '/') {
        filePath = request.url.substring(1);
    }
    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.statusCode = 404;
            response.end('Resource not found!');
        } else {
            response.end(data);
        }
    });
}).listen(8080, () => {
    console.info('Server started at 8080');
});
