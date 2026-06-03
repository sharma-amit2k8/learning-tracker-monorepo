import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class authService {
  private http = inject(HttpClient)
  private router = inject(Router)
  isLoggedIn = signal(false)
  baseURL = environment.baseURL;
  loginURL = this.baseURL + '/login';
  
  login(data:any){
    this.isLoggedIn.set(true)
    return this.http.post(this.loginURL, data)
  }

  signup(data: any){
    return this.http.post(`${this.baseURL}/signup`,data)
  }

  checkToken(){
    const token = localStorage.getItem('token')
    if(token){
      return true
    }
    return false
  }

  // isLoggedIn(){
  //   const token = this.auth.checkToken()
  //   if(token){
  //     this.loggedIn.set(true)
  //   }

  // }

  logout() : boolean{
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.isLoggedIn.set(false)
      return true
    }
    return false
  }
}
