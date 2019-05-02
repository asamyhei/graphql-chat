import { Injectable } from '@angular/core';
import {Conversation, User, UserGQL} from '../graphql/generated/graphql';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  currentConversation: Conversation;

  constructor(private userGQL: UserGQL) {

    this.userGQL
      .watch({id: sessionStorage.getItem('userId')}).valueChanges
      .pipe(map(response => response.data.user))
      .subscribe(user => {
        this.user = user;
        if (this.user.conversations) {
          this.currentConversation = this.user.conversations[0];
        }
      });
  }
}
