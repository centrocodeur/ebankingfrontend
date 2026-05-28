import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar  implements OnInit{

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }


  handleLogout() {
    this.authService.logout();
    //this.router.navigateByUrl("/login");
  }
}
