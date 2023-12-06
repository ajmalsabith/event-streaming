import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform!: FormGroup;
  message = '';

  constructor(
    private userservice: FullserviceService,
    private router: Router,
    private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.registerform= new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }

  get email(){
    return this.registerform.get('email')
  }

  get password(){
    return this.registerform.get('password')
  }

  get name(){
    return this.registerform.get('name')
  }
  get phone(){
    return this.registerform.get('phone')
  }

  submit() {

    const user = this.registerform.getRawValue();
    let useremail=user.email
    this.userservice.postregister(user).subscribe(
      (res) => {
        const token=res.token
        localStorage.setItem("usersecret",token)
        this.toaster.success(res.message)
        this.toaster.success('otp sent to your email')
        this.router.navigate(['/otp']);
      },
      (err) => {
        this.message = err.error.message;
        this.toaster.error(err.error.message)
      }
    );
  }

}
