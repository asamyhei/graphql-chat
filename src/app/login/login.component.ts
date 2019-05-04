import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {AddUserGQL, User} from '../graphql/generated/graphql';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   showError = false;

   constructor(private addUserGQL: AddUserGQL,
               private route: Router,
               private userService: UserService) {
   }

   ngOnInit() {
   }

   connect(inputElement: HTMLInputElement, inputPassword: HTMLInputElement) {
      this.addUserGQL.mutate({name: inputElement.value, password: inputPassword.value})
         .pipe(map(response => response.data.addUser))
         .subscribe((data: User) => {
            if (data != null) {
               sessionStorage.setItem('userId', data.id);
               this.userService.userChanged(data);
               this.route.navigate(['/chat']);
            } else {
               this.showError = true;
            }
         });
   }
}
