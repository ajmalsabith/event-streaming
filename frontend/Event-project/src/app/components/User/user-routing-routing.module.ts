import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { HomeComponent } from './home/home.component';
import { ShowvideoComponent } from './showvideo/showvideo.component';
import {userguardin,userguardout} from 'src/app/guard/user.guard'

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[userguardout]},
  {path:"home",component:HomeComponent,canActivate:[userguardout]},
  {path:"login",component:LoginComponent,canActivate:[userguardin]},
  {path:"register",component:RegisterComponent,canActivate:[userguardin]},
  {path:"otp",component:OtpComponent},
  {path:"show",component:ShowvideoComponent,canActivate:[userguardout]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingRoutingModule { }
