import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    
  
  constructor(private http : HttpClient) { }

  deleteUser(id: number) {
    return this.http.delete<any>(`http://localhost:3000/api/user/${id}`)
  }

  getUser(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/api/user")
  }

  postUser(data:any){
    debugger;
    return this.http.post<any>("http://localhost:3000/api/user", data)
    .pipe(map((res:any)=>{
       return res;
    }));
  }

  updateUser(data: any): Observable<any> {
    debugger
    return this.http.put<any>(`http://localhost:3000/api/user/${data.id}`, data);
  }

  editUser(id: number){
    return this.http.put<any>(`http://localhost:3000/api/user/${id}`,id)
  }

  getRole(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/roles")
  }

  getLevel(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/levels")
  }

  getDetailUser(id : number){
  
    return this.http.get<any>(`http://localhost:3000/api/user/${id}`)
  }

  fetchUserById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/user/${id}`);
  }
}
