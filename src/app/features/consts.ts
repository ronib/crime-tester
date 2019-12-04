import { LngLatLike } from 'mapbox-gl';
const telAvivLat = 32.109333;
    const telAvivLng = 34.855499 ;
const centerTA: LngLatLike = [telAvivLng, telAvivLat];
const centerSF: LngLatLike = [-122.48369693756104,  37.83381888486939];

export const MAP_INITIAL = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 11,
    center: centerTA
}

 