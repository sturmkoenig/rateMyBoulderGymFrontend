import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { filter } from 'rxjs';
import { Rating, RatingSlider } from 'src/app/model/rating';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-rating',
  template: `
    @if (loginDisplay) {
      <div *ngIf="this.rating" class="slider-container">
        <div class="slider" *ngFor="let slider of sliders">
          <span class="slider__label">
            <mat-icon
              aria-hidden="false"
              aria-label="Example home icon"
              fontIcon="{{ slider.icon }}"
            ></mat-icon>
            <span class="slider__label__title">{{ slider.name }}</span>
          </span>
          <mat-slider [min]="0" [max]="10" [discrete]="true">
            <input
              matSliderThumb
              [(ngModel)]="rating.ratingCategories[slider.property]"
              (ngModelChange)="onSubmit()"
            />
          </mat-slider>
        </div>
      </div>
    } @else {
      <h4>Please login to view this page</h4>
    }
  `,
  styles: [
    `
      .slider-container {
        margin: 20px;
      }
      .slider {
        display: flex;
        flex-direction: row;
        align-items: center;

        &__title {
          margin: 10px;
        }
        &__label {
          display: flex;
          align-items: cener;
          flex-grow: 0;
          width: 200px;
          gap: 10px;
        }
      }
    `,
  ],
})
export class RatingComponent implements OnInit {
  _boulgerGymName?: string;

  @Input()
  rating!: Rating;
  loginDisplay?: boolean;

  public constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private ratingService: RatingService,
  ) {}
  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS,
        ),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None,
        ),
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  public sliders: RatingSlider[] = [
    {
      name: 'Fun',
      property: 'ratingFun',
      icon: 'home',
    },
    {
      name: 'Traingsbereich',
      property: 'ratingTrainingArea',
      icon: 'fitness_center',
    },
    {
      name: 'Musik',
      property: 'ratingMusic',
      icon: 'headphones',
    },
    {
      name: 'Verpflegung',
      property: 'ratingFood',
      icon: 'lunch_dining',
    },
    {
      name: 'Kaffe',
      property: 'ratingCoffe',
      icon: 'coffee',
    },
    {
      name: 'Athmosphare',
      property: 'ratingAthmosphere',
      icon: 'weekend',
    },
    {
      name: 'Shop',
      property: 'ratingShop',
      icon: 'shopping_cart',
    },
    {
      name: 'Kinderbelastung',
      property: 'ratingChildPollution',
      icon: 'volume_up',
    },
  ];

  public onSubmit(): void {
    this.ratingService.mergeRating(this.rating);
  }
}
