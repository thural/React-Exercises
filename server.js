const http = require('http');
const { readFile } = require('fs');

const server = http.createServer((req, res) => {

  const filePath = (req.url === '/' ? './public/index.html' : `./public/${req.url}`);

  // Extension of file
  let extname = filePath.match(/\.\w+$/)[0] // regex is good :)

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  console.log('filepath: ', filePath);
  console.log('extname: ', extname);
  console.log('contentType: ', contentType);

  //using a callback function
  readFile(filePath, (error, data) => {
    if (error) {
      if (error.code == "ENOENT") {
        readFile('./404.html', 'utf-8', (error, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content);
        })
      }
      res.writeHead(500);
      res.end(`Server Error: ${error.code}`);
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });

})

server.listen(5000)