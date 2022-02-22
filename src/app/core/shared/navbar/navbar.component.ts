import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service';
import { SweealertService } from '../../service/sweealert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  datos:any
  categorias:any[] = []
  logiado:boolean = false
  admin:boolean = false
  constructor(private _categoriaService:CategoriaService, private _swalAlert: SweealertService, private router: Router) { }

  ngOnInit(): void {
    let tem:any = localStorage.getItem('usuario')
    this.datos = JSON.parse(tem)
    if(this.datos)this.logiado = true 
    if(this.datos.rol == 1) this.admin = true
    console.log(this.datos)
    this.getcategoria()
  }

  getcategoria(){
    this._categoriaService.getCategoria().subscribe((resp:any)=>{
      if(resp.status){
        this.categorias = resp.datos
      }else{
        this._swalAlert.alertaError("No hay categoria", 3000)
      }
    }, (err)=>{
      this._swalAlert.alertaError("Error desconocido vuelva a intentar", 3000)
    })
  }

  salir(){
    localStorage.clear()
    this.router.navigate(['login'])
    this.logiado = false
  }

}
