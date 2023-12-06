import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AdminGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const jwtToken = localStorage.getItem('adminsecret');
    if (jwtToken) {      
      this.router.navigate(['admin/users'])
      return false
    }else{
      return true
    }

    return true
  }
}



@Injectable({
  providedIn: 'root',
})

export class adminguardout{

  constructor(private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const jwtToken = localStorage.getItem('adminsecret');

    if (!jwtToken) {
      this.router.navigate(['admin/login'])
      return false
    }else{
      return true
    }

    return true
  }
}


