import { Component, DestroyRef, inject } from '@angular/core';
import { Student } from '../../../core/models/Student';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../core/service/student-service.service';

@Component({
  selector: 'app-student-edit',
  imports: [RouterLink, NgClass, MaterialModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent {
  constructor(private router: Router) { }
  private route = inject(ActivatedRoute);

  private studentService = inject(StudentService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  studentEditForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  id = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id = params['id'];
    });

    this.studentEditForm = this.formBuilder.group({
        id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
    });

    this.studentService.getStudent(this.id)
      .subscribe((student: Student) => {
        const tempStudent = student;
        
        this.studentEditForm.controls['id'].setValue(tempStudent.id);
        this.studentEditForm.controls['firstName'].setValue(tempStudent.firstName);
        this.studentEditForm.controls['lastName'].setValue(tempStudent.lastName);
      });
  }

  get form() {
    return this.studentEditForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentEditForm.invalid) {
      return;
    }
    const student: Student = {
      id: this.studentEditForm.get('id')?.value,
      firstName: this.studentEditForm.get('firstName')?.value,
      lastName: this.studentEditForm.get('lastName')?.value
    };
    this.studentService.updateStudent(student.id, student)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      () => {
        alert('Student updated.');
        this.router.navigateByUrl('student-list');
      },
    );
  }

  onReset(): void {
    this.submitted = false;
    this.studentEditForm.reset();
  }
}
