import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, mergeMap } from 'rxjs';
import { selectAppState } from '../store/app/app.selector';
import { SHOULD_OVERRIDE_CONTENT_TYPE } from './app.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(selectAppState).pipe(
        first(),
        mergeMap(state => {
            const authReq = state.jwt !== null && state.jwt !== undefined ? req.clone(
                {
                    setHeaders: req.context.get(SHOULD_OVERRIDE_CONTENT_TYPE) ?
                    {
                        'Authorization': 'Bearer ' + state.jwt,
                    } :
                    {
                        'Authorization': 'Bearer ' + state.jwt,
                        'Content-Type': 'application/json',
                    }
                    
                }
            ) : req;

            return next.handle(authReq);
        }),
    );
  }
}