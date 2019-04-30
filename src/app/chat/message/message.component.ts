import {Component, Input, OnInit} from '@angular/core';
import {Message, MessageAddedGQL, User, UserGQL} from '../../graphql/generated/graphql';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  user: User;
  userId: string = sessionStorage.getItem('userId');
  @Input() messagesArray: Message[] = [];

  constructor(private messageAddedGQL: MessageAddedGQL, private userGQL: UserGQL) {

    this.userGQL
      .watch({id: sessionStorage.getItem('userId')}).valueChanges
      .pipe(map(response => response.data.user))
      .subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.messageAddedGQL.subscribe()
      .pipe(map(response => response.data.messageAdded))
      .subscribe((message: Message) => {
        this.messagesArray.push(message);
      });
  }

}
