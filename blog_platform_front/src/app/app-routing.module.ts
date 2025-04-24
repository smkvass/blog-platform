// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // если нужно
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
