import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {
  AddMessageGQL,
  Conversation,
  CreateConversationGQL,
  User,
  UserGQL,
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
  currentConversation: Conversation;

  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;

  constructor(private addMessageGQL: AddMessageGQL,
              private usersGQL: UsersGQL,
              private userGQL: UserGQL,
              private createConversationGQL: CreateConversationGQL) {
  }

  formatter = (result: User) => result.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.users.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  ngOnInit() {

    this.userGQL
      .watch({id: sessionStorage.getItem('userId')}).valueChanges
      .pipe(map(response => response.data.user))
      .subscribe(user => this.user = user);

    this.usersGQL
      .watch().valueChanges
      .pipe(
        map(response => response.data.users))
      .subscribe(data => {
          this.users = data.filter(user => user.id !== this.userId);
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
    }).subscribe().unsubscribe();

    inputElement.value = '';
  }

  userSelected($event: NgbTypeaheadSelectItemEvent) {
    let uId = [$event.item.id, this.userId];

    this.createConversationGQL
      .mutate({userIds: uId})
      .subscribe((response) => {
        this.currentConversation = response.data.createConversation;
        console.log(this.currentConversation)
      });
  }
}
