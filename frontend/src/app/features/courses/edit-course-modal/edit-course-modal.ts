import { Component, inject, output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { CoursesService } from '../../../core/services/courses.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-edit-course-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-course-modal.html',
  styleUrl: './edit-course-modal.css',
})
export class EditCourseModal {
  public data = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder)
  private coursesService = inject(CoursesService)
  private snackbar = inject(SnackbarService)
  private dialog = inject(MatDialogRef)
  // private dialog = inject(MatDialogRef<EditCourseModal>)

  // updateCourse = output()
  closeModal = output<boolean>()

  editCourseForm = this.fb.group({
    title : ['', Validators.required],
    desc : ['', Validators.maxLength(500)],
    price : [0, Validators.min(0)],
    status : ['not started'],
    totalLessons : [0, Validators.min(1)],
    completedLessons : [0, Validators.min(0)]
    // createdBy : []
  })

  ngOnInit(){
    this.editCourseForm.patchValue ({
      title: this.data.title,
      desc : this.data.description,
      status :  this.data.status,
      totalLessons :  this.data.totalLessons,
      completedLessons : this.data.completedLessons
    })
  }

  onSubmit( ){
    this.coursesService.updateCourse(this.editCourseForm.value, this.data._id).subscribe({
      next : (response)=>{
        this.snackbar.showSnackBar('Course Updated successfully')
        this.dialog.close(true)
        // this.updateCourse.emit()
      },
      error : (error)=>{
        console.log(error)
        this.snackbar.showSnackBar('Course updation failed')
      }
    })
  }

  onClose(){
    this.dialog.close()
  }
}
