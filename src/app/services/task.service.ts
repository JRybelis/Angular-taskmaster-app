import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/ITask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  deleteTask(task: ITask): Observable<ITask> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<ITask>(url);
  }
}
