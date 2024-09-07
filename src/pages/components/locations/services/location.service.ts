import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { FilterConfig } from '../../../../core/interfaces/filter'
import { ApiResponse } from '../../../../core/interfaces/response'
import { apiUrl_v1 } from '../../../../enviroments/enviroment.env'
import { Location } from '../interfaces/location'

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  api = apiUrl_v1 + '/locations/'
  data$: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([])

  constructor (private http: HttpClient) {}

  get listLocation () {
    return this.data$.value
  }

  fetchLocations (filter?: FilterConfig): Observable<ApiResponse<Location>> {
    return new Observable(subscriber => {
      this.http
        .post<ApiResponse<Location>>(this.api + 'search', filter)
        .subscribe({
          next: res => {
            this.data$.next(res.value['locations'])
            subscriber.next()
            subscriber.complete()
          },
          error: () => {
            subscriber.error()
            subscriber.complete()
          }
        })
    })
  }
}
