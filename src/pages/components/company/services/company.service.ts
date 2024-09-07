import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { FilterConfig } from '../../../../core/interfaces/filter'
import { ApiResponse } from '../../../../core/interfaces/response'
import { apiUrl_v1 } from '../../../../enviroments/enviroment.env'
import { Companies } from '../interfaces/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  api = apiUrl_v1 + '/companies/'
  data$: BehaviorSubject<Companies[]> = new BehaviorSubject<Companies[]>([])

  constructor (private http: HttpClient) {}

  get listCompanies () {
    return this.data$.value
  }

  fetchCompanies (filter?: FilterConfig): Observable<ApiResponse<Companies>> {
    return new Observable(subscriber => {
      this.http
        .post<ApiResponse<Companies>>(this.api + 'search', filter)
        .subscribe({
          next: res => {
            this.data$.next(res.value['companies'])
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
