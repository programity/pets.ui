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
  user: User = {};

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }


  login(email: string, password: string) {

    const data = { email, password };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
        .subscribe(resp => {
          console.log(resp);

          // eslint-disable-next-line @typescript-eslint/dot-notation
          if (resp['ok']) {
            // eslint-disable-next-line @typescript-eslint/dot-notation
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


  signup(user: User) {

    // eslint-disable-next-line @typescript-eslint/no-shadow
    return new Promise(resolve => {

      this.http.post(`${URL}/user/create`, user)
        .subscribe(resp => {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          if (resp['ok']) {
            // eslint-disable-next-line @typescript-eslint/dot-notation
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

    // eslint-disable-next-line @typescript-eslint/no-shadow
    return new Promise(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, { headers })
        .subscribe(resp => {

          // eslint-disable-next-line @typescript-eslint/dot-notation
          if (resp['ok']) {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            this.user = resp['user'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });

    });
  }

}
