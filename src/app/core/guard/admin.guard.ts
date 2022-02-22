import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let admin:boolean = false
      let dataSinP:any = localStorage.getItem('usuario')
      let data = JSON.parse(dataSinP)
      if(data.rol == 1){
        admin = true
      }else{
        this.router.navigate(['/inicio']).then(() => false);
      }
    return admin;
  }
  
}
