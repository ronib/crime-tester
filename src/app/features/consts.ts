import { LngLatLike } from 'mapbox-gl';
const telAvivLat = 32.109333;
    const telAvivLng = 34.855499 ;
const center: LngLatLike = [telAvivLng, telAvivLat];
export const MAP_INITIAL = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 11,
    center: center
}



  
  