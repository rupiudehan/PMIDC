import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubComponentService {
    
  
  constructor(private http : HttpClient) { }

  deleteSubComponent(id: number) {
    return this.http.delete<any>(`http://localhost:3000/api/sub-component/${id}`)
  }
  // getDetailState(id: number) {
  //   return this.http.get<any>(`http://localhost:3000/api/states?id=${id}`)
  // }
  getSubComponent(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/api/sub-component")
  }

  // getAllCountries(): Observable<any> {
  //   return this.http.get<any>(`http://localhost:3000/api/countries`);
  // }

  postSubComponent(data:any){
    debugger;
    return this.http.post<any>("http://localhost:3000/api/sub-component", data)
    .pipe(map((res:any)=>{
       return res;
    }));
  }

  updateSubComponent(data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/sub-component/${data.id}`, data);
  }

  editSubComponent(id: number){
    return this.http.put<any>(`http://localhost:3000/api/sub-component/${id}`,id)
  }

  getScheme(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/scheme")
  }
  getSubScheme(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/subScheme")
  }

  getDetailSubComponent(id : number){
  
    return this.http.get<any>(`http://localhost:3000/api/sub-component/${id}`)
  }

  fetchSubComponentById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/sub-component/${id}`);
  }
}
