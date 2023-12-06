import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingRoutingModule } from './user-routing-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { EventsListComponent } from './events-show/events-list.component';
import { ShowvideoComponent } from './showvideo/showvideo.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';




@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    NavbarComponent,
    EventsListComponent,
    ShowvideoComponent,
    SearchPipe,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    UserRoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModuleModule { }
