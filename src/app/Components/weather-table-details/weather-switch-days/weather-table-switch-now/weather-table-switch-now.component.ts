import { Component, OnInit } from '@angular/core';
import { WeatherTableDetailsComponent } from '../../weather-table-details.component';
import { WeatherDataService } from '../../../../Services/weather-data.service';

@Component({
  selector: 'app-weather-table-switch-now',
  templateUrl: './weather-table-switch-now.component.html',
  styleUrls: ['./weather-table-switch-now.component.scss']

})
export class WeatherTableSwitchNowComponent extends WeatherTableDetailsComponent implements OnInit {

  now: any;
  nightOrDay!: string;

  constructor(getWeather: WeatherDataService) {
    super(getWeather);
  }

  getDayLen() {
    this.getWeather.getForeCast().subscribe((data: JSON) => {
      this.now = data;
      console.log(this.now);
      this.nightOrDay = this.now.list[0].sys.pod;
    });
  }

  override async ngOnInit() {
    super.ngOnInit();
    await this.getWeather.initialize();
    this.getDayLen();
  }

}
