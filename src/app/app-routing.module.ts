import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ChatRoomComponent, ...canActivate(() => redirectUnauthorizedTo(['login'])) },
  { path: '**', redirectTo: "" }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
