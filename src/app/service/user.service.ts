import { Injectable } from '@angular/core';
import {Conversation, User, UserGQL} from '../graphql/generated/graphql';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/internal/operators/first';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  user = this.userSubject.asObservable();

  constructor(private userGQL: UserGQL) {

    this.userGQL
      .watch({id: sessionStorage.getItem('userId')}).valueChanges
      .pipe(map(response => response.data.user), first())
      .subscribe(user => {
        this.userChanged(user);
      })

  }

  public userChanged(user: User) {
    console.log('user updated');
    this.userSubject.next(user);
  }
}
