import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { EventsComponent } from './events/events.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { LoginComponent } from './login/login.component';
import { EventaddComponent } from './eventadd/eventadd.component';
import { AdminGuard ,adminguardout} from 'src/app/guard/admin.guard';


const routes: Routes = [
  {path:"",component:LoginComponent,canActivate:[AdminGuard]},
  {path:"login",component:LoginComponent,canActivate:[AdminGuard]},
  {path:"users",component:UsersComponent,canActivate:[adminguardout]},
  {path:"events",component:EventsComponent,canActivate:[adminguardout]},
  {path:"useredit",component:UserEditComponent,canActivate:[adminguardout]},
  {path:"eventedit",component:EventEditComponent,canActivate:[adminguardout]},
  {path:"eventadd",component:EventaddComponent,canActivate:[adminguardout]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingRoutingModule { }
