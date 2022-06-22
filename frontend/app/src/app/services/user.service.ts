import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';

  login(username, password){
    const data={
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/user/login`, data);
  }

  register(odgLice, username, password, passwordConfirm, phone, email, title, address, pib, matBr){
    const data={
      odgLice: odgLice,
      username: username,
      password: password,
      passwordConfirm: passwordConfirm,
      phone: phone,
      email: email,
      title: title,
      address: address,
      pib: pib,
      matBr: matBr,
      type: 0
    }

    return this.http.post(`${this.uri}/user/register`, data);

  }
}
