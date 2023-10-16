import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingPageComponent } from './pages/rating-page/rating-page.component';
import { DataVisualizationPageComponent } from './pages/data-visualization-page/data-visualization-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rating',
    pathMatch: 'full',
  },
  {
    path: 'rating',
    children: [
      {
        path: '',
        component: RatingPageComponent,
      },
    ],
  },
  {
    path: 'data-visualization',
    children: [
      {
        path: '',
        component: DataVisualizationPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
