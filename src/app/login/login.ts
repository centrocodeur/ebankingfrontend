import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  loginForm!: FormGroup;


  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }


  handleLogin() {

    let username= this.loginForm.value.username;
    let password= this.loginForm.value.password;
    this.authService.login( username, password).subscribe({
      next: data=>{
          console.log(data);
          this.authService.loadProfile(data)
          this.router.navigateByUrl("/admin");
      },
      error: err => {console.log(err)}
    });


  }
}
