import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BargraphService {

  private apiUrl = 'http://localhost:3000/api/bargraph'; 

  constructor(private http: HttpClient) { }

  getBarGraphData(): Observable<any> {
    debugger;
    return this.http.get<any>('http://localhost:3000/api/bargraph');
}
}