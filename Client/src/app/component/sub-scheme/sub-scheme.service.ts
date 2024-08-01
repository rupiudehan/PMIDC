import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubSchemeService {
  getSubSchemebyId(id: number) {
    throw new Error('Method not implemented.');
  }
    
  
  constructor(private http : HttpClient) { }

  deleteSubScheme(id: number) {
    return this.http.delete<any>(`http://localhost:3000/api/subScheme/${id}`)
  }
  // getDetailState(id: number) {
  //   return this.http.get<any>(`http://localhost:3000/api/states?id=${id}`)
  // }
  getSubScheme(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/api/subScheme")
  }

  // getAllCountries(): Observable<any> {
  //   return this.http.get<any>(`http://localhost:3000/api/countries`);
  // }

  postSubScheme(data:any){
    debugger;
    return this.http.post<any>("http://localhost:3000/api/subScheme", data)
    .pipe(map((res:any)=>{
       return res;
    }));
  }

  updateSubScheme(data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/subScheme/${data.id}`, data);
  }

  editSubScheme(id: number){
    return this.http.put<any>(`http://localhost:3000/api/subScheme/${id}`,id)
  }

  getScheme(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/scheme")
  }

  getDetailSubScheme(id : number){
  
    return this.http.get<any>(`http://localhost:3000/api/subScheme/${id}`)
  }

  fetchSubSchemeById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/subScheme/${id}`);
  }
}

