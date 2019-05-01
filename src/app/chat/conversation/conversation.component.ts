import {Component, Input, OnInit} from '@angular/core';
import {Conversation, User, UserGQL} from '../../graphql/generated/graphql';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  @Input() user: User;
  userId: string = sessionStorage.getItem('userId');
  @Input() conversation: Conversation;

  constructor(private userGQL: UserGQL) {
  }

  ngOnInit() {
  }
}
