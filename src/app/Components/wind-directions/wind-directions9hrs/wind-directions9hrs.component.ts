import { Component, OnInit, OnChanges } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions9hrs',
  templateUrl: './wind-directions9hrs.component.html'
})
export class WindDirections9hrsComponent extends WindDirectionsParentComponent implements OnInit {

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
      this.windDirection = data.list[3].wind.deg;
    });
  }

}
