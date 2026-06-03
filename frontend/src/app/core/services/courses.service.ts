import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http= inject(HttpClient)
 
  getMyCourses(){
    return this.http.get(`${environment.baseURL}/myCourses`)
  }

  createCourse(data:any){
    return this.http.post(`${environment.baseURL}/course`,data)
  }

  deleteCourse(id:any){
    return this.http.delete(`${environment.baseURL}/${id}`)
  }

  updateCourse(data :any, courseId: string){
    return this.http.patch(`${environment.baseURL}/${courseId}`, data)
  }
}
