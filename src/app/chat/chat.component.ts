import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddMessageGQL, User} from '../grapql/generated/graphql';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  user: User = JSON.parse(sessionStorage.getItem('user'));
  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;

  constructor(private addMessageGQL: AddMessageGQL) {

    /*this.userJoinedGQL.subscribe()
      .pipe(map(response => response.data.userConnected))
      .subscribe(user => {
        this.users.push(user);
        document.getElementById('chat-container').append('<div class="text-center w-100">{{user.name}}</div>');
      });
*/
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
    this.addMessageGQL.mutate({content: inputElement.value, userId: this.user.id}).subscribe().unsubscribe();
    inputElement.value = '';
  }

}
