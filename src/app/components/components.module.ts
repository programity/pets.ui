import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { AvatarComponent } from './avatar/avatar.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarComponent
  ],
  exports: [
    PostsComponent,
    AvatarComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule
  ]
})
export class ComponentsModule { }
