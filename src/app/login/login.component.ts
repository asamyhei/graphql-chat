import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {AddUserGQL, User} from '../graphql/generated/graphql';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private addUserGQL: AddUserGQL,
              private route: Router) {
  }

  ngOnInit() {
  }

  connect(inputElement: HTMLInputElement) {
    this.addUserGQL.mutate({name: inputElement.value})
      .pipe(map(response => response.data.addUser))
      .subscribe((data: User) => {
        sessionStorage.setItem('userId', data.id);
        this.route.navigate(['/chat']);
      });
  }
}
