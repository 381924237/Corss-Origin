var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

var server = http.createServer(function(req,res) {
  routePath(req,res)
})

function routePath(req,res) {
  var pathObj = url.parse(req.url,true)
  switch(pathObj.pathname) {
    case '/getData':
      var data = [
        '数据1',
        '数据2',
        '数据3'
      ]

      res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')
      res.end(JSON.stringify(data))

    break;

    default:
      fs.readFile(path.join(__dirname, pathObj.pathname), function(e, data){
        if(e){
          res.writeHead(404, 'not found')
          res.end('<h1>404 Not Found</h1>')
        }else{
          res.end(data)
        }
      }) 
  }
}

server.listen(8080)