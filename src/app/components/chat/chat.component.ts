import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import MyMsg from 'src/app/interfaces/myMsg.interface';
import { MsgService } from 'src/app/services/msg.service';
import {
  trigger,
  transition,
  animate,
  state,
  style,
} from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { ScrollTopService } from 'src/app/services/scroll-top.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('mgsEnter', [
      state(
        'void',
        style({
          transform: ' translateY(100%)',
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          '500ms ease-in-out',
          style({
            transform: 'translateY(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class ChatComponent implements OnInit {
  constructor(
    private msgService: MsgService,
    private userService: UserService,
    private scrollTopService: ScrollTopService
  ) { }

  @Input() scrollTop: boolean = false;

  isLoading: boolean = true;
  user: any;

  messages: MyMsg[] = [
    {
      text: '',
      createdAt: Timestamp.fromDate(new Date()),
      uid: '',
      photoURL: '',
      name: '',
    },
  ];

  messagesLoader: { text: string; uid: string }[] = [
  ];

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

    this.messagesLoader = [

      {
        text: this.generateRandomLetters(),
        uid: '',
      },
      {
        text: this.generateRandomLetters(),
        uid: '',
      },
      {
        text: this.generateRandomLetters(),
        uid: this.user.uid,
      },
      {
        text: this.generateRandomLetters(),
        uid: '',
      },
      {
        text: this.generateRandomLetters(),
        uid: '',
      },
      {
        text: this.generateRandomLetters(),
        uid: '',
      },
      {
        text: this.generateRandomLetters(),
        uid: this.user.uid,
      },
      {
        text: this.generateRandomLetters(),
        uid: '',
      },
      {
        text: this.generateRandomLetters(),
        uid: '',
      },
    ]


    this.msgService.listMsg().subscribe((resp) => {
      this.messages = resp.reverse();
      this.isLoading = false;
      setTimeout(() => { this.scrollToTheLastElementByClassName(); }, 800)
    });
  }

  generateRandomLetters(): string {
    let numLetters: number = Math.floor(Math.random() * 50) + 5;
    let result = '';
    for (let i = 0; i < numLetters; i++) {
      result += `. `;
    }
    return result;
  }


  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName('message');
    let lastElement: any = elements[elements.length - 1];
    let toppos = lastElement.offsetTop;
    let chatRoomMessages = document.getElementById('chat-room-messages');
    if (chatRoomMessages !== null) {
      chatRoomMessages.scrollTop = toppos;
    }
  }

}
