import { Component, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  forkJoin,
  map,
  tap,
} from 'rxjs';
import { BoulderGym, BoulderGyms } from 'src/app/model/boulder-gym';
import { Rating } from 'src/app/model/rating';
import { User, Users } from 'src/app/model/user';
import { RatingService } from 'src/app/services/rating.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rating-page',
  template: `
    <div class="rating-page-container">
      <mat-accordion
        class="rating-page"
        *ngIf="(this.selectedUser | async) !== null"
      >
        <mat-expansion-panel
          *ngFor="let boulderGym of BoulderGyms"
          (opened)="panelOpenState = true"
          (closed)="panelOpenState = false"
        >
          <mat-expansion-panel-header class="rating-page__exansion-panel">
            <mat-panel-title>
              <mat-checkbox
                [disabled]="true"
                [checked]="
                  isRatedByUser(
                    allRatingsByUser | async,
                    boulderGym.boulderGymName
                  )
                "
              ></mat-checkbox>
              {{ boulderGym.boulderGymName }}</mat-panel-title
            >
          </mat-expansion-panel-header>
          <app-rating
            [rating]="
              getUserRatingOfGym(
                allRatingsByUser | async,
                boulderGym.boulderGymName,
                (selectedUser | async)!
              )
            "
          ></app-rating>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [
    `
      .rating-page-container {
        margin: 20px;
      }
    `,
  ],
})
export class RatingPageComponent implements OnDestroy {
  public BoulderGyms: BoulderGym[] = BoulderGyms;
  selectedUser: BehaviorSubject<string>;
  panelOpenState = false;
  subscriptionRatings?: Subscription;
  allRatingsByUser?: Observable<Rating[]>;
  Users = Users;

  constructor(
    private ratingService: RatingService,
    private userService: UserService
  ) {
    this.selectedUser = this.userService.currentUser;
    this.allRatingsByUser = combineLatest([
      this.ratingService.allRatings.asObservable(),
      this.selectedUser.asObservable(),
    ]).pipe(map((x) => x[0].filter((rating) => rating.userName === x[1])));
    this.subscriptionRatings = this.allRatingsByUser?.subscribe();
  }
  ngOnDestroy(): void {
    if (this.subscriptionRatings) {
      this.subscriptionRatings?.unsubscribe();
    }
  }

  isRatedByUser(ratings: Rating[] | null, bouldgerGymName: string): boolean {
    if (!ratings) {
      return false;
    }
    let ratingForGym = ratings.filter(
      (rating) => rating.boulderGymName === bouldgerGymName
    );
    return ratingForGym.length !== 0;
  }

  getUserRatingOfGym(
    ratingsByUser: Rating[] | null,
    boulderGymName: string,
    userName: string
  ): Rating {
    let userRating = ratingsByUser?.find(
      (rating) => rating.boulderGymName == boulderGymName
    );
    if (!userRating) {
      userRating = {
        userName: userName,
        boulderGymName: boulderGymName,
        ratingCategories: {
          ratingFun: 5,
          ratingTrainingArea: 5,
          ratingMusic: 5,
          ratingFood: 5,
          ratingCoffe: 5,
          ratingAthmosphere: 5,
          ratingShop: 5,
          ratingChildPollution: 5,
        },
      };
    }
    return userRating;
  }
}
