import { Component, OnInit } from '@angular/core';
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

  constructor(private _categoriaService:CategoriaService, private _swalAlert: SweealertService) { }

  ngOnInit(): void {
    let tem:any = localStorage.getItem('usuario')
    this.datos = JSON.parse(tem)
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

}
