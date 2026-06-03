import { Component, inject, OnInit, signal } from '@angular/core';
//components
import { CourseCard } from '../course-card/course-card';
import { Loader } from '../../../shared/components/loader/loader';
import { AddCourseModal } from '../add-course-modal/add-course-modal';

//services
import { CoursesService } from '../../../core/services/courses.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-course-list',
  imports: [CourseCard, Loader, AddCourseModal],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit{
  myCourses = signal<any[]>([])
  loading = signal(false)
  showAddCourse = signal(false)

  private courseService = inject(CoursesService)
  private snackbar = inject(SnackbarService)

  ngOnInit(): void {
    this.getMyCourses()
  }

  getMyCourses(){
    this.loading.set(true)
    this.courseService.getMyCourses().subscribe({
      next : (response:any)=> {
        this.loading.set(false)
        this.myCourses.set(response.myCourses)
      },
      error : (error:any) => {
        this.snackbar.showSnackBar(error.errorMsg)
        this.loading.set(false)
      }
    })
  }

  showAddCourseModal(){
    this.showAddCourse.set(true)
  }

  hideAddCourseModal(refresh:boolean){
    this.showAddCourse.set(false)
    if(refresh){
      this.getMyCourses()
    }
  }
  
  // courseDeleted(){
  //   this.getMyCourses()
  // }
}
