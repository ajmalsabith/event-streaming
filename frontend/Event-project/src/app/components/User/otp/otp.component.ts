import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{

  
  inputval:any=""
  message=''
  email=''
  constructor(
    private userservice: FullserviceService,
    private router: Router,
    private toaster:ToastrService,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
  }

  submit():any{

    let otp= this.inputval
    console.log(otp+'===is');
    
    if(this.inputval==""){
      return this.toaster.error('please fill otp')
    }
    console.log(otp);
   
    
    this.userservice.postotp(otp).subscribe(
      (res) => {
        this.toaster.success(res.message)
        this.router.navigate(['home']);
      },
      (err) => {
        this.message = err.error.message;
        this.toaster.error(err.error.message)
      }
    )
  }
  
  
}
