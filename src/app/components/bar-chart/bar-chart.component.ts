import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-bar-chart',
  template: ``,
  styles: [],
})
export class BarChartComponent {}
