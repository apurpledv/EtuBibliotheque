import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from '../../pages/login/login.component';
import { UserService } from '../../core/service/user.service';
import { MockUserService } from '../mock/MockUserService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthToken } from '../../core/models/AuthToken';
import { Observable } from 'rxjs';

describe('LoginComponent Unit Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let userService: MockUserService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        providers: [
            { provide: UserService, useClass: MockUserService },
            { provide: ActivatedRoute, useValue: {} }
        ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    userService = TestBed.inject(UserService) as MockUserService;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and call login() from its userService', () => {
    const formThingy: FormGroup = formBuilder.group({login: ['login'], password: ['password']});
    component.loginForm = formThingy;

    // Mock a window.alert (Jest doesn't implement it)
    const jsdomAlert = window.alert;
    window.alert = () => {};

    // Mock a token response
    const mockToken: AuthToken = {
      token: '123456.123456.123456789'
    }
    const spyLogin = jest.spyOn(userService, 'login');
    
    component.onSubmit();

    fixture.detectChanges();
    window.alert = jsdomAlert;
    expect(spyLogin).toHaveBeenCalled();
    expect(sessionStorage.getItem('auth_token')).not.toBeNull();
  });

  it('should submit an invalid form and NOT call login() from its userService', () => {
    const spyLogin = jest.spyOn(userService, 'login');
    
    component.onSubmit();
    expect(spyLogin).not.toHaveBeenCalled();
  });

  /*it('should get the form data', () => {
    const formThingy: FormGroup = formBuilder.group({login: ['login'], password: ['password']});
    component.loginForm = formThingy;
    
    const newForm = component.getForm();
    
    expect(newForm['login'].value).toBe('login');
    expect(newForm['password'].value).toBe('password');
  });*/

  it('should reset the form, setting login and password to null', () => {
    const formThingy: FormGroup = formBuilder.group({login: ['login'], password: ['password']});
    component.loginForm = formThingy;
    
    component.onReset();
    
    expect(component.loginForm.controls['login'].value).toBeNull();
    expect(component.loginForm.controls['password'].value).toBeNull();
  });
});
