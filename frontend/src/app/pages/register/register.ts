import { Component, inject, signal, Signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Loader } from '../../shared/components/loader/loader';
import { MatIcon } from '@angular/material/icon';
//Services
import { SnackbarService } from '../../core/services/snackbar.service';
import { authService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, Loader, MatIcon],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // signupForm = new FormGroup({
  //   name : new FormControl(''),
  //   email : new FormControl(''),
  //   password: new FormControl('')
  // })

  private fb = inject(FormBuilder)
  private auth = inject(authService)
  private router = inject(Router)
  private snackbar = inject(SnackbarService)

  loading = signal(false)
  showPassword = signal(false)
  showConfirmPassword = signal(false)

  signupForm = this.fb.group({
    name : ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    confirmPassword : ['',[Validators.required, Validators.minLength(6)]]
  })

  onSubmit(){
    this.loading.set(true)
    const data = {
      name : this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }

    this.auth.signup(data).subscribe({
			  next: (response:any)=> {
				console.log(response.message)
        this.snackbar.showSnackBar(`${response.message}, Please login`)
        this.loading.set(false)
				this.router.navigate(['/login'])
        // this.auth.login({
        //   email : response.user.email,
        //   password : this.password
        // })
			  },
			  error: (error)=> {
				console.log(error)
				this.snackbar.showSnackBar('Signup Failed, please try again after sometime')
        this.loading.set(false)
			  }
			})
    // this.signupForm.reset()
  }

  // showPassword(){

  // }
}
