import {Component, OnInit} from '@angular/core';
import {User} from '../../grapql/generated/graphql';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('user'));

  constructor() {
  }

  ngOnInit() {
  }

}
