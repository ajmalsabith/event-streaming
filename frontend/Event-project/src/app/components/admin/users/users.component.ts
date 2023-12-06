import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  userdata:any
  isShow=true
  searchtext=''
 
  registerform!:FormGroup

  constructor(
    private userservice: FullserviceService,
    private router: Router,
    private toaster:ToastrService
  ) {}
  ngOnInit(): void {
    this.userservice.getUser().subscribe((res)=>{
      
      this.userdata=res.data
      
    },(err)=>{
      this.toaster.error(err.message)
    })
    
    this.registerform= new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })

  }



  cancelshow(){
    this.isShow=true
  }

  edit(email:string){
    this.router.navigate(['admin/useredit'],{queryParams:{email}})
  }

  delete(email:string){

    this.userservice.deleteUser(email).subscribe((res)=>{
      this.toaster.success(' deletion success ')
      this.ngOnInit()
    },(err)=>{
      this.toaster.error(err.error.message)
    })

  }
  
  adduser(){
    this.isShow=false
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

    this.userservice.postregister(user).subscribe(
      (res) => {
        const token=res.token
        localStorage.setItem("usersecret",token)
        this.toaster.success(res.message)
        this.isShow=true
        this.ngOnInit()
      },
      (err) => {
        this.toaster.error(err.error.message)
      }
    );
  }


}
