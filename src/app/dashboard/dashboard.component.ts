import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { loadBaseData } from '../store/app/app.actions';
import { IAppState } from '../store/app/app.model';
import { selectAppState } from '../store/app/app.selector';

@Component({
  selector: 'app-dashboard-template',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private store: Store, private router: Router, private cookieService: CookieService) { }

  appState$ = this.store.select(selectAppState);

  ngOnInit(): void {
    this.appState$.subscribe((state: IAppState) => {
      if(state.jwt == null) {
        this.router.navigate(['/login'], {queryParams: {page: this.selectedTab != 0 ? this.selectedTab : null}});
      }

      if(this.cookieService.get('auth') != state.jwt && state.jwt != null) {
        this.cookieService.set('auth', state.jwt!, {path: '/', sameSite: 'Strict'});
      }
    });

    this.appState$.pipe(first()).subscribe((state) => {
      if(state.jwt !== null && state.jwt !== undefined && !state.hasLoaded) {
        this.store.dispatch(loadBaseData());
      }
    });
  }

  @Input() selectedTab!:number;
}
