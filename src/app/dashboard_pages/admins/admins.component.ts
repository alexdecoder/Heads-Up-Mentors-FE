import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from 'src/app/services/app.service';
import { selectAppState } from 'src/app/store/app/app.selector';
import { deleteAdmin, toggleViewOnly } from 'src/app/store/people/people.actions';
import { selectPeopleState } from 'src/app/store/people/people.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  constructor(private store: Store, private router: Router, private appService: AppService, private snackBar: MatSnackBar) { }

  appState$ = this.store.select(selectAppState);
  peopleState$ = this.store.select(selectPeopleState);

  switchToggled(uuid: string): void {
    this.store.dispatch(toggleViewOnly({uuid: uuid}));
  }

  deleteAdmin(uuid: string): void {
    this.store.dispatch(deleteAdmin({uuid: uuid}));
  }

  async generateSignupCode() {
    const res = await this.appService.generateSignupCode();
    if(res.success) {
      navigator.clipboard.writeText(environment.host + '/signup/' + res.code!);

      this.snackBar.open('Invite link copied to clipboard', 'Dismiss');
    } else {
      this.snackBar.open('Failed to create link', 'Dismiss');
    }
  }

  ngOnInit(): void {
    this.appState$.subscribe((state) => {
      if(!state.hasLoaded || state.isViewOnly) {
        this.router.navigate(['/']);
      }
    });
  }
}
