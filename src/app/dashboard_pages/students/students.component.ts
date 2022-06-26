import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { selectAppState } from 'src/app/store/app/app.selector';
import { selectPeopleState } from 'src/app/store/people/people.selector';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  constructor(private store: Store, private snackBar: MatSnackBar) { }

  appState$ = this.store.select(selectAppState);

  peopleState$ = this.store.select(selectPeopleState);

  fileUploadChange(event: any): void {
    console.log(event)
    
    this.snackBar.open('Uploading "' + event.target.files[0].name + '"...');
  }
}
