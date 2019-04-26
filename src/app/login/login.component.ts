import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {AddUserGQL, User} from '../grapql/generated/graphql';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = null;

  constructor(private addUserGQL: AddUserGQL, private route: Router) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('user') !== null) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.route.navigate(['/chat']);
    }
  }

  connect(inputElement: HTMLInputElement) {
    this.addUserGQL.mutate({name: inputElement.value})
      .pipe(map(response => response.data.addUser))
      .subscribe((data: User) => {
        this.user = data;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.route.navigate(['/chat']);
      });
  }
}
