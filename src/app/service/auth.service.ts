import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;


  constructor(private http:Http) { }
registerUser(user){
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:8000/users/register', user, {headers: header})
  .map( response => response.json());
}

authenticateUser(user){
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:8000/users/authenticate', user, {headers: header})
  .map( response => response.json());
}

getProfile(){
  let header = new Headers();
  this.loadToken();
  header.append('Authorization', this.authToken);
  header.append('Content-Type', 'application/json');
  return this.http.get('http://localhost:8000/users/profile', {headers: header})
  .map( response => response.json());
}

loadToken(){
  var token = localStorage.getItem('id_token');
  this.authToken = token;
}

storeUserData(token, user){
  localStorage.setItem('id_token', token);
  localStorage.setItem('user', JSON.stringify(user));
  this.authToken = token;
  this.user = user;
}

logout(){
  this.authToken = null;
  this.user = null;
  localStorage.clear();

}
}
