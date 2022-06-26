import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { invalidAuth } from 'src/app/store/app/app.actions';
import { selectAppState } from 'src/app/store/app/app.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private store: Store) { }

  signOut(): void { this.store.dispatch(invalidAuth()); }

  appState$ = this.store.select(selectAppState);
}
