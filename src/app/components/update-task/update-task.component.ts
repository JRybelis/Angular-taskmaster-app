import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ITask } from 'src/app/ITask';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  @Input() task!: ITask;
  @Output() onUpdateTask: EventEmitter<ITask> = new EventEmitter();
  id?: number;
  text!: string;
  day!: string;
  reminder: boolean = false;
  showUpdateTaskForm: boolean = false;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showUpdateTaskForm = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please add a task to update!');
      return;
    }
    const updatedTask = {
      id: this.task.id,
      text: this.text,
      day: this.day,
      reminder: this.reminder,
      //ima iš ngmodel html'e
    };

    this.onUpdateTask.emit(updatedTask);

    this.text = '';
    this.day = '';
    this.reminder = false; //what to do with this when it replaces the placeholder immediately?
  }
}
