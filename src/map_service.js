import {DatabaseService} from "./database_service";
import {getRandomColor} from "./random_color_service";
import {UserService} from './user_service';
import { DISCONNECT } from "socket.io-parser";

export class MapService{
    
    constructor(my_sock){
        let myLatLng = {lat: 43.325971, lng: 21.894809};
        let mapOptions = {
            center: myLatLng,
            zoom: 10
        };
        this.map = new google.maps.Map(document.getElementById("mapica"), mapOptions);
        this.db_service=new DatabaseService();
        this.trenutni_soket=my_sock;
        this.niz_markera=[];
        this.niz_direkcija=[];
        this.pocetni_broj_korisnika=0;
        this.prebroji_pocetne();
        this.generate_custom_marker("","f2c41f",myLatLng,"Nalazite","se","ovde");
    
    }
    prebroji_pocetne(){
        let that=this;
        fetch("http://localhost:3000/korisnici")
        .then(response=>{
            if(response.status===404)
                return null;
            else
                return response.json();
        })
        .then(niz_objekata=>{
            niz_objekata.forEach((element,index)=>{
                this.pocetni_broj_korisnika++;
                
            })
        }     
        )
    }

    generate_custom_marker(text,color,pos,ime,prezime,pol){
        let marker = new google.maps.Marker({
            map: this.map,
            icon: "http://www.googlemapsmarkers.com/v1/"+text+"/"+color+"/",
            position:pos,
            title:ime+" "+ prezime+" " +pol,
        });
        let that=this;
        google.maps.event.addListener(marker, 'click', function (event) {
            fetch("http://localhost:3000/korisnici")
            .then(response=>{
                if(response.status===404)
                    return null;
                else
                    return response.json();
            })
            .then(niz_objekata=>{
                niz_objekata.forEach((element,index)=>{
        
                    let lat=this.position.lat();
                    let lng=this.position.lng();
                    console.log(lat);
                    console.log(lng);
                    if((element.gadresa1.lat===lat && element.gadresa1.lng===lng)||(element.gadresa2.lat===lat&&element.gadresa2.lng===lng))
                    {
                        that.trenutni_soket.socket.emit('kreiraj_cet_r',element.sock_id,that.trenutni_soket.socket.id);
                    }
                })
            }     
            )
        });
        this.niz_markera.push(marker);  
        return marker;   
    }
    map_address(adresa,buli){
            let moj_geocoder=new google.maps.Geocoder();
            let that=this;
            moj_geocoder.geocode(
                {'address':adresa},
                function(results,status){
                    if(status==='OK')
                    {
                        let latitude = results[0].geometry.location.lat();
                        let longitude = results[0].geometry.location.lng();
                        that.map.setCenter(new google.maps.LatLng(latitude, longitude));
                        let temp=results[0].geometry.location;
                        
                        that.decide(buli)
                        .then(response=>{
                            if(response.status===404)
                                return null;
                            else
                                return response.json();
                        })
                        .then(objekat=>{
                            
                                let marker2=new google.maps.Marker({
                                    map:that.map,
                                    position:results[0].geometry.location,
                                    animation:google.maps.Animation.DROP,
                                    icon:objekat.adresa
                               });                      
                        })                      
                    }
                    else
                    {
                        alert('Izvorisna adresa nije ucitana kako treba:'+status);
                    }
                }            
            );    
    }
    decide(vrednost)
    {
        return(vrednost?fetch("http://localhost:3000/pocetna_ikonica/1"):fetch("http://localhost:3000/krajnja_ikonica/1"));
    }
    refresh(){
        this.delete_markers();
        this.delete_directions();
        let that=this;
        console.log("U refreshu sam");
        fetch("http://localhost:3000/korisnici")
        .then(response=>{
            if(response.status===404)
                return null;
            else
                return response.json();
        })
        .then(niz_objekata=>{
            niz_objekata.forEach((element,index)=>{               
                that.geocodeme_for_refresh(element.gadresa1,element.gadresa2,element.boja,element.ime,element.prezime,element.pol);
            })
        }     
        )
    }
    geocodeme(adresa1,adresa2,ime,prezime,pol,sock_id){
        let geocoder = new google.maps.Geocoder();
        let that=this;
        geocoder.geocode({ 'address': adresa1 }, function (results, status) {
            let temp = results[0].geometry.location;
            geocoder.geocode({ 'address': adresa2 }, function (results, status) {
               let temp2 = results[0].geometry.location;
    
                let directionsDisplay;
                let directionsService = new google.maps.DirectionsService();
                directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(that.map);
                let random_color=getRandomColor();
                let user=new UserService(temp,temp2,random_color,ime,prezime,pol,sock_id);
                that.db_service.add_to_database("http://localhost:3000/korisnici",user); 
                let start = temp;            
                let end = temp2;
                let marker_a=that.generate_custom_marker("A",random_color.substr(1),start,ime,prezime,pol);
                let marker_b=that.generate_custom_marker("B",random_color.substr(1),end,ime,prezime,pol);
    
                let request = {
                  origin: start,
                  destination: end,
                  travelMode: google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function(response, status) {
                  if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay = new google.maps.DirectionsRenderer({
                        polylineOptions: {
                          strokeColor: random_color,
                          strokeWeight: 6,
                          strokeOpacity: 0.6,
                         
                        },
                        suppressMarkers:true
                      });  
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap(that.map);
                    that.niz_direkcija.push(directionsDisplay);
                  } else 
                  {
                    alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
                  }
                });
            });
        });
}
        geocodeme_for_refresh(adresa1,adresa2,random_boja,ime,prezime,pol){
            let directionsDisplay;
            let directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(this.map);
            let that=this;
            let random_color=random_boja;
            
            let start = new google.maps.LatLng(adresa1.lat,adresa1.lng);            
            let end = new google.maps.LatLng(adresa2.lat,adresa2.lng);
            this.generate_custom_marker("A",random_color.substr(1),start,ime,prezime,pol);
            this.generate_custom_marker("B",random_color.substr(1),end,ime,prezime,pol);
            

            let request = {
              origin: start,
              destination: end,
              travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay = new google.maps.DirectionsRenderer({
                    polylineOptions: {
                      strokeColor:random_boja,
                      strokeWeight: 6,
                      strokeOpacity: 0.6,
                     
                    },
                    suppressMarkers:true
                  });  
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(that.map);
                that.niz_direkcija.push(directionsDisplay);
              } else {
                alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
              }
            });
            }
        update_map(){
            let that=this;
            fetch("http://localhost:3000/korisnici")
            .then(response=>{
                if(response.status===404)
                    return null;
                else
                    return response.json();
            })
            .then(niz_objekata=>{
              return niz_objekata.length;
            })
            .then(brojubazi=>{
                
              if(brojubazi!=that.pocetni_broj_korisnika)
                { 
                  that.pocetni_broj_korisnika=brojubazi;
                  that.refresh();
                }
                else{

                }
                
            })
        }
        delete_markers(){
            this.niz_markera.forEach(function(element){
                element.setMap(null);
                element=null;
            });  
        }
        delete_directions(){
            this.niz_direkcija.forEach(function(element){
                element.setMap(null);
                element=null;         
            });  
        }
}
