import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentListComponent } from '../../pages/student/student-list/student-list.component';
import { MockStudentService } from '../mock/MockStudentService';
import { StudentService } from '../../core/service/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Student } from '../../core/models/Student';

describe('Student-List Unit Tests', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  let studentService: MockStudentService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        providers: [
            { provide: StudentService, useClass: MockStudentService },
            { provide: ActivatedRoute, useValue: {} }
        ],
    });

    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    studentService = TestBed.inject(StudentService) as MockStudentService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an HTML table', () => {
    const table = document.querySelector('table');
    expect(table).toBeInTheDocument();
  });
});
