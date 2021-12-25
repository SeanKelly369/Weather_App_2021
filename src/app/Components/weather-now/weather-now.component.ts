import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() outputC = new EventEmitter<boolean>();
  @Output() outputKM = new EventEmitter();
  override isC: boolean = false;
  override isKm: boolean = false;

  constructor(public getWeather: WeatherDataService) {
    super();
  }

  override async ngOnInit() {
    await this.getWeather.initialize();
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
      this.localWeather = data;
      this.humidity = this.localWeather.main.humidity;
      this.pressure = this.localWeather.main.pressure;
      this.windSpeed = this.localWeather.wind.speed;
      this.windDirection = this.localWeather.wind.deg;
    });
  }


  ToggleWeatherMeasurement(isC: boolean) {
    this.tempToggle++;
    this.tempToggle % 2 === 0 ? this.isC = true : this.isC = false;
    this.outputC.emit(this.isC);
  }


  ToggleDistanceMeasurement(isKm: boolean) {
    this.speedMeasurementToggle++;
    this.speedMeasurementToggle % 2 === 0 ? this.isKm = true : this.isKm = false;
    this.outputKM.emit(this.isKm);
  }

}
