import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopcardService {

  private apiUrl = 'http://49.50.66.74:84/api/dashboard'; 

  constructor(private http: HttpClient) { }

  getTopcardsData(): Observable<any> {
    return this.http.get<any>('http://49.50.66.74:84/api/dashboard');
  }

  
}
