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
            { provide: ActivatedRoute, useValue: {params: of({id: 0})} }
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

  it('should submit the add form, then call addStudent() from its studentService', () => {
    const formThingy: FormGroup = formBuilder.group({firstName: ['firstName'], lastName: ['lastName']});
    component.studentAddForm = formThingy;

    const spyAdd = jest.spyOn(studentService, 'addStudent');
    
    component.onSubmit();

    fixture.detectChanges();
    expect(spyAdd).toHaveBeenCalled();
  });

  it('should submit an invalid add form, and NOT call addStudent() from its studentService', () => {
    const spyAdd = jest.spyOn(studentService, 'addStudent');
    
    component.onSubmit();

    fixture.detectChanges();
    expect(spyAdd).not.toHaveBeenCalled();
  });

  it('should check that the studentAddForm is initialized', () => {
    component.ngOnInit();

    fixture.detectChanges();
    expect(component.studentAddForm.controls['firstName'].value).toEqual('');
    expect(component.studentAddForm.controls['lastName'].value).toEqual('');
  });

  it('should reset the form, setting firstName and lastName to null', () => {
    const formThingy: FormGroup = formBuilder.group({firstName: ['firstName'], lastName: ['lastName']});
    component.studentAddForm = formThingy;
    
    component.onReset();
    
    expect(component.studentAddForm.controls['firstName'].value).toBeNull();
    expect(component.studentAddForm.controls['lastName'].value).toBeNull();
  });
});
