/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';


const URL = environment.url;


@Injectable({
  providedIn: 'root'
})

export class UserService {


  token: string = null;
  private user: User = {};

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }


  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
        .subscribe(resp => {
          console.log(resp);

          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  // Methods logout

  logout() {
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }



  registro(user: User) {

    return new Promise(resolve => {

      this.http.post(`${URL}/user/create`, user)
        .subscribe(async resp => {
          console.log(resp);

          if (resp['ok']) {
            await this.guardarToken(resp['token']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }

        });
    });

  }


  getUsers() {
    if (!this.user._id) {
      this.validaToken();
    }

    return { ...this.user };

  }


  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);
  }

  async loandToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.loandToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, { headers })
        .subscribe(resp => {


          if (resp['ok']) {
            this.user = resp['user'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });

    });
  }


  updateUser(user: User) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/user/update`, user, { headers })
        .subscribe(resp => {

          console.log(resp);

          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            resolve(false);
          }

        });

    });
  }

}
