import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{


  editregisterform!:FormGroup
  userdata:any
  emaildata=''
  useremail:string=''
  username:string=''
  userphone!:number
  userpassword:string=''
  useris_verified!:boolean
  constructor(
    private userservice: FullserviceService,
    private router: Router,
    private toaster:ToastrService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.emaildata = params['email'];
      console.log('Email:', this.emaildata);
    });


    this.userservice.useredit(this.emaildata).subscribe((res)=>{
      this.useremail=res.data.email
      this.username=res.data.name
      this.userphone=res.data.phone
      this.userpassword=res.data.password
      this.useris_verified=res.data.is_verified
      
    },(err)=>{
      this.toaster.error(err.message)
    })
    
    this.editregisterform= new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      is_verified: new FormControl('',[Validators.required])
    })

  }

  
  get email(){
    return this.editregisterform.get('email')
  }

  get password(){
    return this.editregisterform.get('password')
  }

  get name(){
    return this.editregisterform.get('name')
  }
  get phone(){
    return this.editregisterform.get('phone')
  }
  get is_verified(){
    return this.editregisterform.get('is_verified')
  }
  

  submit() {

    const user = this.editregisterform.getRawValue();
    user.ogemail=this.emaildata
    console.log(user);
    

    this.userservice.postedit(user).subscribe(
      (res) => {
        this.toaster.success(res.message)
        this.router.navigate(['admin/users'])
        
      },
      (err) => {
        this.toaster.error(err.error.message)
      }
    );
  }



}
