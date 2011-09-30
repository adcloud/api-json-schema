require("http").createServer(function(req, res) {
  require("fs").readFile("../../README.md", function(err, content) {
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(require("node-markdown").Markdown(content.toString()))
    res.end()
  })
}).listen(3000)
