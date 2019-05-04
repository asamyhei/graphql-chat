import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, first, map} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {AddMessageGQL, Conversation, User} from '../graphql/generated/graphql';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';
import {ConversationService} from '../service/conversation.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  user: User;
  users: User[] = [];
  currentConversation: Conversation = null;

  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;

  constructor(private addMessageGQL: AddMessageGQL,
              private userService: UserService,
              private conversationService: ConversationService,
              private messageService: MessageService) {
  }

  formatter = (result: User) => result.name;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.users.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );

  ngOnInit() {
    this.userService.user.subscribe((user: User) => {
      this.user = user;
      if (this.user && this.user.conversations) {
        this.changeConversation(this.user.conversations[0]);
      }
    });

    this.userService.users.subscribe((users: User[]) => {
      this.users = users;
    });

    this.conversationService.conversation.subscribe(conversation => {
      if (conversation) {
        console.log(conversation);
        if (this.user.conversations.map(c => c.id).indexOf(conversation.id) <= -1
          && conversation.users.map(u => u.id).indexOf(this.user.id) > -1) {
          this.user.conversations.unshift(conversation);
        }
        this.currentConversation = conversation;
      }
    });

    this.messageService.newMessage.subscribe(message => {
      if (message) {
        const convIndex = this.user.conversations.map(conv => conv.id).indexOf(message.conversation.id);
        if (convIndex > -1) {
          this.user.conversations[convIndex].messages.push(message);
        }
        if (message.conversation.id === this.currentConversation.id) {
          this.currentConversation.messages = this.user.conversations[convIndex].messages;
        }
      }
    });

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

    this.messageService.addMessage({
      content: inputElement.value,
      user: this.user,
      conversation: this.currentConversation,
      id: null
    });

    inputElement.value = '';
  }

  userSelected($event: NgbTypeaheadSelectItemEvent,) {
    const uId = [$event.item.id, this.user.id];
    this.conversationService.createNewConversation(uId);
  }

  changeConversation(conversation: Conversation) {
    this.conversationService.changeConversation(conversation);
  }
}
