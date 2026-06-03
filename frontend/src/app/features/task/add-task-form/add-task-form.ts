import { Component,inject, output, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { TasksService } from '../../../core/services/tasks.service.ts';
import { SnackbarService } from '../../../core/services/snackbar.service.js';

@Component({
  selector: 'app-add-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-form.html',
  styleUrl: './add-task-form.css',
})
export class AddTaskForm {
  private fb = inject(FormBuilder)
  private tasksService = inject(TasksService)
  private snackbar = inject(SnackbarService)

  taskCreated = output<any>()

  //Form
  taskForm = this.fb.group({
    title : ['',[Validators.required, Validators.minLength(3)]],
    // completed : ['']
  })

  addTask(){
    console.log(this.taskForm.value)
    
    let data= {
      title : this.taskForm.value.title
    }

    this.tasksService.addTask(data).subscribe({
      next : (response:any)=> {
        // this.msg.set('task added successfully')
        console.log(response)
        this.snackbar.showSnackBar('Task Created Successfully')
        this.taskCreated.emit(response.task)
          // this.tasks.update(tasks=> [response,...tasks]) check this one later
          this.taskForm.reset()
      },
      error: (error)=>{
        // alert(error.error);
        console.log(error)
        this.snackbar.showSnackBar('Unable to create Task, please try after sometime')
      }
    })
  }

}
