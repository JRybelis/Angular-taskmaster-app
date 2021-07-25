import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../ITask';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: ITask;
  @Output() onDeleteTask: EventEmitter<ITask> = new EventEmitter();
  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}

  onDelete(task: any) {
    this.onDeleteTask.emit(task);
  }
}
