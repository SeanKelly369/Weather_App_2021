import { Component } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions3days',
  templateUrl: './wind-directions3days.component.html'
})
export class WindDirections3daysComponent extends WindDirectionsParentComponent {

  constructor(public override getWeather: WeatherDataService) {
    super(getWeather);
  }
}
