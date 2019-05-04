import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AddMessageGQL, Message, MessageAddedGQL} from '../graphql/generated/graphql';
import {first, map} from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class MessageService {

   /*private messageSubject:  BehaviorSubject<Message> = new BehaviorSubject(null);
   message = this.messageSubject.asObservable();*/

   private newMessageSubject: BehaviorSubject<Message> = new BehaviorSubject(null);
   newMessage = this.newMessageSubject.asObservable();

   constructor(private messageAddedGQL: MessageAddedGQL, private addMessageGQL: AddMessageGQL) {

      this.messageAddedGQL.subscribe()
         .pipe(map(response => response.data.messageAdded))
         .subscribe((message: Message) => {
            this.newMessageAdded(message);
         });

   }

   newMessageAdded(message: Message) {
      this.newMessageSubject.next(message);
   }

   addMessage(message: Message) {
      this.addMessageGQL.mutate({
         userId: message.user.id,
         content: message.content,
         conversationId: message.conversation.id
      }).pipe(first()).subscribe();

   }
}
