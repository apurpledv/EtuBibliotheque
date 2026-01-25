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

  it('should have a register form, with a first name, last name, login and password fields', () => {
    const textForms = document.querySelectorAll('input[type="text"]');
    const password = document.querySelector('input[type="password"]');

    // 3 fields: firstName, lastName and login
    expect(textForms.length).toBe(3);
    expect(password).toBeEmptyDOMElement();
  });
});
