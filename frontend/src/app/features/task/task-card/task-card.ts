import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
//services
import { TasksService } from '../../../core/services/tasks.service.ts';
import { SnackbarService } from '../../../core/services/snackbar.service.js';

import { Loader } from '../../../shared/components/loader/loader.js';
import { AddTaskForm } from '../add-task-form/add-task-form.js';
import { task } from '../../../models/task.model';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-card',
  imports: [NgClass, MatIcon, FormsModule, ReactiveFormsModule, Loader, AddTaskForm],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
   //Services
  private tasksService = inject(TasksService)
  private snackbar = inject(SnackbarService)

  //Signals
  tasks = signal<any[]>([])
  loading = signal(false)
  msg = signal('')
  showTaskForm = signal(false)
  editingTaskId = signal<string | null>(null);

  ngOnInit(){
    this.loading.set(true)
    this.getTasks()
  }

  onShowTaskForm(){
    this.showTaskForm.set(!this.showTaskForm())
  }

  getTasks(){
    this.tasksService.getTasks().subscribe({
      next: (response:any)=> {
        // this.snackbar.showSnackBar('Tasks Fetched')
        console.log(response)
        this.tasks.set(response.tasks)
        if(this.tasks().length >0){
          this.msg.set('My Tasks:')
        }
        console.log(this.tasks)
        this.loading.set(false)
      },
      error : (error)=>{
        console.log(error)
        this.loading.set(false)
        this.msg.set('Unable to Fetch Tasks, please try afte sometime')
        this.snackbar.showSnackBar('Unable to Fetch Tasks, please try afte sometime')
      }
    })
  }

  addTask(){
    this.showTaskForm.set(false)
    this.getTasks()
  }
  
  toggleCompletion(task: task){
    this.tasksService.updateTaskCompletion(task).subscribe({
      next : (response:any)=> {
        this.snackbar.showSnackBar(response.message)
        this.getTasks()
      },
      error : (error)=>{
        alert(error.message)
      }
    })

  }

  editTask(task:any){
    this.editingTaskId.set(task._id)
  }

  updateTask(task:any){
    this.tasksService.updateTaskTitle(task).subscribe({
      next : (response)=>{
        this.snackbar.showSnackBar('Task updated Successfully')
        this.editingTaskId.set(null)
      },
      error: (error)=>{
        console.log(error);
        this.snackbar.showSnackBar('Task updation failed')
      }
    })
  }

  cancelUpdate(){
    this.editingTaskId.set(null)
  }
    
  deleteTask(task: any){
    this.tasksService.deletetask(task).subscribe({
      next : (response:any)=>{
        console.log('task deleted',response)
        this.snackbar.showSnackBar(response.message)
        this.getTasks()
      }, 
      error : (error)=> {
        console.log(error)
        this.snackbar.showSnackBar('Failed to delete task, please try after sometime')
      },

    })
  }
}
