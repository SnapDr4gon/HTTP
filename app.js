const http = require('http');
const fs = require('fs');

// HTTP --> (request, response)

http.createServer((request, response) => {

    const file = request.url == '/' ? './www/index.html' : `./www${request.url}`;
    //const data = fs.readFileSync('./www/index.html');
    fs.readFile(file, (err, data)=> {
        if(err){
            response.writeHead(404, {"Content-Type":"text/html"});
            response.write("Not Found");
            response.end();
        }else{
            const extension = file.split('.').pop();
            switch(extension){
                case 'txt':
                    response.writeHead(200, {"Content-Type":"text/plain"});
                    break;
                case 'html':
                    response.writeHead(200, {"Content-Type":"text/html"});
                    break;
                case 'css':
                    response.writeHead(200, {"Content-Type":"text/css"});
                    break;
                default:
                    response.writeHead(200, {"Content-Type":"text/plain"});
            }
            response.write(data);
            response.end();

        }
    });
}).listen(4444);

