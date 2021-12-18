import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse, HttpServiceService } from '../http-service.service';
import { environment } from 'src/environments/environment';

export interface Student {
  name: string,
  daysAvailable: Array<string>,
  timesAvailable: Array<string>,
  subjects: Array<string>,
  email: string,
  status: boolean,
  mentor: string,
}

export interface Mentor {
  name: string,
  times: Map<String, Array<String>>,
  subjects: Array<string>,
  students: Array<string>,
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  constructor(private httpService: HttpServiceService, private http: HttpClient) { }

  mentorsTableData: Mentor[] = [];
  studentsTableData: Student[] = [];

  ngOnInit(): void {
    this.httpService.loadInitialData().subscribe(
      (data: ApiResponse) => {
        this.mentorsTableData = data.data.mentors;
        this.studentsTableData = data.data.students;
      }
    );
  }

  goToLink(url: string) {
    window.open(url);
  }

  onStudentUpload(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("csv", file);

      const upload = this.http.post(environment.API_URL + "/api/csv_actions?a=import", formData);
      upload.subscribe();
    }

    alert('CSV file is being uploaded. Do not navigate off this page until values propogate.');
  }

  onMentorUpload(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("csv", file);

      const upload = this.http.post(environment.API_URL + "/api/csv_actions?a=importmentors", formData);
      upload.subscribe();
    }

    alert('CSV file is being uploaded. Do not navigate off this page until values propogate.');
  }

  selected = 0;

  isShowingStudents = true;

  displayedColumns = ['status', 'name', 'daysAvailable', 'timesAvailable', 'subject', 'email', 'mentor'];

  displayedMentorColumns = ['name', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'subjects', 'students'];
}
