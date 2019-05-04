import {Injectable} from '@angular/core';
import {User, UserJoinedGQL, UsersGQL} from '../graphql/generated/graphql';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/internal/operators/first';

@Injectable({
   providedIn: 'root'
})
export class UserService {

   private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
   user = this.userSubject.asObservable();

   private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
   users = this.usersSubject.asObservable();

   constructor(private usersGQL: UsersGQL, private userJoinedGQL: UserJoinedGQL) {
      this.usersGQL
         .watch().valueChanges
         .pipe(
            map(response => response.data.users), first())
         .subscribe(data => {
               this.usersChanged(data);
            }
         );

      this.userJoinedGQL
         .subscribe()
         .pipe(map(response => response.data.userConnected))
         .subscribe((user: User) => this.newUserAdded(user));
   }

   public userChanged(user: User) {
      this.userSubject.next(user);
   }

   public newUserAdded(user: User) {
      this.usersSubject.getValue().push(user);
      this.usersSubject.next(this.usersSubject.getValue());
   }

   public usersChanged(users?: User[]) {
      this.usersSubject.next(users);
   }
}
