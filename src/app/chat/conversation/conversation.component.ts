import {Component, Input, OnInit} from '@angular/core';
import {Conversation, User, UserGQL} from '../../graphql/generated/graphql';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  user: User;
  userId: string = sessionStorage.getItem('userId');
  @Input() conversation: Conversation;

  constructor(private userGQL: UserGQL) {
  }

  ngOnInit() {
    this.userGQL
      .watch({id: sessionStorage.getItem('userId')}).valueChanges
      .pipe(map(response => response.data.user))
      .subscribe(user => {
        this.user = user
      });
  }
}
