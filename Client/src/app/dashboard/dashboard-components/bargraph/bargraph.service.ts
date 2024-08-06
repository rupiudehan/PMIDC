import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BargraphService {

  private apiUrl = 'http://49.50.66.74:84/api/bargraph'; 

  constructor(private http: HttpClient) { }

  getBarGraphData(): Observable<any> {
    debugger;
    return this.http.get<any>('http://49.50.66.74:84/api/bargraph');
}
}