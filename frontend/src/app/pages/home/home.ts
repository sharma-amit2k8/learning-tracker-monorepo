import { Component, importProvidersFrom, inject, signal, OnInit } from '@angular/core';
import { task } from '../../models/task.model.js';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';

import { CourseList } from '../../features/courses/course-list/course-list.js';
import { TaskCard } from '../../features/task/task-card/task-card.js';
import { AiWidget } from '../../shared/components/ai-widget/ai-widget.js';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, MatButtonModule, CourseList, TaskCard, AiWidget],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
 

  
}
