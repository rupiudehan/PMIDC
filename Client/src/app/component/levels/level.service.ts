import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private apiUrl = 'http://localhost:3000/api/levels';
  

  deleteLevel(id: number){
    return this.http.delete<any>(`http://localhost:3000/api/levels/${id}`)
  }

  getDetailLevel(id : number){
    
    return this.http.get<any>(`http://localhost:3000/api/levels/${id}`)
  }

  getLevel(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/levels")
  }

  fetchLevelById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/levels/${id}`);
  }

  constructor(private http: HttpClient) { }

  postLevel(data:any){
    return this.http.post<any>("http://localhost:3000/api/levels", data)
    .pipe(map((res:any)=>{
      console.log(res);
       return res;
    }));
  }

  editLevel(id: number, levelName: string){
    return this.http.put<any>(`http://localhost:3000/api/levels/${id}`, {levelName})
  }
  
  updateLevel(data: any): Observable<any> {
    debugger
    return this.http.put(`http://localhost:3000/api/levels/${data.id}`, data);
  }
} 
