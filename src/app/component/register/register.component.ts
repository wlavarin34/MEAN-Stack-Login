import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../service/validate.service';
import { AuthService } from '../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   
  name: String;
  username: String;
  email: String;
  password: String;


  constructor(
    private validateService:ValidateService, 
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    var user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    if(!this.validateService.validateRegister(user)){
        this.flashMessage.show('Please fill in ALL fields. Thank you', {cssClass: 'alert-danger', timeout:3000});
        return false;
    }

    if(!this.validateService.validtateEmail(user.email)){
      this.flashMessage.show('Please enter a valid email. Thank you', {cssClass: 'alert-danger', timeout:3000});
      return false;
  }

  //Register
    this.authService.registerUser(user).subscribe(data =>{
      if(data.sucess){
        this.flashMessage.show('Registration Successful', {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Registration Failed', {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/register']);
      }
  });

  }
}
