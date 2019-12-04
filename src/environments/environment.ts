// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1IjoicmVzaGJldCIsImEiOiJjazJldW83cHIwOTVvM2dvZWdrZ2Z6dHoxIn0.dC17JvoskGT6-1NlddFthw'
  },
  pusher: {
    key: 'PUSHER_API_KEY',
    cluster: 'PUSHER_CLUSTER',
  },
  dataUrl: 'http://44.229.50.66:5000/data'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
