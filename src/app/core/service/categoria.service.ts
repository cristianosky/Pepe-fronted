import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = environment.url

  constructor(private http:HttpClient) { }

  getCategoria(){
    return this.http.get(`${this.url}getcategorias`)
  }
}
