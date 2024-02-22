import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingPageComponent } from './pages/rating-page/rating-page.component';
import { DataVisualizationPageComponent } from './pages/data-visualization-page/data-visualization-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserUtils } from '@azure/msal-browser';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
  {
    path: 'data',
    children: [
      {
        path: '',
        canActivate: [MsalGuard],
        component: DataVisualizationPageComponent,
      },
    ],
  },
  {
    path: 'rating',
    canActivate: [MsalGuard],
    children: [
      {
        path: '',
        component: RatingPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
