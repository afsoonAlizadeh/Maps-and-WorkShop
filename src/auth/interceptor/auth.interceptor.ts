import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { TokenService } from '../services/token.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor (private tokenService: TokenService) {}

  get token () {
    return this.tokenService.token
  }

  intercept (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        Accept: 'application/json',
        'Client-Token':
          '$2y$10$c4TlcxkyFyYSm7NlbWXiGurTYDfcDKrxW9oQ6fYNfqDkUPIcNNXoO',
        'Authorization-Token': this.token
      }
    })

    return next.handle(request)
  }
}
