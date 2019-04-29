import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddMessageGQL, Message, User} from '../graphql/generated/graphql';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  user: User = JSON.parse(sessionStorage.getItem('user'));
  selectedConversationId: string = null;
  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;

  constructor(private addMessageGQL: AddMessageGQL) {
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  sendMessage(inputElement: HTMLInputElement) {
    this.addMessageGQL.mutate({
      content: inputElement.value,
      userIds: [this.user.id],
      conversationIds: this.selectedConversationId
    }).subscribe((message: Message) => {
      console.log(message)
      this.selectedConversationId = message.conversation.id;
      console.log(this.selectedConversationId);
    });
    inputElement.value = '';
  }

  updateName($event: any) {
    console.log($event.target.value);

  }
}
