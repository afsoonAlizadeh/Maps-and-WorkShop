import { Injectable } from '@angular/core'
import { Observable, Observer } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor () {}

  getCurrentPosition (): Observable<GeolocationCoordinates> {
    return new Observable((observer: Observer<GeolocationCoordinates>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position.coords)
            observer.complete()
          },
          error => {
            observer.error(error)
          }
        )
      } else {
        observer.error('Geolocation is not supported by this browser.')
      }
    })
  }
}
