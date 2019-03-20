import {VratiInner} from './bootstrap_service';
import {VratiInnerDva} from './bootstrap_service';
export class HtmlPageService{
 
    initialize(){
        Promise.all([
            this.initialize_left_div(),
            this.initialize_center_div(),
            this.initialize_right_div()
        ]).then( () => {
            alert("Dobro dosli na Ride Along portal");
        });
    }

    initialize_left_div(){
        return new Promise((resolve, reject) => {
            let levidiv=document.createElement("div");
            levidiv.id="levidiv";
            document.getElementById("container").appendChild(levidiv);

            let divzasliku=document.createElement("div");
            divzasliku.id="divzasliku";
            let image_element=document.createElement("img");
            image_element.src="https://image.ibb.co/nLLkZx/logosmanjeni.png";
            divzasliku.appendChild(image_element);
            levidiv.appendChild(divzasliku);

            let divzaopis=document.createElement("div");
            divzaopis.innerHTML="Ovde ce biti opis web strane";
            divzaopis.id="divzaopis";
            levidiv.appendChild(divzaopis);

            setTimeout(() => resolve(levidiv),1000);
        });
    }

    initialize_center_div(){
        return new Promise((resolve, reject) => {
            
            let centralnidiv=document.createElement("div");
            centralnidiv.id="centralnidiv";
            document.getElementById("container").appendChild(centralnidiv);
            
            let divzamapu=document.createElement("div");
            divzamapu.id="mapica";
            centralnidiv.appendChild(divzamapu);


            setTimeout(() => resolve(centralnidiv),1000);
        });
    }
    initialize_right_div(){
       
        return new Promise((resolve, reject) => {
            let desnidiv=document.createElement("div");
            desnidiv.id="desnidiv";
            document.getElementById("container").appendChild(desnidiv);
            
            let divzainpute=document.createElement("div");
            divzainpute.id="divzainpute";
            desnidiv.appendChild(divzainpute);

            let mojdiv_ime=document.createElement("div");
            mojdiv_ime.innerHTML=VratiInner("ime_input","Ime");
            divzainpute.appendChild(mojdiv_ime);
            
            let mojdiv_prezime=document.createElement("div");
            mojdiv_prezime.innerHTML=VratiInner("prezime_input","Prezime");
            divzainpute.appendChild(mojdiv_prezime);
            
            let mojdiv_rbd=document.createElement("div");
            mojdiv_rbd.innerHTML=VratiInner("rbd_input","Pol");
            divzainpute.appendChild(mojdiv_rbd);

           
            let mojdiv_trenutna=document.createElement("div");
            mojdiv_trenutna.innerHTML=VratiInner("trenutna_lokacija_input","Trenutna lokacija");
            divzainpute.appendChild(mojdiv_trenutna);
            
            let mojdiv_odredisna=document.createElement("div");
            mojdiv_odredisna.innerHTML=VratiInner("odredisna_lokacija_input","Odredišna lokacija");
            divzainpute.appendChild(mojdiv_odredisna);

            let mydiv=document.createElement("div");
            divzainpute.appendChild(mydiv);
            
            let btn=document.createElement("button");
            btn.id="dugme";
            btn.className="btn btn-warning";
            btn.innerHTML="Nadji put";
            mydiv.appendChild(btn);

            let hidden_chat_div=document.createElement("div");
            hidden_chat_div.id="hidden_chat_div";
            hidden_chat_div.style.visibility="hidden";
            divzainpute.appendChild(hidden_chat_div);
            
            
            let mojdiv_cet=document.createElement("div");
            mojdiv_cet.innerHTML=VratiInnerDva("cet","Poruka");
            hidden_chat_div.appendChild(mojdiv_cet);
            
            let divzasalji=document.createElement("div");
            divzasalji.id="divzasalji";
            hidden_chat_div.appendChild(divzasalji);
           
            let dugme=document.createElement("button");
            dugme.id="dugmesalji";
            dugme.innerHTML="Pošalji";
            dugme.className="btn btn-warning";
            divzasalji.appendChild(dugme);

            let divzachat=document.createElement("div");
            divzachat.id="divzachat";
            hidden_chat_div.appendChild(divzachat);

            let lista=document.createElement("ul");
            lista.id="messages";
            divzachat.appendChild(lista);
            
            setTimeout(() => resolve(desnidiv), 1000);
        });       
    }
    initialize_btn(){
        return new Promise((resolve, reject) => {
            let mydiv=document.createElement("div");
            document.body.appendChild(mydiv);
            
            let btn=document.createElement("button");
            btn.id="dugme";
            btn.className="btn btn-warning";
            btn.innerHTML="Spoji";
            mydiv.appendChild(btn);

            let divic=document.createElement("div");
            document.body.appendChild(divic);
            
            let dugme=document.createElement("button");
            dugme.id="dugmecon";
            dugme.innerHTML="Connect";
            dugme.className="btn btn-warning";
            mydiv.appendChild(dugme);

            let mojdivic=document.createElement("div");
            document.body.appendChild(mojdivic);
            
            let mojedugme=document.createElement("button");
            mojedugme.id="init";
            mojedugme.className="btn btn-warning";
            mojedugme.innerHTML="Start chat";
            mojdivic.appendChild(mojedugme);
            
            
            
            setTimeout(() => resolve(btn), 1000);
        });
    }
    get_data(){
        let adr1;
        let adr2;
        let ime;
        let prezime;
        let pol;
        let myInput = document.getElementById("trenutna_lokacija_input");
        if (myInput && myInput.value) {
            adr1=myInput.value;
          }
        myInput.disabled=true;
        
        let myInput_odrediste = document.getElementById("odredisna_lokacija_input");
        
        if (myInput_odrediste && myInput_odrediste.value) {
          adr2=myInput_odrediste.value;
        }
        myInput_odrediste.disabled=true;
  
        let myInput_ime = document.getElementById("ime_input");
        if (myInput_ime && myInput_ime.value) {
          ime=myInput_ime.value;
        }
        myInput_ime.disabled=true;
    
        let myInput_prezime = document.getElementById("prezime_input");
        
        if (myInput_prezime && myInput_prezime.value) {
          prezime=myInput_prezime.value;
        }
        myInput_prezime.disabled=true;
        
        let myInput_pol = document.getElementById("rbd_input");
        
        if (myInput_pol && myInput_pol.value) {
          pol=myInput_pol.value;
        }
        myInput_pol.disabled=true;
        let temp={
            adresa1:adr1,
            adresa2:adr2,
            myime:ime,
            myprezime:prezime,
            mypol:pol
        };
        return temp;
    }

}