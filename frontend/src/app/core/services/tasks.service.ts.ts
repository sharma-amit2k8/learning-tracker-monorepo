import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http= inject(HttpClient)
  
  getTasks(){
    return this.http.get(`${environment.baseURL}/tasks`)
  }

  addTask(data: any){
    return this.http.post(`${environment.baseURL}/task`, data)
  }

  updateTaskCompletion(task: any){
    return this.http.patch(`${environment.baseURL}/task/${task._id}/complete`,{})
  }

  updateTaskTitle(task:any){
    return this.http.patch(`${environment.baseURL}/task/${task._id}`,{ title : task.title})
  }

  deletetask(task:any) {
    return this.http.delete(`${environment.baseURL}/task/${task._id}`)
  }
}
