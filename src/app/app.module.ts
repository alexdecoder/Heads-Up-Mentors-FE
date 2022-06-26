import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

import { NavbarComponent } from './dashboard/components/navbar/navbar.component';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { StudentsComponent } from './dashboard_pages/students/students.component';
import { MentorsComponent } from './dashboard_pages/mentors/mentors.component';
import { AdminsComponent } from './dashboard_pages/admins/admins.component';
import { TableComponent } from './dashboard_pages/components/table/table.component';
import { ActionbarComponent } from './dashboard/components/actionbar/actionbar.component'; 
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './store/app/app.reducer';
import { PeopleReducer } from './store/people/people.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from './services/app.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppEffects } from './store/app/app.effects';
import { AuthInterceptor } from './services/auth.interceptior';
import { PeopleEffects } from './store/people/people.effects';
import { SignupComponent } from './signup/signup.component';
import { SignupReducer } from './store/signup/signup.reducer';
import { SignupEffects } from './store/signup/signup.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    StudentsComponent,
    MentorsComponent,
    AdminsComponent,
    TableComponent,
    ActionbarComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ app: AppReducer, people: PeopleReducer, signup: SignupReducer }),
    EffectsModule.forRoot([ AppEffects, PeopleEffects, SignupEffects ]),
  ],
  providers: [
    AppService, 
    CookieService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
