import { Component, OnInit, OnChanges } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions2days',
  templateUrl: './wind-directions2days.component.html'
})
export class WindDirections2daysComponent extends WindDirectionsParentComponent implements OnInit {

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
      this.windDirection = data.list[12].wind.deg;
    });
  }

}
