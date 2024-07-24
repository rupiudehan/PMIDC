// import { Injectable } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class SharedService {
//   deletestate(id: number) {
//     return this.http.get<any>(`http://localhost:3000/States?id=${id}`)
//   }
//   getDetailState(id: number) {
//     return this.http.get<any>(`http://localhost:3000/States?id=${id}`)
//   }
//   getstate(): Observable<any> {
//     return this.http.get<any>("http://localhost:3000/States")
//   }

//   constructor(private http : HttpClient) { }

//   postState(data:any){
//     debugger;
//     return this.http.post<any>("http://localhost:5433/States", data)
//     .pipe(map((res:any)=>{
//        return res;
//     }));
//   }

//   updateState(id:any){

//   }

//   editState(id: number){
//     return this.http.get<any>(`http://localhost:3000/States?id=${id}`)
//   }
// }
