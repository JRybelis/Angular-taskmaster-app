import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ITask } from 'src/app/ITask';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<ITask> = new EventEmitter();
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTaskForm: boolean = false;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTaskForm = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false; //what to do with this when it replaces the placeholder immediately?
  }
}
