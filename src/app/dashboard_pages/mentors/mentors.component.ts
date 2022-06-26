import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAppState } from 'src/app/store/app/app.selector';
import { selectPeopleState } from 'src/app/store/people/people.selector';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss']
})
export class MentorsComponent {
  constructor(private store: Store) { }

  appState$ = this.store.select(selectAppState);

  peopleState$ = this.store.select(selectPeopleState);
}
