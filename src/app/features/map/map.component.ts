import { Component, OnInit, Renderer2, Output, EventEmitter, NgZone } from '@angular/core';
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

  @Output() markerClicked = new EventEmitter<string>();
  inputFocus = false;

  map: mapboxgl.Map;
  markersData: any[];
  mock = [{ "updateTime": "2019-12-04T12:15:51.621Z", "event": "POI", "data": [{ "owner": "killer", "points": [{ "lon": "32.090280", "lat": "34.820134" }, { "lon": "32.087415", "lat": "34.812946" }, { "lon": "32.090677", "lat": "34.805180" }, { "lon": "32.091011", "lat": "34.804824" }, { "lon": "32.091155", "lat": "34.804372" }] }] }];
  constructor(private mapService: MapService,
    private renderer2: Renderer2,
    private store: Store<{ mapState: MapState }>,
    private zone: NgZone,

  ) { }

  ngOnInit() {
    this.setToken();
    // this.store.dispatch(loadMapData());

    this.mapService.get(environment.dataUrl).subscribe((response: any) => {
      this.markersData = response[0].data;
      this.displayMap();
      this.displayMarkers();
    });

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

  addPopupToMap(popup: mapboxgl.Popup, lngLat: mapboxgl.LngLatLike, skipOpenEvent = false) {
    return this.zone.runOutsideAngular(() => {
      if (skipOpenEvent && (<any>popup)._listeners) {
        delete (<any>popup)._listeners['open'];
      }
      popup.setLngLat(lngLat);
      popup.addTo(this.map);
    });
  }

  displayMarkers() {

    const dataLine = [];
    this.markersData.forEach(marker => {
      marker.points.forEach(point => {

        let el = this.renderer2.createElement('div');
        el.className = 'marker';
        const coordinate = [point.lat, point.lon] as mapboxgl.LngLatLike;
        dataLine.push(coordinate);
        new mapboxgl.Marker(el)
          .setLngLat(coordinate)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>' + marker.owner + '</h3><p>' + 'description 1234567890' + '</p>')
          )
          .addTo(this.map);
      });




    });


    this.map.on('load', () => {
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

      this.map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": dataLine
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "blue",
          "line-width": 7
        }
      });
    });

  }
}

