import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  singUp() {
    this.userService.loginWithGoogleAuth()
      .then((res) => {
        this.router.navigate([''])
      })
      .catch((e) => { console.log(e) })
  }
}
