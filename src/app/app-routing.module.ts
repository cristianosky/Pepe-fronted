import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { AdminGuard } from './core/guard/admin.guard';
import { AuthGuardGuard } from './core/guard/auth-guard.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'perfil', canActivate: [AuthGuardGuard] ,loadChildren: () => import('./core/perfil/perfil.module').then(m => m.PerfilModule) },
  { path: 'inicio', loadChildren: () => import('./core/inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'categoria/:id', loadChildren: () => import('./core/categoria/categoria.module').then(m => m.CategoriaModule) },
  { path: 'admin', canActivate:[AdminGuard], loadChildren: () => import('./core/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
