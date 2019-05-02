import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, first, map} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {
  AddMessageGQL,
  Conversation,
  CreateConversationGQL,
  Message,
  MessageAddedGQL,
  NewConversationGQL,
  User,
  UserGQL,
  UserJoinedGQL,
  UsersGQL
} from '../graphql/generated/graphql';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  user: User;
  userId: string = sessionStorage.getItem('userId');
  users: User[] = [];
  currentConversation: Conversation = null;
  currentConversationIndex: number = 0;

  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;

  constructor(private addMessageGQL: AddMessageGQL,
              private usersGQL: UsersGQL,
              private userGQL: UserGQL,
              private createConversationGQL: CreateConversationGQL,
              private messageAddedGQL: MessageAddedGQL,
              private newConversation: NewConversationGQL,
              private userJoinedGQL: UserJoinedGQL) {
  }

  formatter = (result: User) => result.name;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.users.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );

  ngOnInit() {
    this.userGQL
      .watch({id: sessionStorage.getItem('userId')}).valueChanges
      .pipe(map(response => response.data.user), first())
      .subscribe(user => {
        this.user = user;
        if (this.user.conversations) {
          this.currentConversation = this.user.conversations.sort((c1, c2) => c1.timestamp - c2.timestamp > 0 ? -1 : 1)[0];
        }
      });

    this.usersGQL
      .watch().valueChanges
      .pipe(
        map(response => response.data.users), first())
      .subscribe(data => {
          this.users = data.filter(user => user.id !== this.userId);
        }
      );

    this.userJoinedGQL
      .subscribe()
      .pipe(map(response => response.data.userConnected))
      .subscribe((user: User) => this.users.push(user));


    this.messageAddedGQL.subscribe()
      .pipe(map(response => response.data.messageAdded))
      .subscribe((message: Message) => {
        let convIndex = this.user.conversations.map(conv => conv.id).indexOf(message.conversation.id);
        if (convIndex > -1) {
          this.user.conversations[convIndex].messages.push(message);
          this.user.conversations.sort((c1, c2) => c1.timestamp - c2.timestamp > 0 ? -1 : 1)
        }
      });

    this.newConversation.subscribe()
      .pipe(map(response => response.data.newConversation), first())
      .subscribe((conversation: Conversation) => {
          if (conversation.users.map(u => u.id).indexOf(this.user.id) > -1) {
            this.user.conversations.push(conversation)
          }
        }
      );

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
      userId: this.userId,
      conversationId: this.currentConversation.id
    }).pipe(first()).subscribe();

    inputElement.value = '';
  }

  userSelected($event: NgbTypeaheadSelectItemEvent,) {
    const uId = [$event.item.id, this.userId];

    this.createConversationGQL
      .mutate({userIds: uId})
      .pipe(first())
      .subscribe((response) => {
        this.changeConversation(response.data.createConversation);
      });
  }

  changeConversation(conversation: Conversation) {
    this.currentConversation = conversation;
    this.currentConversationIndex = this.user.conversations.map(conv => conv.id).indexOf(conversation.id);
  }
}
