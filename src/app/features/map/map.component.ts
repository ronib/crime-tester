import { Component, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapService } from '../map.service';
import { MAP_INITIAL } from '../consts';
import { Store } from '@ngrx/store';
import { MapState } from 'src/app/core/map/map.models';
import { loadMapData } from 'src/app/core/map/map.actions';
import { Observable, interval, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FooterRowOutlet } from '@angular/cdk/table';
import { JsonPipe, getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() markerClicked = new EventEmitter<string>();
  inputFocus = false;
  setIntervalId = null;
  map: mapboxgl.Map;
  markersData: any[];
  closesPointInFocus: string;
  currentPosition: any;
  mySubscription: Subscription;
  lastIndex: number;
  prevCurrMarker: any;
  prevEventMarkers: any;
  lastTimeFetched: Date;

  mock = [{ "updateTime": "2019-12-04T12:15:51.621Z", "event": "POI", "data": [{ "owner": "killer", "points": [{ "lon": "32.090280", "lat": "34.820134" }, { "lon": "32.087415", "lat": "34.812946" }, { "lon": "32.090677", "lat": "34.805180" }, { "lon": "32.091011", "lat": "34.804824" }, { "lon": "32.091155", "lat": "34.804372" }] }] }];

  isData = false;
  index = 0;
  items = [];
  items1 = [{
    type: 'Call',
    from: 'Itai',
    fromOwner: true,
    toOwner: false,
    to: 'Oren',
    duration: "00:00:15"
  }
    ,
  {
    type: 'Sms',
    body: 'זרקתי את הנשק',
    from: 'Itai',
    to: 'David',
    fromOwner: false,
    toOwner: true,
    image: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/6C7F/production/_106957772_mediaitem106957771.jpg'
  },

  {
    type: 'image',
    from: 'Itai',
    to: 'David',
    body : 'אני והיפות שלי....',
    image: 'https://d.newsweek.com/en/full/1531533/us-lifestyle-weapons.webp?w=737&f=64bcf786dc5877fbc8a0da474b6fa3b6'
  }]

  items2 = [
    {
      type: 'Call',
      from: 'Itai',
      to: 'Halid Greenberg',
      fromOwner: true,
      toOwner: false,
      duration: "00:10:03"
    }
    ,
    {
      type: 'Sms',
      body: 'החלפתי את הכדורים',
      from: 'Itai',
      to: 'Drug Store',
      image: 'https://dlg7f0e93aole.cloudfront.net/wp-content/uploads/China-pharmaceutical-programme.jpg'
    }]

  items3 = [

    {
      type: 'image',
      from: 'Mule',
      to: 'Police officer',
      image: 'https://marijuanastox.com/wp-content/uploads/2019/10/f-10.jpg'
    }
    ,
    {
      type: 'Sms',
      body: 'נפתרתי מהעסק',
      from: 'Itai',
      to: 'David',
      image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg'
    },

    {
      type: 'image',
      from: 'Itai',
      to: 'David',
      image: 'https://www.thelocal.ch/userdata/images/article/6833f757fe12c9b637d9b3224cb5c0a570801fb6628c91c912a7326fc9eedbf7.jpg'
    },
    {
      type: 'Call',
      from: 'Itai',
      to: 'Oren'
    },
    {
      type: 'Sms',
      body: 'זרקתי את הנשק',
      from: 'Itai',
      to: 'David',
      image: 'https://www.economist.com/sites/default/files/imagecache/640-width/20190803_USP003_0.jpg'
    }]

  items4 = [{
    type: 'image',
    from: 'Itai',
    to: 'David',
    image: 'https://compote.slate.com/images/8e2336c3-267b-4c1d-8e87-912027ed36f4.jpeg?width=780&height=520&rect=1560x1040&offset=0x0'
  },
  {
    type: 'Call',
    from: 'Itai',
    fromOwner: true,
    toOwner: false,
    to: 'Oren',
    duration: "00:00:43"
  }
  ];


  constructor(private mapService: MapService,
    private renderer2: Renderer2,
    private store: Store<{ mapState: MapState }>,
    private http: HttpClient,
  ) {
    this.mySubscription = interval(5000).subscribe((x => {
      this.doStuff();
    }));
  }

  doStuff() {
    this.http.get(environment.dataUrl).subscribe((data: any) => {
      //console.log(data);
      if (data.length != this.lastIndex) {
        this.lastIndex = data.length;
        console.log('writing index : ' + JSON.stringify(data[data.length - 1]));
        console.log(this.markersData);

        if (data && data[data.length - 1] && data[data.length - 1].data)
          this.markersData = data[data.length - 1].data;

        this.displayMarkers(this.markersData);
      }
    });
  }

  ngOnInit() {
    this.setToken();
    // this.store.dispatch(loadMapData());

    // this.mapService.get(environment.dataUrl).subscribe((response: any) => {
    //this.markersData = this.mock[0].data;
    this.displayMap();
    //this.displayMarkers(this.markersData);
    this.addCurrentLocationButton();

    this.setIntervalId = setInterval(() => { this.focusCurrentLocation(); }, 20000);
    this.prevEventMarkers = [];
    // });

  }

  addCurrentLocationButton() {
    const currLoc = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    this.map.addControl(currLoc);
  }

  setToken() {
    // mapboxgl.accessToken = environment.mapbox.accessToken;
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
  }

  focusCurrentLocation() {

    navigator.geolocation.getCurrentPosition((pos) => {
      const target = [pos.coords.longitude, pos.coords.latitude] as mapboxgl.LngLatLike;
      this.currentPosition = target;
      var Seconds_Between_Dates = 999;
      if (this.lastTimeFetched) {
        var dif = new Date().getTime() - this.lastTimeFetched.getTime();
        var Seconds_from_T1_to_T2 = dif / 1000;
        Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
      }


      if (Seconds_Between_Dates > 60) {
        this.lastTimeFetched = new Date();
        console.log("fly to", target);
        this.map.flyTo({
          // These options control the ending camera position: centered at
          // the target, at zoom level 9, and north up.
          center: target,
          zoom: 12,
          bearing: 0,

          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          speed: 1, // make the flying slow
          curve: 1, // change the speed at which it zooms out

          // This can be any easing function: it takes a number between
          // 0 and 1 and returns another number between 0 and 1.
          easing: function (t) { return t; }
        });

      }



      this.displayCurrMarker(target);

      this.moshe();
    });

  }

  displayCurrMarker(target) {
    //if (this.prevCurrMarker) {
    //  this.prevCurrMarker.remove();
    //}

   // let el = this.renderer2.createElement('div');
    //el.className = 'marker-curr';
    //this.prevCurrMarker = new mapboxgl.Marker(el);

    //this.prevCurrMarker.setLngLat(target)
      //.addTo(this.map);

  }

  displayMap() {
    this.map = new mapboxgl.Map(MAP_INITIAL);

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    //if (d>1) return Math.round(d)+"km";
    //else if (d<=1)
    return Math.round(d * 1000);
    //return d;
  }

  moshe() {

    if (this.isData) {
      this.index++;
      if (this.index == 1) {
        this.items = this.items1;
      }

      if (this.index == 2) {
        this.items = this.items2;
      }

      if (this.index == 3) {
        this.items = this.items3;
      }

      if (this.index == 4) {
        this.items = this.items4;
      }

      if (this.index >= 5)
        this.index == 0;
    }

    return;

    let minimalDistanceInMeters = 100;
    let closestPotition = 100000;
    let closestLocationData = null;
    let pointsArray = [];
    let otherPointsArray = [];
    this.markersData.forEach(marker => {
      marker.points.forEach(point => {
        if (point.lat && point.lon) {
          pointsArray.push(point);

          if (this.currentPosition) {
            let distanceFromThisMarkerToThePosition = this.distance(this.currentPosition[0], this.currentPosition[1], point.lat, point.lon);
            if (closestPotition > distanceFromThisMarkerToThePosition) {
              closestPotition = distanceFromThisMarkerToThePosition;
              closestLocationData = point;
            }
          }

        } else {
          otherPointsArray.push(point);
        }
      });
    });

    if (closestPotition > minimalDistanceInMeters) {
      console.log('still not close enough');
      return;
    }

    console.log('closest position = ' + closestPotition);

    let j = JSON.stringify(closestLocationData);
    //if (this.closesPointInFocus === j){
    //  return; //already in focus
    //}

    console.log('closes location : ' + j);
    this.closesPointInFocus = j;


    let pointsToDisplayArray = [];
    otherPointsArray.forEach(testPoint => {
      let eventTime = new Date(testPoint.Time);
      let closesLocationPoint = null;
      let minimalTimeSeconds = 999999999;
      pointsArray.forEach(locationPoint => {
        let locationTime = new Date(locationPoint.Time);
        var dif = eventTime.getTime() - locationTime.getTime();
        var Seconds_from_T1_to_T2 = dif / 1000;
        var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

        if (minimalTimeSeconds > Seconds_Between_Dates) {
          minimalTimeSeconds = Seconds_Between_Dates;
          closesLocationPoint = locationPoint;
        }
      });

      //now we have the closes location
      let closestLocationJson = JSON.stringify(closesLocationPoint);

      if (closestLocationJson === this.closesPointInFocus) {
        pointsToDisplayArray.push(testPoint);
      }

    });


    //console.log(pointsToDisplayArray);
    //this.items = [];
    //pointsToDisplayArray.forEach(item=> this.items.push(item));
  }



  displayMarkers(markersData: any[]) {

    const dataLine = [];
    this.prevEventMarkers.forEach(obj => {
      obj.remove();
    });

    markersData.forEach(marker => {
      // console.log(marker);
      marker.points.forEach(point => {
        if (point.lat && point.lon) {
          let el = this.renderer2.createElement('div');
          el.addEventListener('click', () => {
            console.log('click', marker);
          }
          );
          el.className = 'marker';
          const coordinate = [point.lat, point.lon] as mapboxgl.LngLatLike;
          //let distanceFromThisMarkerToThePosition = this.distance(this.currentPosition[0], this.currentPosition[1], point.lat, point.lon);
          dataLine.push(coordinate);
          let markerObj = new mapboxgl.Marker(el);

          markerObj.setLngLat(coordinate)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML('<h3 style="color:purple;">' + marker.owner + '</h3><p>' + 'description 1234567890' + '</p>')
            )
            .addTo(this.map);
          this.prevEventMarkers.push(markerObj);
        }
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


    if (this.markersData.length > 0)
      this.isData = true;
    this.moshe();
  }
}

