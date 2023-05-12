import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import MyMsg from 'src/app/interfaces/myMsg.interface';
import { MsgService } from 'src/app/services/msg.service';
import { UserService } from 'src/app/services/user.service';
import { ChatComponent } from '../chat/chat.component';
import { ScrollTopService } from 'src/app/services/scroll-top.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})



export class SendMessageComponent {

  textMessage: string = '';

  myMesagge: MyMsg = {
    text: '',
    createdAt: Timestamp.fromDate(new Date()),
    uid: '',
    photoURL: '',
    name: ''
  };

  constructor(
    private msgService: MsgService,
    private userService: UserService,
    private scrollTopService: ScrollTopService

  ) {

  }


  async sendMsg() {
    if (this.textMessage !== '') {
      this.myMesagge = {
        text: this.textMessage,
        createdAt: Timestamp.fromDate(new Date()),
        uid: this.userService.getCurrentUser()?.uid || '',
        photoURL: this.userService.getCurrentUser()?.photoURL || '',
        name: this.userService.getCurrentUser()?.displayName?.split(" ", 1)[0] || '',
      }
      this.textMessage = '';
      await this.msgService.addMsg(this.myMesagge)
        .then((msg) => {
          this.scrollTopService.scrollTop.next(true)
        })
        .catch((err) => { console.log(err) })
    }

  }
}
