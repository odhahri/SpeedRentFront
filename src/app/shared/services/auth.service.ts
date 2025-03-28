import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface LoginRequest {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http: HttpClient) { }
  login(loginRequest: LoginRequest) {
    return this.http.post('/login/', loginRequest);
  }
  getConnectedUser(token: string) {
    return this.http.post(
      '/authentication/get-connected-user/',
      {
        token,
      }
    );
  }
}
