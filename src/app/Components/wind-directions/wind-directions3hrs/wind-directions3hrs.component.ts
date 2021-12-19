import { Component, OnInit, OnChanges } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions3hrs',
  templateUrl: './wind-directions3hrs.component.html'
})
export class WindDirections3hrsComponent extends WindDirectionsParentComponent implements OnInit {

  public windDirection: any;
  isC: boolean = false;

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
      this.windDirection = data.list[1].wind.deg;
    });
  }

}
