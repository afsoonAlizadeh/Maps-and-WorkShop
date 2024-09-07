import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clientToken } from '../../enviroments/enviroment.env';

@Injectable(
)
export class AcknowledgmentInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({ 
      setHeaders: { 
        'Accept' : 'application/json',
        'Client-Token': clientToken
      }
    });

    return next.handle(request);
  }
}