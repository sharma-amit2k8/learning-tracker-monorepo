import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CoursesService } from '../../../core/services/courses.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-add-course-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course-modal.html',
  styleUrl: './add-course-modal.css',
})
export class AddCourseModal {
  modalClosed = output<boolean>()
  refresh = signal(false) 

  private fb = inject(FormBuilder)
  private coursesService = inject(CoursesService)
  private snackbar = inject(SnackbarService)

  addCourseForm = this.fb.group({
    title : ['', Validators.required],
    desc : ['', Validators.maxLength(500)],
    price : [0, Validators.min(0)],
    status : ['not started'],
    totalLessons : [1, Validators.min(0)],
    completedLessons : [0, Validators.min(1)]
    // createdBy : []
  })

  closeModal(refresh:boolean) {
    this.modalClosed.emit(refresh)
  }

  onSubmit() {
    if(this.addCourseForm.valid){
      const courseData = this.addCourseForm.value
      this.coursesService.createCourse(courseData).subscribe({
        next: (response)=>{
          console.log(response)
          this.snackbar.showSnackBar('Course Created Successfully')
          this.addCourseForm.reset()
          this.closeModal(true)
        },
        error : (error) => {
          console.log(error);
          this.snackbar.showSnackBar('Course Creation failed, please try again')
        }
      })
      // You can also add createdBy field here if needed
      // this.modalClosed.emit(courseData)
    }
  }
}
