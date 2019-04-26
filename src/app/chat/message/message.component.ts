import {Component, OnInit} from '@angular/core';
import {Message, MessageAddedGQL, User} from '../../grapql/generated/graphql';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  user: User = JSON.parse(sessionStorage.getItem('user'));
  messagesArray: Message[] = [];

  constructor(private messageAddedGQL: MessageAddedGQL) {
  }

  ngOnInit() {

    this.messageAddedGQL.subscribe()
      .pipe(map(response => response.data.messageAdded))
      .subscribe((message: Message) => {
        this.messagesArray.push(message);
      });
  }

}
