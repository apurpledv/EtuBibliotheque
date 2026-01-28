import { TestBed } from "@angular/core/testing";
import { UserService } from "../../core/service/user.service";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { Login } from "../../core/models/Login";
import { Observable } from "rxjs";
import { AuthToken } from "../../core/models/AuthToken";
import { Register } from "../../core/models/Register";

describe('UserService Unit Tests', () => {
    let service: UserService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient()
            ]
        });
        service = TestBed.inject(UserService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call login() and post(), then return an Observable<AuthToken>', () => {
        const loginInfo: Login = {
            login: '',
            password: ''
        };

        const spy = jest.spyOn(service, 'login');
        const spyHttp = jest.spyOn(httpClient, 'post');
        const result = service.login(loginInfo);

        expect(spy).toHaveBeenCalled();
        expect(spyHttp).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Observable<AuthToken>);
    });

    it('should call register() and post(), then return an Observable<Object>', () => {
        const registerInfo: Register = {
            firstName: '',
            lastName: '',
            login: '',
            password: ''
        };

        const spy = jest.spyOn(service, 'register');
        const spyHttp = jest.spyOn(httpClient, 'post');
        const result = service.register(registerInfo);

        expect(spy).toHaveBeenCalled();
        expect(spyHttp).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Observable<Object>);
    });
});