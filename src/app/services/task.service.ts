import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/ITask';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://localhost:44366/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  deleteTask(task: ITask): Observable<ITask> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<ITask>(url);
  }

  updateTaskReminder(task: ITask): Observable<ITask> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<ITask>(url, task, httpOptions);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task, httpOptions);
  }
}
