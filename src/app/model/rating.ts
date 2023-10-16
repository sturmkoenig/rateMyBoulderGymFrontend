import { BoulderGym } from './boulder-gym';
import { User } from './user';

export interface RatingEntity {
  user_name: string;
  boulder_gym_name: string;
  rating_fun: number;
  rating_training_area: number;
  rating_music: number;
  rating_food: number;
  rating_coffe: number;
  rating_athmosphere: number;
  rating_shop: number;
  rating_child_pollution: number;
}

export interface RatingSlider {
  name: string;
  icon: string;
  property: keyof RatingCategories;
}

export interface RatingCategories {
  ratingFun: number;
  ratingTrainingArea: number;
  ratingMusic: number;
  ratingFood: number;
  ratingCoffe: number;
  ratingAthmosphere: number;
  ratingShop: number;
  ratingChildPollution: number;
}

export interface RatingDTO {
  boulder_gym_name: String;
  rating_athmosphere: number;
  rating_child_pollution: number;
  rating_coffe: number;
  rating_food: number;
  rating_fun: number;
  rating_music: number;
  rating_shop: number;
  rating_training_area: number;
  user_name: String;
}

export interface Rating {
  boulderGymName: string;
  userName: string;
  ratingCategories: RatingCategories;
}
