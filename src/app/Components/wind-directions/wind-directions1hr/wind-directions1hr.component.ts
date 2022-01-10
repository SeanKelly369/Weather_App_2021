import { Component } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions1hr',
  templateUrl: './wind-directions1hr.component.html'
})
export class WindDirections1hrComponent extends WindDirectionsParentComponent {

  constructor(public override getWeather: WeatherDataService) {
    super(getWeather);
  }

}
