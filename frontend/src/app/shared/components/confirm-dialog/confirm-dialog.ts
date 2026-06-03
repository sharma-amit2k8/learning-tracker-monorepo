import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButton],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  private dialog = inject(MatDialogRef)
  public data  = inject(MAT_DIALOG_DATA)

  cancel(){
    this.dialog.close()
  }

  confirmDelete(){
    this.dialog.close(true)
  }

}
