import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    token = '0123456789';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url !== '/authen') {

            const clone = req.clone({ setHeaders: { Authorization: `token ${this.token}` }});
            return next.handle(clone);
        }
  }
}
