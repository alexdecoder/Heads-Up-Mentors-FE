import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { forceJwt } from '../store/app/app.actions';
import { IAppState } from '../store/app/app.model';
import { selectAppState } from '../store/app/app.selector';
import { confirmCodeValidity, confirmSignup } from '../store/signup/signup.actions';
import { selectSignupState } from '../store/signup/signup.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store, private cookieService: CookieService, private router: Router) { }

  appState$ = this.store.select(selectAppState);
  signupState$ = this.store.select(selectSignupState);

  isValid: boolean = false;

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.signupForm != null) {
        return this.signupForm.get('password')!.value == control.value ? null : {noMatch: {value: true}};
      }

      return {noMatch: {value: true}};
    };
  }

  id?: string;

  get password() { return this.signupForm.get('password'); }
  get cPassword() { return this.signupForm.get('cPassword'); }
  get email() { return this.signupForm.get('email'); }
  get name() { return this.signupForm.get('name'); }

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    cPassword: new FormControl('', [
      Validators.required,
      this.passwordMatchValidator(),
    ]),
  });

  ngOnInit(): void {
    if(this.cookieService.check('auth')) {
      this.store.dispatch(forceJwt({jwt: this.cookieService.get('auth')}));
    }

    this.appState$.subscribe((state: IAppState) => {
      if(state.jwt != null) {
        this.router.navigate(['']);
      }

      if(state.destroyAuthCookie) {
        this.cookieService.delete('auth');
      }
    });

    this.store.dispatch(confirmCodeValidity({code: this.route.snapshot.paramMap.get('id')!}));

    this.signupForm.controls['password'].valueChanges.subscribe(() => {
      this.signupForm.controls['cPassword'].updateValueAndValidity();
    });

    this.signupForm.valueChanges.subscribe(() => this.isValid = this.signupForm.valid);

    this.signupState$.subscribe((next) => {
      if(next.userDidConflict) {
        console.log('Signup conflict detected');
      }
    });

    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  submit(): void {
    this.store.dispatch(confirmSignup({code: this.id!, name: this.signupForm.get('name')!.value!, email: this.signupForm.get('email')!.value!, password: this.signupForm.get('password')!.value!}));
  }
}
