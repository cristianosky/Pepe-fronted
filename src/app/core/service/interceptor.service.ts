import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token:any = localStorage.getItem('token')
    if(token != null){
      const headers = new HttpHeaders({
        "Authorization": token
      })
      const reqClone = req.clone({
        headers: headers
      })
      return next.handle(reqClone);
    }else{
      return next.handle(req);
    }
  }
}
