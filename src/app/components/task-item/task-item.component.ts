import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../ITask';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  tasks: ITask[] = [];
  @Input() task!: ITask;
  @Input() updatedTask?: ITask;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;

  subscription?: Subscription; // ar čia nereikia = new Subscription()?
  showUpdateTaskForm?: boolean = false;

  @Output() onDeleteTask: EventEmitter<ITask> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<ITask> = new EventEmitter();

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showUpdateTaskForm = value));
  }

  ngOnInit(): void {}

  toggleUpdateTask(task: ITask) {
    this.uiService.toggleUpdateTask(task);
  }

  onDelete(task: ITask) {
    this.onDeleteTask.emit(task);
  } // maybe change ITask to any ?

  onUpdate(updatedTask: ITask) {
    this.taskService
      .updateTask(updatedTask)
      .subscribe(() => this.tasks.push(updatedTask));
  }

  onToggle(task: ITask) {
    this.onToggleReminder.emit(task);
  }
}
