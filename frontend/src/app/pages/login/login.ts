import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Loader } from '../../shared/components/loader/loader';
//Services
import { SnackbarService } from '../../core/services/snackbar.service';
import { authService } from '../../core/services/auth.service';
import { E } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule, MatProgressSpinnerModule, Loader],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  
  private auth = inject(authService)
  private router = inject(Router)
  private snackbar = inject(SnackbarService)

  loading = signal(false)
  errorMsg: string = ''

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(6)
    ])
  })

  ngOnInit(): void {
    if(this.auth.checkToken()){
      this.router.navigate(['/home'])
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackbar.showSnackBar('Form is Invalid')
      return
    }

    this.loading.set(true)
    this.errorMsg = ''

    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.auth.login(data).subscribe({
      next: (response: any) => {
        console.log('login successful', response)
        localStorage.setItem('token', response.token)
        localStorage.setItem('name', response.name)
        this.snackbar.showSnackBar('Login successful')
        this.loginForm.reset()

        this.router.navigate(['/home'])
      },
      error: (error) => {
        this.loading.set(false)
        this.errorMsg = `${error.error.message}`;
        console.log('login failed', error.error.message)
      },
      complete : ()=>{
        this.loading.set(false)
      }
    })
  }
}
