export class Map {
}

export interface Geometry {
    type: string;
    coordinates: [number, number];
}

export interface IGeoJSON {
    type: string;
    geometry: Geometry;
    properties?: any;
    $key?: string;
}

export class GeoJSON implements IGeoJSON {   
    type = 'Feature';
    geometry: Geometry;

    constructor (coordinates, public properties?) {
        this.geometry = {
            type: 'Point',
            coordinates: coordinates
        }
    }
}

export class FeatureCollection {
    type = 'FeatureCollection';
    constructor(public features: Array<GeoJSON>) {

    }
}