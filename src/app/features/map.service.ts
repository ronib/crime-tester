import { Injectable } from '@angular/core';
import { GeoJSON, IGeoJSON } from '../map';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  db: GeoJSON[];
  constructor(private httpClient: HttpClient) {
    this.db = [];


    const telAvivLat = 32.109333;
    const telAvivLng = 34.855499;

    const taCoordinates = [telAvivLat, telAvivLng];
    const newMarker = new GeoJSON(taCoordinates, { massage: 'hello tel aviv' });
    this.db.push(newMarker);
  }

  getMarkers() {
    return this.db;
  }

  createMarker(data: GeoJSON) {
    this.db.push(data);
  }

  removeMarker(key: string) {
    this.db.slice(1);
  }

  getMockData2() {
    const result = [{"updateTime":"2019-12-04T08:57:07.578Z","event":"POI","data":[{"lon":"32.090280","lat":"34.820134"},{"lon":"32.087415","lat":"34.812946"},{"lon":"32.090677","lat":"34.805180"},{"lon":"32.091011","lat":"34.804824"},{"lon":"32.091155","lat":"34.804372"}]}];
    return result;
  }
  getMockData() {
    const geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.41, 37.75]
        },
        properties: {
          title: 'Mapbox',
          description: 'roni'
        }
      }




      ]
    };

    return geojson;
  }

  public get(resource: string, options?): Observable<any> {
    return this.httpClient.get(resource, options).pipe(catchError(this.handleError));
  }

  public post(resource: string, body: any, options?: any): Observable<any> {
    return this.httpClient.post(resource, body, options).pipe(catchError(this.handleError));
  }

    public delete(resource: string): Observable<any> {
    return this.httpClient.delete(resource).pipe(catchError(this.handleError));
  }

  public put(resource: string, body, options?: any): Observable<any> {
    return this.httpClient.put(resource, body, options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);

    return throwError(`Server Error: ${error.message}` );
  }

}
