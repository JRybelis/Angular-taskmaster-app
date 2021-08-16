import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITask } from '../ITask';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTaskForm: boolean = false;
  private showUpdateTaskForm: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddTaskForm = !this.showAddTaskForm;
    this.subject.next(this.showAddTaskForm);
  }

  toggleUpdateTask(task: ITask) {
    // ar būtina paduoti task kai togglini šitą? ar reik task paduot update-task formoje tik?
    this.showUpdateTaskForm = !this.showUpdateTaskForm;
    this.subject.next(this.showUpdateTaskForm);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
