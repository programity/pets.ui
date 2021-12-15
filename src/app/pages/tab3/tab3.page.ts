import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UIServiceService } from 'src/app/services/uiservice.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User = {};

  constructor(private userService: UserService,
    private uiService: UIServiceService,
    private postsService: PostsService) { }


  ngOnInit() {

    this.user = this.userService.getUsers();
    console.log(this.user);
  }

  async update(fUpdate: NgForm) {

    if (fUpdate.invalid) { return; }

    const actualizado = await this.userService.updateUser(this.user);
    if (actualizado) {
      // toast con el mensaje de actualizado
      this.uiService.presentToast('Registro actualizado');
    } else {
      // toast con el error
      this.uiService.presentToast('No se pudo actualizar');
    }

  }


  logout() {

    this.postsService.paginaPosts = 0;
    this.userService.logout();

  }

}
