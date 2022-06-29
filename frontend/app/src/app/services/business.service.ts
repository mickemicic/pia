import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';

  login(username, password){
    const data={
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/business/login`, data);
  }


  getUser(username){
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/business/search`, data);
  }

  getUserM(email){
    const data={
      email: email
    }
    return this.http.post(`${this.uri}/business/searchMail`, data);
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

    return this.http.post(`${this.uri}/business/register`, data);

  }
}
