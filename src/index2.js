import * as Rxjs from 'rxjs/Rx';
 import 'rxjs/add/operator/toPromise';
//  import { MapService } from "./map_service";
  import {HtmlPageService} from "./html_page_service";;
// import {MySockets} from "./mysockets";
const requestify = require('requestify');




 const html_page_service=new HtmlPageService();
 html_page_service.initialize();
// const my_sock=new MySockets();
// const map_service=new MapService(my_sock);

requestify.get('http://localhost:3001/api')
  .then(function(response) {
      console.log("Poslao sam zahtev");
      console.log(response.getBody().ime);
      console.log(12);
  });



// my_sock.socket.on("connect",()=>{

 


  
//   setInterval(function(){
//   map_service.update_map();
//   }, 1000);

//   const obs_pocetna_lokacija=Rxjs.Observable.fromEvent(document.getElementById("trenutna_lokacija_input"),"input")
//   .debounceTime(2000)
//   .map(ev=>ev.target.value)
//   .first()
//   .subscribe(pocetnalokacija=>{
//       map_service.map_address(pocetnalokacija,true);
//   });
  
//   const obs_odredisna_lokacija=Rxjs.Observable.fromEvent(document.getElementById("odredisna_lokacija_input"),"input")
//   .debounceTime(2000)
//   .first()
//   .map(ev=>ev.target.value)
//   .subscribe(odredisnalokacija=>{
//       map_service.map_address(odredisnalokacija,false);
//   });
  
//   const obs_btn=Rxjs.Observable.fromEvent(document.getElementById("dugme"),"click")
//   .subscribe((e)=>{
//       let tmp=html_page_service.get_data();
//       map_service.refresh();
//       map_service.geocodeme(tmp.adresa1,tmp.adresa2,tmp.myime,tmp.myprezime,tmp.mypol,my_sock.socket.id);
//   });
  
//   const obs_btn2=Rxjs.Observable.fromEvent(document.getElementById("dugmesalji"),"click")
//   .subscribe((e)=>{
//     console.log("Kod salji sam");
//     my_sock.emit_poruka();
    
//   });
  
//     my_sock.socket.on('poruka', function (msg,s1,s2) {
//       my_sock.handle_poruka(msg,s1,s2);
//   }); 
//   my_sock.socket.on('kreiraj_cet_r',function(s1,s2){
//      my_sock.handle_kreiraj_receiver(s1,s2);  
//   });
//   my_sock.socket.on('kreiraj_cet_s',function(s1,s2){
//      my_sock.handle_kreiraj_sender(s1,s2);
//   });
//     my_sock.socket.on('deleteMarkers',function(){
//       map_service.delete_markers();   
//   });
   
// })






