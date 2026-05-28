import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from './services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements  OnInit{
  protected readonly title = signal('digital-banking-webapp')

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
   this.authService.loadJwtTokenFromLocalStorage();

  }

}
