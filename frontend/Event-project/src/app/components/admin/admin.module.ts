import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingRoutingModule } from './admin-routing-routing.module';
import { UsersComponent } from './users/users.component';
import { EventsComponent } from './events/events.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { EventEditComponent } from './event-edit/event-edit.component'
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import { LoginComponent } from './login/login.component';
import { EventaddComponent } from './eventadd/eventadd.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';




@NgModule({
  declarations: [
    LoginComponent,
    UsersComponent,
    EventsComponent,
    UserEditComponent,
    EventEditComponent,
    NavbarComponent,
    EventaddComponent,
    SearchPipe


  ],
  imports: [
    CommonModule,
    AdminRoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
   
  ]
})
export class AdminModule { }
