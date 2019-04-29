import {Component, Input, OnInit} from '@angular/core';
import {Conversation, User} from '../../graphql/generated/graphql';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  user: User = JSON.parse(sessionStorage.getItem('user'));
  @Input() conversation: Conversation;
  userImage: string = this.conversation.users.find(user => user.id !== this.user.id).picture_url;

  constructor() {
  }

  ngOnInit() {
  }

  logConversation() {
    console.log("conversation");
  }
}
