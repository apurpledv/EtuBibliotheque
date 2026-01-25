import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MockStudentService } from '../mock/MockStudentService';
import { StudentService } from '../../core/service/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Student } from '../../core/models/Student';
import { StudentAddComponent } from '../../pages/student/student-add/student-add.component';

describe('Student-Edit Unit Tests', () => {
  let component: StudentAddComponent;
  let fixture: ComponentFixture<StudentAddComponent>;

  let route: ActivatedRoute;

  let studentService: MockStudentService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        providers: [
            { provide: StudentService, useClass: MockStudentService },
            { provide: ActivatedRoute, useValue: {} }
        ]
    });

    fixture = TestBed.createComponent(StudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    studentService = TestBed.inject(StudentService) as MockStudentService;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an adding form, with a first and last name fields', () => {
    const firstName = document.querySelector('input[type="text"]');
    const lastName = document.querySelector('input[type="text"]');
    
    expect(firstName).toBeEmptyDOMElement();
    expect(lastName).toBeEmptyDOMElement();
  });
});
