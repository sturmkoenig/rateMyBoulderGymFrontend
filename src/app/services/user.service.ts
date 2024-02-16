import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Linus'
  );

  setCurrentUser(userName: string) {
    this.currentUser.next(userName);
  }
}
