import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
       '../../../node_modules/ng2-dnd/bundles/style.css',
    '../../../node_modules/flag-icon-css/css/flag-icon.min.css',
    '../../../node_modules/font-awesome/css/font-awesome.min.css',
    
  ]
})
export class LoginComponent implements OnInit {
  public errorMessage;
  public heroes;
  public message;
  public error: boolean = false;

  constructor(private router: Router,private loginService: LoginService) {
   }

  ngOnInit() {
    console.log('hello');
  }

  loginCheck(user){
    console.log(user);
    this.loginService.loginCheck(user).subscribe(
      resp => {
        if(resp.status == 200){
          this.router.navigate(['dashboard']);
        }else{
          this.error = true,
          this.message = resp.message;
        }
      },
      error =>  this.errorMessage = <any>error,
      );
    
  }

}
