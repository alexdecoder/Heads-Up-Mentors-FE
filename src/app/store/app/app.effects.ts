import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { AppService } from "src/app/services/app.service";
import { loadBaseData, login } from "./app.actions";

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private appService: AppService) {};

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        exhaustMap((action) => this.appService.login(action.email, action.password).pipe(
            map(data => ({ type: '[Auth] Login Success', data: data })),
            catchError((data) => {
                if(data.status == 401) {
                    return of({ type: '[Auth] Login Failed', data: data });
                }
                return of({ type: '[App] Error', data: data });
            })
        ))
    ));

    loadBaseData$ = createEffect(() => this.actions$.pipe(
        ofType(loadBaseData),
        mergeMap(() => this.appService.loadBaseData().pipe(
            map(data => ({ type: '[App] Load Base Data Success', data: data })),
            catchError((data) => {
                if(data.status == 401) {
                    return of({ type: '[Auth] Invalid Auth', data: data });
                }
                return of({ type: '[App] Error', data: data });
            })
        ))
    ));
}