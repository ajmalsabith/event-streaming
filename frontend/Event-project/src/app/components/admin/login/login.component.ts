import { Component ,OnInit} from '@angular/core';
import {FormGroup,FormControl, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 
  loginform!: FormGroup;
  message = '';

  constructor(
    private userservice: FullserviceService,
    private router: Router,
    private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.loginform= new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }

  get email(){
    return this.loginform.get('email')
  }

  get password(){
    return this.loginform.get('password')
  }

  submit() {

    const user = this.loginform.getRawValue();

    this.userservice.postadminlogin(user).subscribe(
      (res) => {
        const token=res.token
        localStorage.setItem("adminsecret",token)
        this.toaster.success(res.message)
        this.router.navigate(['admin/users'])
      },
      (err) => {
        this.message = err.error.message;
        this.toaster.error(err.error.message)
      }
    );
  }
}
