import {Component, Input, OnInit} from '@angular/core';
import {Message, MessageAddedGQL, User, UserGQL} from '../../graphql/generated/graphql';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  userId: string = sessionStorage.getItem('userId');
  @Input() user: User;
  @Input() messagesArray: Message[] = [];

  constructor(private messageAddedGQL: MessageAddedGQL) {

  }

  ngOnInit() {
  }

}
