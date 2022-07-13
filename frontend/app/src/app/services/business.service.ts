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

  logout(){
    localStorage.clear();
    return;
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

  getUserPIB(pib){
    const data={
      pib: pib
    }
    return this.http.post(`${this.uri}/business/searchPIB`, data);
  }

  register(odgLice, username, password, passwordConfirm, phone, email, title, address, pib, matBr, logo){
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
      type: 0,
      logo: logo,
    }

    return this.http.post(`${this.uri}/business/register`, data);

  }

  extraInfo(category, activities, pdv, accNum, username, kaseL, kaseT, skladistaId, skladistaNaz){
    const data={
      category: category,
      activities: activities,
      pdv: pdv, 
      accNum: accNum,
      username: username,
      kaseL: kaseL,
      kaseT: kaseT,
      skladistaId: skladistaId,
      skladistaNaz: skladistaNaz
    }

    return this.http.post(`${this.uri}/business/extraInfo`, data);
  }


  update(odgLice, phone, email, username){
    const data={
      odgLice: odgLice,
      phone: phone,
      email: email,
      username: username
    }
    return this.http.post(`${this.uri}/business/update`, data);
  }

  updateAcc(accNum, username){
    const data={
      accNum: accNum,
      username: username
    }
    return this.http.post(`${this.uri}/business/updateAcc`, data);
  }

  updateStorage(kaseL, kaseT, skladistaNaz, skladistaId, username){
    const data={
      kaseL: kaseL,
      kaseT: kaseT,
      skladistaId: skladistaId,
      skladistaNaz: skladistaNaz,
      username: username
    }
    return this.http.post(`${this.uri}/business/updateStorage`, data);
  }

  searchPIB(pib){
    const data={
      pib: pib
    }
    return this.http.post(`${this.uri}/business/searchPIB`, data);
  }

  addOrderer(user, orderer){
    const data={
      user: user,
      orderer: orderer
    }
    return this.http.post(`${this.uri}/business/addOrderer`, data);
  }

  updateOrd(orderer, user){
    const data={
      user: user,
      orderer: orderer
    }
    return this.http.post(`${this.uri}/business/updateOrderer`, data);
  }
}
