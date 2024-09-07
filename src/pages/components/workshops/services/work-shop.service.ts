import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { FilterConfig } from '../../../../core/interfaces/filter'
import { ApiResponse } from '../../../../core/interfaces/response'
import { apiUrl_v1 } from '../../../../enviroments/enviroment.env'
import { WorkShop } from '../interfaces/work-shop'

@Injectable({
  providedIn: 'root'
})
export class WorkShopService {
  api = apiUrl_v1
  data$: BehaviorSubject<WorkShop[]> = new BehaviorSubject<WorkShop[]>([])
  total$: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  _list: any[] = []
  constructor (private http: HttpClient) {}

  get listWorkShop () {
    return this.data$.value
  }

  get total () {
    return this.total$.value
  }

  fetchWorkShops (filter?: FilterConfig): Observable<ApiResponse<WorkShop>> {
    return new Observable(subscriber => {
      this.http
        .post<ApiResponse<WorkShop>>(this.api + '/addresses/search', filter)
        .subscribe({
          next: res => {
            this.data$.next(res.value['addresses'])
            this.total$.next(res.value['total'])
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
