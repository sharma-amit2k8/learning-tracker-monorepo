import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { EditCourseModal } from '../edit-course-modal/edit-course-modal';

import { CoursesService } from '../../../core/services/courses.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, MatIcon, MatDialogModule ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  private courseService = inject(CoursesService);
  private snackbar = inject(SnackbarService);
  private dialog = inject(MatDialog)
  // private dialogRef = inject(MatDialogRef<EditCourseModal>)

  course = input<any>()
  onDelete = output()
  onUpdate = output()

  progress = computed(() =>{
    if(this.course().totalLessons>0){
      const percentage = Math.round((this.course().completedLessons/this.course().totalLessons)*100)
      return percentage
    } else{
      return 0
    }
  })

  deleteCourse(course: any) {
    this.dialog.open( ConfirmDialog, {
      width : '450px',
      data : course
    })
    .afterClosed()
    .subscribe({
      next : (response)=> {
        if (response) {
          this.courseService.deleteCourse(course._id).subscribe({
            next: (response) => {
              this.snackbar.showSnackBar('Course Deleted Successfully')
              this.onDelete.emit()
            },
            error: (error) => {
              console.log(error)
              this.snackbar.showSnackBar('Course Deletion Failed')
            }
          })
        }
    },
    error : (error) => {
      console.log(error)
    }
    })
  }

  editCourse(course: any) {
    const dialogRef = this.dialog.open(EditCourseModal, {
      width: '500px',
      data: course,
      // autoFocus: true
    });

    dialogRef.afterClosed().subscribe((response)=> {
      if(response){
        this.onUpdate.emit()
      }
    })
  }

  // onclose() {
  //   this.dialogRef.close()
  // }
}