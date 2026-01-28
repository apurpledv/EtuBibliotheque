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

  it('should have a login form, with a login and password fields', () => {
    const login = document.querySelector('input[type="text"]');
    const password = document.querySelector('input[type="password"]');

    expect(login).toBeEmptyDOMElement();
    expect(password).toBeEmptyDOMElement();
  });
});
