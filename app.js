const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.end("<h1>hello world</h1>");
  }
  if (req.url === "/about" && req.method === "GET") {
    res.end("<h1>hello world, welcome to the about page</h1>");
  }
  if (req.url === "/contact" && req.method === "GET") {
    res.end("<h1>hello world, welcome to the contact us page</h1>");
  }
});

server.listen(5173, () => {
  console.log("Server running in 5173");
});
