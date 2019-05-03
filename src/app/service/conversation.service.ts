import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Conversation, CreateConversationGQL, NewConversationGQL} from '../graphql/generated/graphql';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private conversationSubject: BehaviorSubject<Conversation> = new BehaviorSubject(null);
  conversation = this.conversationSubject.asObservable();

  private newConversationSubject: BehaviorSubject<Conversation> = new BehaviorSubject(null);
  newConversation = this.newConversationSubject.asObservable();

  constructor(private newConversationGQL: NewConversationGQL, private createConversationGQL: CreateConversationGQL) {
    this.newConversationGQL.subscribe()
      .pipe(map(response => response.data.newConversation), first())
      .subscribe((conversation: Conversation) => {
          this.changeConversation(conversation);
        }
      );
  }

  changeConversation(conversation: Conversation) {
    this.conversationSubject.next(conversation);
  }

  createNewConversation(userIds: string[]) {
    this.createConversationGQL
      .mutate({userIds: userIds})
      .pipe()
      .subscribe((response) => {
        this.changeConversation(response.data.createConversation);
      });
  }
}
