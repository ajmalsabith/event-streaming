import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('../app/components/User/user-module.module').then(user=>user.UserModuleModule)},
  {path:'admin',loadChildren:()=>import('../app/components/admin/admin.module').then(admin=>admin.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
