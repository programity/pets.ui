import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  loadGeolocation = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor(private postsService: PostsService, private route: Router, private geolocation: Geolocation) { }

  async createPost() {
    console.log(this.post);
    const creado = await this.postsService.createPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeolocation() {

    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }

    this.loadGeolocation = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadGeolocation = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;


    }).catch((error) => {
      console.log('Error getting location', error);
      this.loadGeolocation = false;
    });


  }

}
