import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignLimitService {
    
  
  constructor(private http : HttpClient) { }

  deleteLimit(id: number) {
    return this.http.delete<any>(`http://localhost:3000/api/limit/${id}`)
  }
  // getDetailState(id: number) {
  //   return this.http.get<any>(`http://localhost:3000/api/states?id=${id}`)
  // }
  getLimit(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/api/limit")
  }

  // getAllCountries(): Observable<any> {
  //   return this.http.get<any>(`http://localhost:3000/api/countries`);
  // }

  postLimits(data:any){
    debugger;
    return this.http.post<any>("http://localhost:3000/api/limit", data)
    .pipe(map((res:any)=>{
      console.log(res);
       return res;
    }));
  }

  updateLimit(data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/limit/${data.id}`, data);
  }

  editLimit(id: number){
    return this.http.put<any>(`http://localhost:3000/api/limit/${id}`,id)
  }

  getScheme(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/scheme")
  }
  getUser(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/user")
  }
  getLevel(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/level")
  }

  getDetailLimit(id : number){
  
    return this.http.get<any>(`http://localhost:3000/api/limit/${id}`)
  }

  fetchLimitById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/limit/${id}`);
  }
}``
