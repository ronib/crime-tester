import { Component, OnInit, Renderer2 } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapService } from '../map.service';
import { MAP_INITIAL } from '../consts';
import { Store } from '@ngrx/store';
import { MapState } from 'src/app/core/map/map.models';
import { loadMapData } from 'src/app/core/map/map.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  
  constructor(private mapService: MapService, 
    private renderer2: Renderer2,
    private store: Store<{ mapState: MapState }>
    ) { }

  ngOnInit() {
    this.setToken();
    this.store.dispatch(loadMapData());
    
    this.mapService.get(environment.dataUrl).subscribe((response: any) => {
      console.log(response);
    });
    this.displayMap();
    this.buildMarkers();
  }

  setToken() {
    // mapboxgl.accessToken = environment.mapbox.accessToken;
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
  }

  displayMap() {
    this.map = new mapboxgl.Map(MAP_INITIAL);
  
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  buildMarkers() {
    const markersData = this.mapService.getMockData();
    console.log(markersData);
    markersData.features.forEach(marker => {
      // create a HTML element for each feature
      // let el = document.createElement('div');
      // el.className = 'marker2';
      // el["style"] = `width: 59px;
      // height: 59px;
      // background-color: red;`;
      // // make a marker for each feature and add to the map
      // new mapboxgl.Marker(el)
      //   .setLngLat(marker.geometry.coordinates as mapboxgl.LngLatLike)
      //   .addTo(this.map);

      let el = this.renderer2.createElement('div');
      
      el.className = 'marker';
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates as mapboxgl.LngLatLike)
        .addTo(this.map);
      
    });


    this.map.on('load', ()=> {
      // Insert the layer beneath any symbol layer.
      var layers = this.map.getStyle().layers;
       
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      labelLayerId = layers[i].id;
      break;
      }
      }
       
      this.map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
      'fill-extrusion-color': '#aaa',
       
      // use an 'interpolate' expression to add a smooth transition effect to the
      // buildings as the user zooms in
      'fill-extrusion-height': [
      "interpolate", ["linear"], ["zoom"],
      15, 0,
      15.05, ["get", "height"]
      ],
      'fill-extrusion-base': [
      "interpolate", ["linear"], ["zoom"],
      15, 0,
      15.05, ["get", "min_height"]
      ],
      'fill-extrusion-opacity': .6
      }
      }, labelLayerId);
      });
    
      
  }

}
