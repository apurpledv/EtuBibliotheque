import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentListComponent } from '../../pages/student/student-list/student-list.component';
import { MockStudentService } from '../mock/MockStudentService';
import { StudentService } from '../../core/service/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Student } from '../../core/models/Student';

describe('Student-List IT Tests', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  let studentService: MockStudentService;

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

  it('should check that the studentList is initialized', () => {
    const response: Student[] = [];
    jest.spyOn(studentService, 'getStudents').mockReturnValue(of(response));

    component.ngOnInit();

    fixture.detectChanges();
    expect(component.students).toEqual(response);
  });

  it('should call deleteStudent() from its studentService', () => {
    const studentId = 0;

    const spyDelete = jest.spyOn(studentService, 'deleteStudent');
    
    component.onDeleteStudent(studentId);
    expect(spyDelete).toHaveBeenCalled();
  });
});
