import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports :[CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    const token = this.authService.getToken();
    if (token) {
      this.http.get<any>('http://localhost:8000/api/auth/user/').subscribe({
        next: (user) => {
          this.userName = user.name;
        },
        error: () => {
          this.userName = '';
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
