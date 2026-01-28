import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpClient: HttpClient) { }
  
  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('/api/students');
  }

  getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>('/api/student/' + id);
  }

  addStudent(student: Student): Observable<Object> {
    return this.httpClient.post('/api/student', student);
  }

  updateStudent(id: number, student: Student): Observable<Object> {
    return this.httpClient.put('/api/student/' + id, student);
  }

  deleteStudent(id: number): Observable<Object> {
    return this.httpClient.delete('/api/student/' + id);
  }
}
