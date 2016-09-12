var express = require('express');
var fs = require('fs');

var app = express();

//配置 index.html 用服务器访问的方法
app.use(express.static(__dirname)) // 这个代表 当前服务默认的路径 ，也是 index.html 的默认路径， http://localhost:3001/

app.use('/name',function(req,res,next){
  //var data = fs.readFileSync('./data/1.txt','utf8');
  // 	console.log(data)
  // 	res.send(data)

  //上面的方式会下载，不好
  res.sendFile(__dirname+'/data/name.txt') // 这种方式  不会下载，可以用路径直接访问，不会下载 ，试试 ： http://localhost:3001/name
})

app.use('/age',function(req,res,next){
  res.sendFile(__dirname+'/data/age.txt');
})

app.use('/citys',function(req,res,next){
  res.sendFile(__dirname+'/data/citys.txt')
})

app.listen(3001,function(){
  console.log('3001 访问')
})
