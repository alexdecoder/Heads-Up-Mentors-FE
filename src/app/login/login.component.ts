import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { forceJwt, indicateLoading, login } from '../store/app/app.actions';
import { IAppState } from '../store/app/app.model';
import { selectAppState } from '../store/app/app.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private store: Store, private router: Router, private cookieService: CookieService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  appState$ = this.store.select(selectAppState);

  proceedTo?: string;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    if(this.cookieService.check('auth')) {
      this.store.dispatch(forceJwt({jwt: this.cookieService.get('auth')}));
    }

    switch(+(this.route.snapshot.queryParamMap.get('page') ?? 0)) {
      case 0:
        this.proceedTo = '/';
        break;
      case 1:
        this.proceedTo = '/mentors';
        break;
      case 2:
        this.proceedTo = '/admins';
    }

    this.appState$.subscribe((state: IAppState) => {
      if(state.jwt != null) {
        this.router.navigate([this.proceedTo]);
      }

      if(state.destroyAuthCookie) {
        this.cookieService.delete('auth');
      }

      if(state.authFailed) {
        this.snackBar.open('Invalid email or password');
      }
    });
  }

  submit(): void {
    let emailContent = this.loginForm.get('email')!.value;
    let passwordContent = this.loginForm.get('password')!.value;

    if(emailContent != '' && passwordContent != '') {
      this.store.dispatch(indicateLoading());

      this.store.dispatch(login({email: emailContent!, password: passwordContent!}));
    }

    this.snackBar.dismiss();
  }
}
