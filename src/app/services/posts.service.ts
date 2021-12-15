/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UserService } from './user.service';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private userService: UserService) { }

  getPosts(pull: boolean = false) {

    if (pull) {
      this.paginaPosts = 0;
    }

    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);

  }


  createPost(post) {

    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/posts`, post, { headers })
        .subscribe(resp => {

          this.newPost.emit(resp['post']);
          resolve(true);
        });
    });

  }

  // subirImagen(img: string) {

  //   const options: FileUploadOptions = {
  //     fileKey: 'image',
  //     headers: {
  //       'x-token': this.usuarioService.token
  //     }
  //   };

  //   const fileTransfer: FileTransferObject = this.fileTransfer.create();

  //   fileTransfer.upload(img, `${URL}/posts/upload`, options)
  //     .then(data => {
  //       console.log(data);
  //     }).catch(err => {
  //       console.log('error en carga', err);
  //     });

  // }

}
