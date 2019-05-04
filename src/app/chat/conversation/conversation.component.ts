import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Conversation, User} from '../../graphql/generated/graphql';
import {ConversationService} from '../../service/conversation.service';

@Component({
   selector: 'app-conversation',
   templateUrl: './conversation.component.html',
   styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnChanges {

   @Input() user: User;
   @Input() conversation: Conversation;
   otherUser: User;
   selectedConv: Conversation;

   constructor(private conversationService: ConversationService) {
      this.conversationService.conversation.subscribe(conv => this.selectedConv = conv);
   }

   ngOnInit() {
      this.otherUser = this.conversation.users.find(u => u.id !== this.user.id);
   }

   ngOnChanges(changes: SimpleChanges): void {

   }
}
