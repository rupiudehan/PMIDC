import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { stateModel } from './state.model';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class StateService {
    
  
    constructor(private http : HttpClient) { }

    deleteState(id: number) {
      return this.http.delete<any>(`http://localhost:3000/api/states/${id}`)
    }
    // getDetailState(id: number) {
    //   return this.http.get<any>(`http://localhost:3000/api/states?id=${id}`)
    // }
    getstate(): Observable<any> {
      return this.http.get<any>("http://localhost:3000/api/states")
    }

    // getAllCountries(): Observable<any> {
    //   return this.http.get<any>(`http://localhost:3000/api/countries`);
    // }
  
    postState(data:any){
      debugger;
      return this.http.post<any>("http://localhost:3000/api/states", data)
      .pipe(map((res:any)=>{
         return res;
      }));
    }
  
    updateState(data: any): Observable<any> {
      return this.http.put<any>(`http://localhost:3000/api/states/${data.id}`, data);
    }
  
    editState(id: number){
      return this.http.put<any>(`http://localhost:3000/api/states/${id}`,id)
    }

    getCountry(): Observable<any>{
      return this.http.get<any>("http://localhost:3000/api/countries")
    }

    getDetailState(id : number){
    
      return this.http.get<any>(`http://localhost:3000/api/states/${id}`)
    }
  
    fetchStateById(id: number): Observable<any> {
      return this.http.get<any>(`http://localhost:3000/api/states/${id}`);
    }
  }
  
