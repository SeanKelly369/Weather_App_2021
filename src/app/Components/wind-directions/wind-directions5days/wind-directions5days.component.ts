import { Component, OnInit, OnChanges } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions5days',
  templateUrl: './wind-directions5days.component.html'
})
export class WindDirections5daysComponent extends WindDirectionsParentComponent implements OnInit {

  public windDirection: any;

  constructor(public override getWeather: WeatherDataService) {
    super(getWeather);
    super.ngOnInit();
  }

  override async ngOnInit() {
    await this.getWeather.initialize();
    this.getWindData();
  }

    getWindData() {
    this.getWeather.getForeCast().subscribe((data: any) => {

      if (data.list[39] !== undefined) {
        this.windDirection = data.list[39].wind.deg;
      } else if (data.list[38] !== undefined) {
          this.windDirection = data.list[38].wind.deg;
      } else if (data.list[37] !== undefined) {
          this.windDirection = data.list[37].wind.deg;
      } else {
          this.windDirection = data.list[31].wind.deg;
      }
    });
  }

}
