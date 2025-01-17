import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AcknowledgmentInterceptorService } from './interceptor/acknowledgment.interceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AcknowledgmentInterceptorService, multi: true },
  ]
})
export class AuthModule {}
