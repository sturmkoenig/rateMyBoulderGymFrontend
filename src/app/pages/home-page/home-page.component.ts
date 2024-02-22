import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/app/model/user';

@Component({
  selector: 'app-home-page',
  template: `
    <span class="greeting-page">
      <span class="greeting-page__text">
        <mat-form-field> </mat-form-field>
      </span>
    </span>
  `,
  styles: [
    `
      .greeting-page {
        height: 100%;
        width: 100%;
        display: flex;
        margin-top: 80px;
        justify-content: center;
        text-align: center;
        &__text {
        }
      }
    `,
  ],
})
export class HomePageComponent {
  selectedUser: BehaviorSubject<string> = new BehaviorSubject('Unknown User');
  Users = Users;

  updateSelectedUser($event: MatSelectChange) {
    this.selectedUser.next($event.value);
  }
}
