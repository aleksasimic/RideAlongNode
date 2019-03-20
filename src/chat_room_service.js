export class ChatService{
    constructor()
    {
        this.poruke_za=null;
        this.korisnik_ja=null;
        this.korisnik_drugi=null;
        this.boja_ja=null;
        this.boja_drugi=null;
    
    }
    postavivrednosti(s1,s2){
        fetch("http://localhost:3000/korisnici")
        .then(response=>{
            if(response.status===404)
                return null;
            else
                return response.json();
        })
        .then(niz_objekata=>{
            niz_objekata.forEach((element,index)=>{
            
                    if(element.sock_id===s1)
                        this.korisnik_ja=element.ime+" "+element.prezime;
                    else if(element.sock_id===s2)
                        this.korisnik_drugi=element.ime+" "+ element.prezime;

        })
        }     
        )
    }
}