import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from "rxjs";
import { AppService } from "src/app/services/app.service";
import { confirmCodeValidity, confirmSignup } from "./signup.actions";

@Injectable()
export class SignupEffects {
    constructor(private actions$: Actions, private appService: AppService) {};

    confirmCodeValidityEffect$ = createEffect(() => this.actions$.pipe(
        ofType(confirmCodeValidity),
        exhaustMap((action) => this.appService.confirmSignupCode(action.code).pipe(
            map(_ => ({ type: '[Signup] Code Validity Verified' })),
            catchError((data) => {
                if(data.status === 404) {
                    return of({ type: '[Signup] Code Invalid' });
                } else if(data.status === 409) {
                    return of({ type: '[Signup] Signup Conflict' });
                }
                return of({ type: '[App] Error', data: data });
            })
        ))
    ));

    signupEffect$ = createEffect(() => this.actions$.pipe(
        ofType(confirmSignup),
        exhaustMap((action) => this.appService.signup(action.name, action.email, action.password, action.code).pipe(
            map(data => ({ type: '[Signup] Signup Success', jwt: (data as any).jwt })),
            catchError((data) => {
                if(data.status === 404) {
                    return of({ type: '[Signup] Code Invalid' });
                } else if(data.status === 409) {
                    return of({ type: '[Signup] Signup Conflict' });
                }
                return of({ type: '[App] Error', data: data });
            })
        ))
    ));
}