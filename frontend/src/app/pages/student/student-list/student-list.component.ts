import { Component, DestroyRef, inject } from '@angular/core';
import { StudentService } from '../../../core/service/student-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { Student } from '../../../core/models/Student';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-student-list',
  imports: [RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  constructor(private router: Router) { }
  
  private studentService = inject(StudentService);
  private destroyRef = inject(DestroyRef);
  students!: Student[];

  ngOnInit(): void {
    this.studentService.getStudents()
      .subscribe((students: Student[]) => this.students = students);
  }

  onDeleteStudent(id: number): void {
    this.studentService.deleteStudent(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      () => {
        alert('Student deleted.');
        location.reload();
      },
    );
  }
}
