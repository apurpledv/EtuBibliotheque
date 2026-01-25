import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MockStudentService } from '../mock/MockStudentService';
import { StudentService } from '../../core/service/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Student } from '../../core/models/Student';
import { StudentEditComponent } from '../../pages/student/student-edit/student-edit.component';

describe('Student-Edit IT Tests', () => {
  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;

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

  it('should submit the update form, then call updateStudent() from its studentService', () => {
    const formThingy: FormGroup = formBuilder.group({firstName: ['firstName'], lastName: ['lastName']});
    component.studentEditForm = formThingy;

    const spyUpdate = jest.spyOn(studentService, 'updateStudent');
    
    component.onSubmit();

    fixture.detectChanges();
    expect(spyUpdate).toHaveBeenCalled();
  });

  it('should submit an invalid update form, and NOT call updateStudent() from its studentService', () => {
    const spyUpdate = jest.spyOn(studentService, 'updateStudent');
    
    component.onSubmit();

    fixture.detectChanges();
    expect(spyUpdate).not.toHaveBeenCalled();
  });

  it('should check that the studentEditForm is initialized', () => {
    const mockStudent: Student = {
      id: 0,
      firstName: 'firstName',
      lastName: 'lastName'
    };

    jest.spyOn(studentService, 'getStudent').mockReturnValue(of(mockStudent));

    component.ngOnInit();

    fixture.detectChanges();
    expect(component.studentEditForm.controls['firstName'].value).toEqual(mockStudent.firstName);
    expect(component.studentEditForm.controls['lastName'].value).toEqual(mockStudent.lastName);
  });

  it('should reset the form, setting firstName and lastName to null', () => {
    const formThingy: FormGroup = formBuilder.group({firstName: ['firstName'], lastName: ['lastName']});
    component.studentEditForm = formThingy;
    
    component.onReset();
    
    expect(component.studentEditForm.controls['firstName'].value).toBeNull();
    expect(component.studentEditForm.controls['lastName'].value).toBeNull();
  });
});
