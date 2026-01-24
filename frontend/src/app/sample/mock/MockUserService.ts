import { Observable } from "rxjs";
import { Login } from "../../core/models/Login";
import { Register } from "../../core/models/Register";
import { Injectable } from "@angular/core";
import { AuthToken } from "../../core/models/AuthToken";

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
    register(user: Register): Observable<Object> {
        return new Observable((observer) => observer.next(1));
    }

    login(user: Login): Observable<Object> {
        const mockToken: AuthToken = {token: '123456.123456.123456789'}
        return new Observable((observer) => observer.next(mockToken))
    }
}