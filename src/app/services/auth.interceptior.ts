import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, mergeMap } from 'rxjs';
import { selectAppState } from '../store/app/app.selector';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(selectAppState).pipe(
        first(),
        mergeMap(state => {
            const authReq = state.jwt !== null && state.jwt !== undefined ? req.clone(
                {
                    setHeaders: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + state.jwt,
                    }
                }
            ) : req;

            return next.handle(authReq);
        }),
    );
  }
}