import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.url

  constructor(private http:HttpClient) { }

  ingregsar(body:any){
    return  this.http.post(`${this.url}ingresar`, body);
  }

  registrar(body:any){
    return this.http.post(`${this.url}crearusurio`, body)
  }

}
