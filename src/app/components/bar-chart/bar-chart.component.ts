import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-bar-chart',
  template: `
    <canvas
      baseChart
      class="chart"
      [data]="barChartData"
      [options]="barChartOptions"
      [plugins]="barChartPlugins"
      [type]="barChartType"
    ></canvas>
    <mat-slider min="0" max="100" [discrete]="true">
      <input
        matSliderThumb
        [value]="testVal"
        (valueChange)="changeValue($event)"
      />
    </mat-slider>
  `,
  styles: [],
})
export class BarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective | undefined;
  testVal = 0;

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.ratingService.getAllRatings().subscribe((data) => console.log(data));
  }

  changeValue(newVal: number) {
    this.testVal = newVal;
    this.chart?.ngOnChanges({});
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

  public barChartData: ChartData<'bar'> = {
    labels: ['berta-block', 'ost-bloc'],
    datasets: [
      {
        data: [this.testVal, 59],
        label: 'fun',
        stack: 'a',
        backgroundColor: 'red',
      },
      { data: [25, 48], label: 'price', stack: 'a' },
    ],
  };
}
