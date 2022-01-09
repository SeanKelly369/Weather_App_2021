import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../Services/weather-data.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'weather_now',
  templateUrl: './weather-now.component.html',
  styleUrls: ['./weather-now.component.scss']
})
export class WeatherNowComponent extends AppComponent implements OnInit {

  fiveDayForecast: any;
  tempToggle = 1;
  speedMeasurementToggle = 1;
  sunrise1Milli = 0;
  sunset1Milli = 0;
  public localWeather: any;
  public dayData: any;
  humidity = 0;
  pressure = 0;
  windSpeed: number = 0;
  windDirection = 0;
  filler: any;

  override isKm: boolean = false;

  constructor(public getWeather: WeatherDataService) {
    super();
  }

  override ngOnInit() {
    this.getWeather.initialize();
    this.getLocationDetail();
    this.getDayData();
  }

    getDayData() {
    this.getWeather.getSunriseSunsetToday(this.filler).subscribe((data: any) => {
      this.dayData = data;
    });
  }

    getLocationDetail() {
    this.getWeather.getLocationName().subscribe((data: any) => {
      console.log(data);
      this.localWeather = data;
      this.humidity = this.localWeather.main.humidity;
      this.pressure = this.localWeather.main.pressure;
      this.windSpeed = this.localWeather.wind.speed;
      this.windDirection = this.localWeather.wind.deg;
    });
  }


  ToggleWeatherMeasurement() {
    this.tempToggle++;
    this.tempToggle % 2 === 0 ? this.getWeather.isC = true : this.getWeather.isC = false;
  }


  ToggleDistanceMeasurement() {
    this.speedMeasurementToggle++;
    this.speedMeasurementToggle % 2 === 0 ? this.getWeather.isKm = false : this.getWeather.isKm = true;
  }

}
