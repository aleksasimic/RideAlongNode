
//var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var test=require("./test");
 var redis=require("./redis");

var bodyParser = require('body-parser');
var express=require('express');
var myapp=express();
var router=express.Router();
var cors = require('cors')

router.get('/', function(req, res) {
  res.json(
    {
    ime:'aleksa',
    prezime:'simic' }
  );
  redis.proba();
  res.send();   
});

 myapp.use(bodyParser.urlencoded({ extended: true }));
 myapp.use(bodyParser.json());
 myapp.use(cors());
myapp.use('/api', router);


// io.on('connection', function (socket){
//     console.log('connection');
//     console.log(test);
//     //const id=socket.id;
//     console.log(redis);
//     redis.proba();

//   socket.on('poruka', function (msg,s1,s2) {
//     console.log(msg);
//     io.to(s1).emit('poruka',msg,s1,s2);
//     io.to(s2).emit('poruka',msg,s1,s2);
//   });
//   socket.on('kreiraj_cet_r',function(s1,s2){
//     console.log("sada cu da kreiram cet");
//     io.to(s1).emit('kreiraj_cet_r',s1,s2);
//     io.to(s2).emit('kreiraj_cet_s',s1,s2);
//   })
//   socket.on('disconnect', function() {
//     console.log('Got disconnect!');
//     console.log(socket.id);
//     io.emit('deleteMarkers');

//     fetch("http://localhost:3000/korisnici")
//     .then(response=>{
//         if(response.status===404)
//             return null;
//         else
//             return response.json();
//     })
//     .then(niz_objekata=>{
//         niz_objekata.forEach((element,index)=>{
//               if(element.sock_id===socket.id){
//                   fetch("http://localhost:3000/korisnici/"+element.id, {
//                   method: 'delete',
                
//                   headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                   },
                
//                   body: JSON.stringify(element)
                
//                 })
//                 .then(response =>  response.json()) //returns jsons response
//                 .then(json => {
//                   console.log('parsed json: ', json);
                  
//                 })
//                 .catch(ex => {
//                   console.log('parsing failed: ', ex);
                  
//                 });
//               }
//             }

//     )})
    
// });
// });

// http.listen(3001, function () {
//   console.log('listening on *:3001');
// });

myapp.listen(3001);
console.log('Magic happens on port ' + 3001);