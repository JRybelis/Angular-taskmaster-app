import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from 'src/app/ITask';
import { UiService } from 'src/app/services/ui.service';
import { TaskService } from 'src/app/services/task.service';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: ITask[] = [];
  @Input() task!: ITask;
  @Input() updatedTask?: ITask;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;

  subscription?: Subscription; // ar nereikia = new Subscription()?
  showUpdateTaskForm?: boolean = false;

  @Output() onDeleteTask: EventEmitter<ITask> = new EventEmitter();
  // @Output() onToggleReminder: EventEmitter<ITask> = new EventEmitter();

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showUpdateTaskForm = value));
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  onAdd(task: ITask) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  onUpdate(updatedTask: ITask) {
    this.taskService
      .updateTask(updatedTask)
      .subscribe(() => this.tasks.push(updatedTask));
  }

  toggleUpdateTask(task: ITask) {
    this.uiService.toggleUpdateTask(task);
  }

  // onDelete(task: ITask) {
  //   this.onDeleteTask.emit(task); //uztenka emitint ar reikia ir trint (deleteTask) sitam komponente?
  // }

  updateTask(task: ITask) {
    // onUpdate gal vadinas dabar? sutikrink su html
    // this.taskService.updateTask(task).subscribe((task) => this.tasks.push
  }

  deleteTask(task: ITask) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: ITask) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }
}
