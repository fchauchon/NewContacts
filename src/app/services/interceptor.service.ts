import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    token = null;

    constructor(private dataService: DataService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url !== '/authen') {
            if (this.token === null) {
                this.token = this.dataService.getToken();
            }
            const clone = req.clone({ setHeaders: { Authorization: `token ${this.token}` }});
            return next.handle(clone);
        }
  }
}
