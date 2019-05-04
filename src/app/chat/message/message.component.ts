import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Conversation, User} from '../../graphql/generated/graphql';

@Component({
   selector: 'app-message',
   templateUrl: './message.component.html',
   styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

   userId: string = sessionStorage.getItem('userId');
   @Input() user: User;
   @Input() currentConversation: Conversation;

   constructor() {

   }

   ngOnInit() {
   }

}
