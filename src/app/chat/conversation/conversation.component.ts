import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Conversation, User, UserGQL} from '../../graphql/generated/graphql';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() conversation: Conversation;
  userId: string = sessionStorage.getItem('userId');
  otherUser: User;

  constructor(private userGQL: UserGQL) {
  }

  ngOnInit() {
    this.otherUser = this.conversation.users.find(u => u.id !== this.user.id);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
