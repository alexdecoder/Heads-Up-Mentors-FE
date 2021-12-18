import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface ApiResponse {
  result: string,
  data: RespType,
}

export interface RespType {
  mentors: Array<any>,
  students: Array<any>,
}

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<ApiResponse>(environment.API_URL + '/api/index');
  }
}
