import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAppState } from 'src/app/store/app/app.selector';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent {
  constructor(private store: Store) { }

  appState$ = this.store.select(selectAppState);
}
