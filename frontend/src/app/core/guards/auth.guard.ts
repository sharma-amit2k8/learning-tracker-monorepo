import { CanActivateFn, Router } from "@angular/router";
import { authService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
    const auth = inject(authService)
    const router = inject(Router)
    
    const token = auth.checkToken()
    if(token){
        return true
    }

    console.log('Please Login first')
    router.navigate(['/login']);
    return false
}

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const token = localStorage.getItem('token');
//   if (token) {
//     return true;
//   }
//   router.navigate(['/login']);
//   return false;
// };