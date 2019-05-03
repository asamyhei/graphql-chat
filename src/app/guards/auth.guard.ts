import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';
import {UserGQL} from '../graphql/generated/graphql';
import {map} from 'rxjs/operators';
import {first} from 'rxjs/internal/operators/first';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private userGQL: UserGQL, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {


    if (!sessionStorage.getItem('userId')) {
      this.router.navigate(['/login']);
      return false;
    }

    return new Observable<boolean>((observer) => {
      this.userGQL
        .watch({id: sessionStorage.getItem('userId')})
        .valueChanges.pipe(map(response => response.data.user), first())
        .subscribe(data => {
          this.userService.userChanged(data);
          observer.next(true);
          observer.complete();
        });
    });
  }
}
