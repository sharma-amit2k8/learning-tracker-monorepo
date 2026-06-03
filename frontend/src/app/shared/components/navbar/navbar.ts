import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

//Services
import { authService } from '../../../core/services/auth.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  public  auth = inject(authService)
  private router = inject(Router)
  private snackbar = inject(SnackbarService)
  username: string|null = '' 

  ngOnInit(){
    if(localStorage.getItem('name')){
      this.username = localStorage.getItem('name')
    } 
  }

  logout (){
    this.snackbar.showSnackBar('logging out..')

    if(this.auth.logout()){
      this.router.navigate(['/login'])
    } else {
      console.log('Logout failed')
    }
  }
}
