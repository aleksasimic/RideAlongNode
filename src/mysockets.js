// import {ChatService} from "./chat_room_service";
// import {DatabaseService} from "./database_service";
// export class MySockets
// {
//     constructor(){
//         this.io = require('socket.io-client');
//         this.socket = this.io.connect('http://localhost:3001', {reconnect: true});
//         this.chatservice=new ChatService();
//         this.db_service=new DatabaseService();
//     }
//     handle_kreiraj_sender(s1,s2){
//         let that=this;
//         if(s1===s2)
//         {
//           document.getElementById("infodiv").innerHTML="Ne možete četovati sami sa sobom";
//         }
//         else 
//         { 
//           fetch("http://localhost:3000/korisnici")
//           .then(response=>{
//               if(response.status===404)
//                   return null;
//               else
//                   return response.json();
//           })
//           .then(niz_objekata=>{
//               niz_objekata.forEach((element,index)=>{
//                 if(element.sock_id===s2)
//                   {
//                     that.chatservice.korisnik_ja=element.ime+" "+element.prezime;
//                     that.chatservice.boja_ja=element.boja;
//                   }
//                 else if(element.sock_id===s1)
//                   {
//                     that.chatservice.korisnik_drugi=element.ime+" "+ element.prezime;
//                     that.chatservice.boja_drugi=element.boja;
//                   }
//           })
//           })  
//           .then(objekat=>{
//             alert("Uspešno ste započeli čet sa "+that.chatservice.korisnik_drugi);
//             document.getElementById("mycustom").innerHTML="Poruka za "+ that.chatservice.korisnik_drugi;
//             document.getElementById("hidden_chat_div").style.visibility="visible";
//           });
//           this.chatservice.poruke_za=s1;
//          }
//     }
//     handle_kreiraj_receiver(s1,s2){
//         let that=this;
//         if(s1===s2)
//         {
//           document.getElementById("infodiv").innerHTML="Ne mozete četovati sami sa sobom";
//         }
//         else 
//         {
//           fetch("http://localhost:3000/korisnici")
//           .then(response=>{
//               if(response.status===404)
//                   return null;
//               else
//                   return response.json();
//           })
//           .then(niz_objekata=>{
//               niz_objekata.forEach((element,index)=>{
//                 if(element.sock_id===s1)
//                     { 
//                       that.chatservice.korisnik_ja=element.ime+" "+element.prezime;
//                       that.chatservice.boja_ja=element.boja;
//                     }
//                 else if(element.sock_id===s2)
//                     { 
//                       that.chatservice.korisnik_drugi=element.ime+" "+ element.prezime;
//                       that.chatservice.boja_drugi=element.boja;
//                     }
  
//           })
//         })
//         .then(objekat=>{
//           alert(that.chatservice.korisnik_drugi+" želi da četuje sa vama");
//           document.getElementById("mycustom").innerHTML="Poruka za "+ that.chatservice.korisnik_drugi;
//           document.getElementById("hidden_chat_div").style.visibility="visible";
//         });
//           this.chatservice.poruke_za=s2;
//         }

//     }
//     handle_poruka(msg,s1,s2){
//         if(s2===this.socket.id)
//         { 
//           let ul=document.getElementById('messages');
//           let li = document.createElement("li");
//           li.style.color=this.chatservice.boja_ja;
//           li.appendChild(document.createTextNode(this.chatservice.korisnik_ja+ " : "+msg));
//           console.log(this.chatservice.korisnik_ja);
//           ul.appendChild(li);
//         }
//         else{ 
//           let ul=document.getElementById('messages');
//           let li = document.createElement("li");
//           li.style.color=this.chatservice.boja_drugi;
//           //console.log(this.chatservice.korisnik_drugi);
//           li.appendChild(document.createTextNode(this.chatservice.korisnik_drugi+" : "+msg));
//           ul.appendChild(li);
//         }
//     }
//     emit_poruka(){
        
//         this.socket.emit('poruka',document.getElementById("cet").value,this.chatservice.poruke_za,this.socket.id);
//     }
// }