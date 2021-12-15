import { IonSlides, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UIServiceService } from 'src/app/services/uiservice.service';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slider') slides: IonSlides;


  loginUser = {
    email: '',
    password: ''
  };

  registerUser: User = {
    email: '',
    password: '',
    name: '',
    avatar: 'av-1.png'
  };

  constructor(private userService: UserService, private navCtrl: NavController, private uiService: UIServiceService) {
  }

  ngOnInit() {
    // this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }

    const valido = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      // navegar a home screens.
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // show alerts
      this.uiService.alertInfo('Usuarios y contraseña no son correctos.');
    }
    // console.log(fLogin.valid);
    // console.log(this.loginUser);
  }

  async register(fRegister: NgForm) {

    if (fRegister.invalid) { return; }

    const valido = await this.userService.registro(this.registerUser);

    if (valido) {
      // navegar a home screens.
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // show alerts
      this.uiService.alertInfo('El correo electrónico existe.');
    }
  }


  showRegister() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }

  showLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }

}
