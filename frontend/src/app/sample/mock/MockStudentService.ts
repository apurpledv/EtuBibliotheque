import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../core/models/Student';

@Injectable({
  providedIn: 'root'
})
export class MockStudentService {
  getStudents(): Observable<Student[]> {
    return new Observable<Student[]>;
  }

  getStudent(id: number): Observable<Student> {
    return new Observable<Student>;
  }

  addStudent(student: Student): Observable<Object> {
    return new Observable<Object>;
  }

  updateStudent(id: number, student: Student): Observable<Object> {
    return new Observable<Object>;
  }

  deleteStudent(id: number): Observable<Object> {
    return new Observable<Object>;
  }
}
