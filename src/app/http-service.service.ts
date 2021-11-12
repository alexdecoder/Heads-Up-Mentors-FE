import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor(private http:HttpClient) { }

  loadInitialData() {
    return this.http.get<ApiResponse>('/api/api/index');
  }
}
