import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MockStudentService } from '../mock/MockStudentService';
import { StudentService } from '../../core/service/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StudentEditComponent } from '../../pages/student/student-edit/student-edit.component';

describe('Student-Edit Unit Tests', () => {
  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;

  let route: ActivatedRoute;

  let studentService: MockStudentService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        providers: [
            { provide: StudentService, useClass: MockStudentService },
            { provide: ActivatedRoute, useValue: {params: of({id: 0})} }
        ]
    });

    fixture = TestBed.createComponent(StudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    studentService = TestBed.inject(StudentService) as MockStudentService;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an edit form, with a first and last name fields', () => {
    const firstName = document.querySelector('input[type="text"]');
    const lastName = document.querySelector('input[type="text"]');

    expect(firstName).toBeEmptyDOMElement();
    expect(lastName).toBeEmptyDOMElement();
  });
});
