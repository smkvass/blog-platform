import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostListComponent } from './post-list/post-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostListComponent }
];
