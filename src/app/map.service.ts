import { Injectable } from '@angular/core';
import {GeoJSON} from './map';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  db: GeoJSON[];
  constructor() { 
    this.db = [];


    const telAvivLat = 32.109333;
    const telAvivLng = 34.855499;

    const taCoordinates = [telAvivLat, telAvivLng];
    const newMarker = new GeoJSON(taCoordinates, {massage: 'hello tel aviv'});
    this.db.push(newMarker);
       

    
  }

  getMarkers() {  
    console.log('wh cass', this.db);
    return this.db;
}

  

  createMarker(data: GeoJSON) {
     this.db.push(data);
  }

  removeMarker(key: string) {
    this.db.slice(1);

  }
}
