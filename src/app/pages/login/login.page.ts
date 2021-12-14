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

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  };

  loginUser = {
    email: 'test@gmail.com',
    password: '123456'
  };

  signupUser: User = {
    email: 'test@gmail.com',
    password: '123456',
    name: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private userService: UserService, private navCtrl: NavController, private uiService: UIServiceService) {
  }

  ngOnInit() {
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

    const valido = await this.userService.signup(this.signupUser);

    if (valido) {
      // navegar a home screens.
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // show alerts
      this.uiService.alertInfo('El correo electrónico existe.');
    }
  }

  seleccionarAvatar(avatar: any) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
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
