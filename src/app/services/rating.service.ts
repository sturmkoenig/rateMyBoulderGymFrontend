import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating, RatingDTO, RatingEntity } from '../model/rating';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private ratingToRatingEntity(rating: Rating): RatingEntity {
    return {
      user_name: rating.userName,
      boulder_gym_name: rating.boulderGymName,
      rating_fun: rating.ratingCategories.ratingFun,
      rating_training_area: rating.ratingCategories.ratingTrainingArea,
      rating_music: rating.ratingCategories.ratingMusic,
      rating_food: rating.ratingCategories.ratingFood,
      rating_coffe: rating.ratingCategories.ratingCoffe,
      rating_athmosphere: rating.ratingCategories.ratingAthmosphere,
      rating_shop: rating.ratingCategories.ratingShop,
      rating_child_pollution: rating.ratingCategories.ratingChildPollution,
    };
  }

  private url = 'http://localhost:5001/rating';
  public allRatings: BehaviorSubject<Rating[]>;
  public userRatings!: Observable<Rating[]>;

  constructor(private httpClient: HttpClient) {
    this.allRatings = new BehaviorSubject<Rating[]>([]);
    this.getAllRatings().subscribe((data) => this.allRatings.next(data));
  }

  updateAllRatings() {
    this.getAllRatings().subscribe((data) => this.allRatings.next(data));
  }

  getAllRatings(): Observable<Rating[]> {
    return this.httpClient.get<RatingDTO[]>(this.url).pipe(
      map((ratingDTOs: RatingDTO[]) =>
        ratingDTOs.map((ratingDTO) => {
          let rating: Rating = {
            userName: ratingDTO.user_name.toString(),
            boulderGymName: ratingDTO.boulder_gym_name.toString(),
            ratingCategories: {
              ratingFun: ratingDTO.rating_fun,
              ratingTrainingArea: ratingDTO.rating_training_area,
              ratingMusic: ratingDTO.rating_music,
              ratingFood: ratingDTO.rating_food,
              ratingCoffe: ratingDTO.rating_coffe,
              ratingAthmosphere: ratingDTO.rating_athmosphere,
              ratingShop: ratingDTO.rating_shop,
              ratingChildPollution: ratingDTO.rating_child_pollution,
            },
          };
          return rating;
        })
      )
    );
  }

  mergeRating(rating: Rating): void {
    const ratingEntity: RatingEntity = this.ratingToRatingEntity(rating);
    console.log('merging rating: ' + JSON.stringify(ratingEntity));
    let subscription = this.httpClient.put(this.url, ratingEntity).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error(err),
      complete: () => this.updateAllRatings(),
    });
  }
}
