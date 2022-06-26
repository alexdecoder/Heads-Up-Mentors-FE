import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAppState } from 'src/app/store/app/app.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private store: Store) { }

  appState$ = this.store.select(selectAppState);

  @Input() index!: number;
}
