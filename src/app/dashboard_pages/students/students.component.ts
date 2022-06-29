import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { loadBaseData } from 'src/app/store/app/app.actions';
import { AppService } from 'src/app/services/app.service';
import { selectAppState } from 'src/app/store/app/app.selector';
import { selectPeopleState } from 'src/app/store/people/people.selector';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  constructor(private store: Store, private snackBar: MatSnackBar, private appService: AppService) { }

  @ViewChild('uploadInput') inputElement: any;
  
  appState$ = this.store.select(selectAppState);

  peopleState$ = this.store.select(selectPeopleState);

  async fileUploadChange(event: any): Promise<void> {
    const target: File = event.target.files[0];

    this.snackBar.open('Uploading "' + target.name + '"...');

    let formData = new FormData();
    formData.append('file', target);

    let res = await this.appService.fileUpload('STUDENT', formData);

    this.inputElement.nativeElement.value = '';

    if(res.success) {
      this.snackBar.open('File has been uploaded', 'Dismiss');
    } else if(res.error === undefined) {
      this.snackBar.open('There was an unkown problem', 'Dismiss');
    } else {
      this.snackBar.open('There\'s a problem with your file: ' + res.error, 'Dismiss');
    }

    this.store.dispatch(loadBaseData());
  }
}
