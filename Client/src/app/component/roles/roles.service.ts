import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'http://localhost:3000/api/roles';
  

  deleteRole(id: number){
    return this.http.delete<any>(`http://localhost:3000/api/roles/${id}`)
  }

  getDetailRole(id : number){
    
    return this.http.get<any>(`http://localhost:3000/api/roles/${id}`)
  }

  getRole(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/roles")
  }

  fetchRoleById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/roles/${id}`);
  }

  

  constructor(private http: HttpClient) { }

  postRole(data:any){
    return this.http.post<any>("http://localhost:3000/api/roles", data)
    .pipe(map((res:any)=>{
      console.log(res);
       return res;
    }));
  }

  editRole(id: number, roleName: string){
    return this.http.put<any>(`http://localhost:3000/api/roles/${id}`, {roleName})
  }
  
  updateRole(data: any): Observable<any> {
    debugger
    return this.http.put(`http://localhost:3000/api/roles/${data.id}`, data);
  }
}
