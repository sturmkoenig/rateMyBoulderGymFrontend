import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { RatingService } from 'src/app/services/rating.service';
import { Observable, map } from 'rxjs';
import { RatingPageComponent } from '../rating-page/rating-page.component';
import { Rating, RatingCategories } from 'src/app/model/rating';

function groubBy(list: any, keyGetter: any) {
  const map = new Map();
  list.forEach((item: any) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

@Component({
  selector: 'app-data-visualization-page',
  template: `
    <canvas
      *ngIf="(data$ | async) !== null"
      baseChart
      class="chart"
      [data]="(data$ | async)!"
      [options]="barChartOptions"
      [plugins]="barChartPlugins"
      [type]="barChartType"
    ></canvas>
  `,
  styles: [
    `
      .chart {
      }
    `,
  ],
})
export class DataVisualizationPageComponent {
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective | undefined;
  testVal = 0;
  data$: Observable<ChartData<'bar'>>;

  private ratingCategoryKeys: (keyof RatingCategories)[] = [
    'ratingFun',
    'ratingTrainingArea',
    'ratingMusic',
    'ratingFood',
    'ratingCoffe',
    'ratingAthmosphere',
    'ratingShop',
    'ratingChildPollution',
  ];

  constructor(private ratingService: RatingService) {
    this.data$ = this.ratingService.allRatings.pipe(
      map((ratings) => {
        let labels: String[] = [];
        let datasets: { data: number[]; label: string; stack: string }[] = [];
        for (let key of this.ratingCategoryKeys) {
          datasets.push({ data: [], label: key, stack: 'a' });
        }
        let groupedByBoulderGym: Map<String, Rating[]> = groubBy(
          ratings,
          (rating: Rating) => rating.boulderGymName
        );

        groupedByBoulderGym.forEach(
          (ratingsOfGym: Rating[], boulderGymName: String) => {
            let averagedRatingCategories =
              this.calculateAverageRating(ratingsOfGym);
            for (let key of this.ratingCategoryKeys) {
              datasets
                .filter((dataset) => dataset.label === key)[0]
                .data.push(averagedRatingCategories[key]);
            }
            labels.push(ratingsOfGym[0].boulderGymName);
          }
        );
        return {
          labels: labels,
          datasets: datasets,
        };
      })
    );
  }
  calculateAverageRating(ratings: Rating[]): RatingCategories {
    let averagedRatingCategories: RatingCategories = {
      ratingFun: 0,
      ratingTrainingArea: 0,
      ratingMusic: 0,
      ratingFood: 0,
      ratingCoffe: 0,
      ratingAthmosphere: 0,
      ratingShop: 0,
      ratingChildPollution: 0,
    };
    ratings.forEach((rating) => {
      for (let key of this.ratingCategoryKeys) {
        averagedRatingCategories[key] += rating.ratingCategories[key];
      }
    });

    for (let key of this.ratingCategoryKeys) {
      averagedRatingCategories[key] /= ratings.length;
    }
    return averagedRatingCategories;
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
}
