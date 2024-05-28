import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token')
  if(!token){
    let route = new Router();
    route.navigate(['signin']);
    return false
  }

  return true
};
