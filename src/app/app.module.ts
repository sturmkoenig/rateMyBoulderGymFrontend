import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingComponent } from './components/rating/rating.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingPageComponent } from './pages/rating-page/rating-page.component';
import { DataVisualizationPageComponent } from './pages/data-visualization-page/data-visualization-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    BarChartComponent,
    RatingPageComponent,
    DataVisualizationPageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NgChartsModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: '93629186-9034-4ce8-be3b-3af789f1a0a7', // Application (client) ID from the app registration
          authority:
            'https://login.microsoftonline.com/77347a0d-fdb5-4c51-9172-aaacde3216d4', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: 'https://witty-dune-0ac355d03.4.azurestaticapps.net', // This is your redirect URI
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      //@ts-ignore
      null,
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
