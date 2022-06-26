import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './dashboard_pages/admins/admins.component';
import { MentorsComponent } from './dashboard_pages/mentors/mentors.component';
import { StudentsComponent } from './dashboard_pages/students/students.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: StudentsComponent},
  {path: 'mentors', component: MentorsComponent},
  {path: 'admins', component: AdminsComponent},
  {path: 'signup/:id', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
