import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WeatherDataService } from './Services/weather-data.service';

import { AppComponent } from './app.component';
import { GeoLocMapComponent } from './Components/geo-loc-map/geo-loc-map.component';
import { WeatherLocalComponent } from './Components/weather-local/weather-local.component';
import { WeatherNowComponent } from './Components/weather-now/weather-now.component';
import { WeatherTableDetailsComponent } from './Components/weather-table-details/weather-table-details.component';
import { WindDirections1dayComponent } from './Components/wind-directions/wind-directions1day/wind-directions1day.component';
import { WindDirections1hrComponent } from './Components/wind-directions/wind-directions1hr/wind-directions1hr.component';
import { WindDirections2daysComponent } from './Components/wind-directions/wind-directions2days/wind-directions2days.component';
import { WindDirections3daysComponent } from './Components/wind-directions/wind-directions3days/wind-directions3days.component';
import { WindDirections3hrsComponent } from './Components/wind-directions/wind-directions3hrs/wind-directions3hrs.component';
import { WindDirections4daysComponent } from './Components/wind-directions/wind-directions4days/wind-directions4days.component';
import { WindDirections5daysComponent } from './Components/wind-directions/wind-directions5days/wind-directions5days.component';
import { WindDirections9hrsComponent } from './Components/wind-directions/wind-directions9hrs/wind-directions9hrs.component';
import { WindDirections15hrsComponent } from './Components/wind-directions/wind-directions15hrs/wind-directions15hrs.component';
import { WindDirectionsNowComponent } from './Components/wind-directions/wind-directions-now/wind-directions-now.component';
import { WindDirectionsParentComponent } from './Components/wind-directions/wind-directions-parent/wind-directions-parent.component';
import { WeatherTableSwitchDay1Component } from './Components/weather-table-details/weather-switch-days/weather-table-switch-day1/weather-table-switch-day1.component';
import { WeatherTableSwitchDay2Component } from './Components/weather-table-details/weather-switch-days/weather-table-switch-day2/weather-table-switch-day2.component';
import { WeatherTableSwitchDay3Component } from './Components/weather-table-details/weather-switch-days/weather-table-switch-day3/weather-table-switch-day3.component';
import { WeatherTableSwitchDay4Component } from './Components/weather-table-details/weather-switch-days/weather-table-switch-day4/weather-table-switch-day4.component';
import { WeatherTableSwitchDay5Component } from './Components/weather-table-details/weather-switch-days/weather-table-switch-day5/weather-table-switch-day5.component';
import { WeatherTableSwitchFifteenHrsComponent } from './Components/weather-table-details/weather-switch-days/weather-table-switch-fifteen-hrs/weather-table-switch-fifteen-hrs.component';
import { WeatherTableSwitchNineHrsComponent } from './Components/weather-table-details/weather-switch-days/weather-table-switch-nine-hrs/weather-table-switch-nine-hrs.component';
import { WeatherTableSwitchNowComponent } from './Components/weather-table-details/weather-switch-days/weather-table-switch-now/weather-table-switch-now.component';
import { WeatherTableSwitchThreeHrsComponent } from './Components/weather-table-details/weather-switch-days/weather-table-switch-three-hrs/weather-table-switch-three-hrs.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GeoLocMapComponent,
    WeatherLocalComponent,
    WeatherNowComponent,
    WeatherTableDetailsComponent,
    WindDirections1dayComponent,
    WindDirections1hrComponent,
    WindDirections2daysComponent,
    WindDirections3daysComponent,
    WindDirections3hrsComponent,
    WindDirections4daysComponent,
    WindDirections5daysComponent,
    WindDirections9hrsComponent,
    WindDirections15hrsComponent,
    WindDirectionsNowComponent,
    WindDirectionsParentComponent,
    WeatherTableSwitchDay1Component,
    WeatherTableSwitchDay2Component,
    WeatherTableSwitchDay3Component,
    WeatherTableSwitchDay4Component,
    WeatherTableSwitchDay5Component,
    WeatherTableSwitchFifteenHrsComponent,
    WeatherTableSwitchNineHrsComponent,
    WeatherTableSwitchNowComponent,
    WeatherTableSwitchThreeHrsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
