import { Component, OnInit, Input } from '@angular/core';
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
  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}
}
