import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from "rxjs";
import { AppService } from "src/app/services/app.service";
import { deleteAdmin, toggleViewOnly } from "./people.actions";

@Injectable()
export class PeopleEffects {
    constructor(private actions$: Actions, private appService: AppService) {};

    toggleViewOnlyEffect$ = createEffect(() => this.actions$.pipe(
        ofType(toggleViewOnly),
        exhaustMap((action) => this.appService.toggleViewOnly(action.uuid).pipe(
            map(_ => ({ type: '[Admin] Toggle View Only Success', uuid: action.uuid })),
            catchError((data) => {
                if(data.status == 401 || data.status == 403) {
                    return of({ type: '[Auth] Invalid Auth', data: data });
                }
                return of({ type: '[App] Error', data: data });
            })
        ))
    ));

    deleteAdmin$ = createEffect(() => this.actions$.pipe(
        ofType(deleteAdmin),
        exhaustMap((action) => this.appService.deleteAdmin(action.uuid).pipe(
            map(_ => ({ type: '[Admin] Delete Admin Success', uuid: action.uuid })),
            catchError((data) => {
                if(data.status == 401 || data.status == 403) {
                    return of({ type: '[Auth] Invalid Auth' });
                }
                return of({ type: '[App] Error', data: data });
            })
        ))
    ));
}