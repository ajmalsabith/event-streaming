import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';



@Injectable({
  providedIn: 'root',
})

export class userguardin{

  constructor(private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const userToken = localStorage.getItem('usersecret');

    if (userToken) {
      this.router.navigate(['/home'])
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

export class userguardout{

  constructor(private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const userToken = localStorage.getItem('usersecret');

    if (!userToken) {
      this.router.navigate(['/login'])
      return false
    }else{
      return true
    }

    return true
  }
}


