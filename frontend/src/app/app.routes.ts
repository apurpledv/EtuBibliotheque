import { Routes } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {AppComponent} from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentListComponent } from './pages/student/student-list/student-list.component';
import { StudentAddComponent } from './pages/student/student-add/student-add.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'student-add', component: StudentAddComponent },
  { path: 'student-edit/:id', component: StudentEditComponent }

];
