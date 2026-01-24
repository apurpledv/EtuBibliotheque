import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from '../../pages/login/login.component';
import { UserService } from '../../core/service/user.service';
import { MockUserService } from '../mock/MockUserService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterComponent } from '../../pages/register/register.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

describe('RegisterComponent Unit Tests', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let userService: MockUserService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        providers: [
            { provide: UserService, useClass: MockUserService },
            { provide: ActivatedRoute, useValue: {} }
        ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    userService = TestBed.inject(UserService) as MockUserService;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and call register() from its userService', () => {
    const formThingy: FormGroup = formBuilder.group({
        firstName: ['firstName'],
        lastName: ['lastName'],
        login: ['login'],
        password: ['password']
    });
    component.registerForm = formThingy;

    // Mock a window.alert (Jest doesn't implement it)
    const jsdomAlert = window.alert;
    window.alert = () => {};

    const spyRegister = jest.spyOn(userService, 'register');
    
    component.onSubmit();

    fixture.detectChanges();
    window.alert = jsdomAlert;
    expect(spyRegister).toHaveBeenCalled();
  });

  it('should submit an invalid form and NOT call register() from its userService', () => {
    const spyRegister = jest.spyOn(userService, 'register');
    
    component.onSubmit();
    expect(spyRegister).not.toHaveBeenCalled();
  });

  it('should reset the form, setting login and password to null', () => {
    const formThingy: FormGroup = formBuilder.group({
        firstName: ['firstName'],
        lastName: ['lastName'],
        login: ['login'],
        password: ['password']
    });
    component.registerForm = formThingy;
    
    component.onReset();
    
    expect(component.registerForm.controls['firstName'].value).toBeNull();
    expect(component.registerForm.controls['lastName'].value).toBeNull();
    expect(component.registerForm.controls['login'].value).toBeNull();
    expect(component.registerForm.controls['password'].value).toBeNull();
  });
});
