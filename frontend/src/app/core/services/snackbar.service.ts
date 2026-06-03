import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar)

  showSnackBar(msg:string){
    let durationInSeconds = 5;
    msg = msg || 'Something Went Wrong, please try after sometime'
    this.snackBar.open(msg,'', {
      duration: durationInSeconds * 1000,
    });
  }
}
