import { Injectable } from '@angular/core';
import { ITask } from 'src/app/ITask';
import { ArrayOfTasks } from 'src/app/mock-tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTasks(): ITask[] {
    return ArrayOfTasks;
  }
}
