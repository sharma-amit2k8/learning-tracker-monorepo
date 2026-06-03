import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token')

  let updatedReq = req.clone({
    setHeaders : {
      'Authorization' : `Bearer ${token}`
    }
  })
 
  return next(updatedReq);
};
