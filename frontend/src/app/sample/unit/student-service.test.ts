import { TestBed } from "@angular/core/testing";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthToken } from "../../core/models/AuthToken";
import { Register } from "../../core/models/Register";
import { StudentService } from "../../core/service/student-service.service";
import { Student } from "../../core/models/Student";

describe('StudentService Unit Tests', () => {
    let service: StudentService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient()
            ]
        });
        service = TestBed.inject(StudentService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getStudents() and get(), then return an Observable<Student[]>', () => {
        const spy = jest.spyOn(service, 'getStudents');
        const spyHttp = jest.spyOn(httpClient, 'get');
        const result = service.getStudents();

        expect(spy).toHaveBeenCalled();
        expect(spyHttp).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Observable<Student[]>);
    });

    it('should call getStudent() and get(), then return an Observable<Student>', () => {
        const studentId = 0;
        const spy = jest.spyOn(service, 'getStudent');
        const spyHttp = jest.spyOn(httpClient, 'get');
        const result = service.getStudent(studentId);

        expect(spy).toHaveBeenCalled();
        expect(spyHttp).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Observable<Student>);
    });

    it('should call addStudent() and post(), then return an Observable<Object>', () => {
        const studentInfo: Student = {
            id: 0,
            firstName: '',
            lastName: ''
        };

        const spy = jest.spyOn(service, 'addStudent');
        const spyHttp = jest.spyOn(httpClient, 'post');
        const result = service.addStudent(studentInfo);

        expect(spy).toHaveBeenCalled();
        expect(spyHttp).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Observable<Object>);
    });

    it('should call updateStudent() and put(), then return an Observable<Object>', () => {
        const studentId = 0;
        const studentInfo: Student = {
            id: 0,
            firstName: '',
            lastName: ''
        };

        const spy = jest.spyOn(service, 'updateStudent');
        const spyHttp = jest.spyOn(httpClient, 'put');
        const result = service.updateStudent(studentId, studentInfo);

        expect(spy).toHaveBeenCalled();
        expect(spyHttp).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Observable<Object>);
    });

    it('should call deleteStudent() and delete(), then return an Observable<Object>', () => {
        const studentId = 0;

        const spy = jest.spyOn(service, 'deleteStudent');
        const spyHttp = jest.spyOn(httpClient, 'delete');
        const result = service.deleteStudent(studentId);

        expect(spy).toHaveBeenCalled();
        expect(spyHttp).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Observable<Object>);
    });
});