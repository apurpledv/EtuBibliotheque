import { Component, DestroyRef, inject } from '@angular/core';
import { StudentService } from '../../../core/service/student-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../core/models/Student';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialModule } from '../../../shared/material.module';
import { NgClass, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-add',
  imports: [RouterLink, NgClass, MaterialModule],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent {
  constructor(private router: Router) { }
  
  private studentService = inject(StudentService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  studentAddForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  ngOnInit() {
    this.studentAddForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      },
    );
  }

  get form() {
    return this.studentAddForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentAddForm.invalid) {
      return;
    }
    const student: Student = {
      id: 0,
      firstName: this.studentAddForm.get('firstName')?.value,
      lastName: this.studentAddForm.get('lastName')?.value
    };
    this.studentService.addStudent(student)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      () => {
        alert('Student added.');
        this.router.navigateByUrl('student-list');
      },
    );
  }

  onReset(): void {
    this.submitted = false;
    this.studentAddForm.reset();
  }
}
