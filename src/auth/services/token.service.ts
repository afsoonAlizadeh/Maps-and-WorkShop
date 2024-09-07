import { HttpBackend, HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { ApiSingleResponse } from '../../core/interfaces/response'
import {
  apiUrl_v1,
  clientToken,
  symmetricKey
} from '../../enviroments/enviroment.env'
import { Acknowledgment, Token } from '../interfaces/auth'
import { Resolve } from '@angular/router'
import { EncryptionService } from './encription.service'
import { SymmetricConfig } from '../interfaces/symmetric'

@Injectable({
  providedIn: 'root'
})
export class TokenService implements Resolve<any> {
  api = apiUrl_v1

  token$ = new BehaviorSubject<string>('')
  data$: Observable<string> = this.token$.asObservable()

  private tokenSubject = new Subject<string>()

  config: SymmetricConfig = {
    os: 'linux',
    user_agent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    resolution: '1080x920'
  }

  private http: HttpClient
  constructor (private handler: HttpBackend) {
    this.http = new HttpClient(handler)
  }

  resolve () {
    const encryptionService = new EncryptionService(symmetricKey)
    const encryptedData = encryptionService.encrypt(this.config)
    return this.fetchToken(encryptedData).subscribe()
  }

  get token () {
    return this.token$.value
  }

  fetchToken (
    acknowledgmentValue: string
  ): Observable<ApiSingleResponse<Token>> {
    const acknowledgment: Acknowledgment = {
      acknowledgment: acknowledgmentValue
    }
    return new Observable(subscriber => {
      this.http
        .post<ApiSingleResponse<Token>>(
          this.api + '/authorize/create',
          acknowledgment,
          {
            headers: {
              Accept: 'application/json',
              'Client-Token': clientToken
            }
          }
        )
        .subscribe({
          next: res => {
            this.token$.next(res.value['Authorization-Token'])
            this.setToken(res.value['Authorization-Token'])
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

  updateData (newData: string) {
    this.token$.next(newData)
  }

  public getToken (): Observable<string> {
    return this.tokenSubject.asObservable()
  }

  public setToken (token: string) {
    return this.tokenSubject.next(token)
  }

  saveTokenToLocalStorage (token: string) {
    localStorage.setItem('token', token)
  }

  signOutLocally () {
    localStorage.clear()
  }
}
