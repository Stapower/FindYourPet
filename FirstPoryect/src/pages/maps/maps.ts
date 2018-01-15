import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';

//@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    private googleMaps: GoogleMaps
  ){}


  map: GoogleMap;

  ionViewDidLoad(){
    console.log('ionViewDidLoad');
    this.getPosition();
    console.log(this.map);
    /*google.maps.event.addListener(this.map, 'click', function(event) {
      console.log('click');
    });*/
  }

  mapClicked(event:any){
    try{
      let latlng =new LatLng(event.ea.y, event.ea.x);

     /* let markerOptions: MarkerOptions = {
        position: latlng,
        map: this.map,
        title: 'Animal'
      };*/

      let marker = new google.maps.Marker({
        position: latlng,
        map: this.map,
        title: 'Animal'
        //icon : 'https://cdn.pixabay.com/photo/2015/12/09/15/19/footprint-1084875_960_720.png'
      });
      //this.map.addMarker(markerOptions);
      console.log(this.map);
      //console.log(markerOptions);
    }
    catch(ex){
      console.log('error ' + ex);
    }
  }


  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
      let map = this.map;
      google.maps.event.addListener(this.map, 'click', (event) => { this.mapClicked(event); });
      /*function(event, map){
        try{
          console.log('click ' + event);
          let latlng = {lat: event.ea.y, lng: event.ea.y};
          let marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: 'Animal',
            icon : 'https://cdn.pixabay.com/photo/2015/12/09/15/19/footprint-1084875_960_720.png'
          });
          console.log('map ' + map);
          console.log('marker ' + marker);
        }
        catch(ex){
          console.log(ex);
        }
      });*/
    })
    .catch(error =>{
      console.log(error);
    })
  }
  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
  
    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Tu posición'
      });
    });

    //loadPets
  }


  
}
