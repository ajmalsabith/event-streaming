import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

let usertoken = localStorage.getItem('usersecret');
console.log(usertoken);



const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${usertoken}`,
});



@Injectable({
  providedIn: 'root'
})
export class FullserviceService {
  

  constructor(private http:HttpClient) { }



  url='http://localhost:5000'

  postregister(user:any):Observable<any> {
    return this.http.post(`${this.url}/register`,user,{headers})
  }
  postlogin(user:any):Observable<any> {
    return this.http.post(`${this.url}/login`,user,{headers})
  }
  postotp(otp:any):Observable<any> {
    return this.http.post(`${this.url}/otp`,{otp:otp})
  }

  postadminlogin(user:any):Observable<any> {
    return this.http.post(`${this.url}/admin/login`,user)
  }

  getUser():Observable<any> {
    return this.http.get(`${this.url}/admin/users`)
  }
  useredit(email:string):Observable<any> {
    return this.http.post(`${this.url}/admin/editget`,{email:email})
  }

  postedit(user:any):Observable<any> {
    return this.http.post(`${this.url}/admin/editpost`,user,{headers})
  }
  
  deleteUser(email:string):Observable<any> {
    return this.http.post(`${this.url}/admin/delete`,{email:email})
  }

  
  eventdelete(id:string):Observable<any> {
    return this.http.post(`${this.url}/admin/eventdelete`,{id:id})
  }


  postevent(event:any):Observable<any> {
    return this.http.post(`${this.url}/admin/eventadd`,event,{headers})
  }

  getevent():Observable<any> {
    return this.http.get(`${this.url}/admin/eventget`,{headers})
  }
  geteventuser():Observable<any> {
    return this.http.get(`${this.url}/eventget`,{headers})
  }

  eventeditget(id:string):Observable<any> {
    return this.http.post(`${this.url}/admin/eventeditget`,{id:id},{headers})
  }

  posteditevent(event:any):Observable<any> {
    return this.http.post(`${this.url}/admin/posteditevent`,event,{headers})
  }
  
}
