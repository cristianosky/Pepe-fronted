import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  FormsLogin!:FormGroup
  FormsRegis!:FormGroup
  mensaje!:string
  horisontal:MatSnackBarHorizontalPosition = 'center'
  vertical:MatSnackBarVerticalPosition = 'top'

  constructor(
    private _Ls: LoginService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if(token != null){
      this.router.navigate(['perfil'])
    }else{
      this.initForms();
      this.initFoR()

    }
  }

  initForms(){
    this.FormsLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]]
    })
  }

  initFoR(){
    this.FormsRegis = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpass: ['', [Validators.required]]
    })
  }

  logarte(){
    const {correo, password} = this.FormsLogin.value

    const body = {
      correo: correo,
      password: password
    }

    this._Ls.ingregsar(body).subscribe((resp:any)=>{
      if(resp.status){
        let token = resp.datos.token
        localStorage.setItem('token', token)
        let datos = JSON.stringify(resp.datos.perfil)
        localStorage.setItem('usuario', datos);
        this.router.navigate(['inicio']);
      }else{
        this.openSnackBar(resp.mensaje)
      }
    })
  }

  openSnackBar(mensaje:any) {
    this._snackBar.open(mensaje, 'X', {
      duration: 3*1000,
      horizontalPosition: this.horisontal,
      verticalPosition: this.vertical,
      panelClass: ['snackbag']
    });
  }

  registar(){
    if(this.FormsRegis.value.password != this.FormsRegis.value.confirmpass){
      this.openSnackBar('Las contraseñas no coinsiden')
      return
    }else{
      const body = {
        name : this.FormsRegis.value.nombre,
        email: this.FormsRegis.value.correo,
        password: this.FormsRegis.value.password
      }
      this._Ls.registrar(body).subscribe((resp:any)=>{
        if(resp.status){
          localStorage.setItem('token', resp.datos)
          let datos = JSON.stringify(resp.datos.perfil)
          localStorage.setItem('usuario', datos);
          this.router.navigate(['inicio']);
        }else{ 
          this.openSnackBar('Hubo un error al momento de iniciar')
        }
      })
    }
  }

}
