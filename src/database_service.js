export class DatabaseService{
            
    add_to_database(url, obj){
        return fetch(url, {
         method: 'post',
       
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
       
         body: JSON.stringify(obj)
       
       })
       .then(response =>  response.json()) //returns jsons response
       .then(json => {
         console.log('parsed json: ', json);
         return true;
       })
       .catch(ex => {
         console.log('parsing failed: ', ex);
         return false;
       });
       }
    
    update_database(url, ObjekatKojiMenjaStari){
        const urlObjekta = url + "/" +ObjekatKojiMenjaStari.id;
        fetch(urlObjekta, {
            method: 'put',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ObjekatKojiMenjaStari)
            })
            .then(response =>  response.json()) //returns jsons response
            .then(json => console.log('parsed json: ', json))
            .catch(ex => console.log('parsing failed: ', ex));
        }
      delete_from_database(url,obj){
        return fetch(url, {
          method: 'delete',
        
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        
          body: JSON.stringify(obj)
        
        })
        .then(response =>  response.json()) //returns jsons response
        .then(json => {
          console.log('parsed json: ', json);
          return true;
        })
        .catch(ex => {
          console.log('parsing failed: ', ex);
          return false;
        });
      }
      get(){
        fetch("http://localhost:3000/korisnici")
        .then(response=>{
            if(response.status===404)
                return null;
            else
                return response.json();
        })
      }
          
      
}
