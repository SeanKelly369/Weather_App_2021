import { Component } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions5days',
  templateUrl: './wind-directions5days.component.html'
})
export class WindDirections5daysComponent extends WindDirectionsParentComponent {

  constructor(public override getWeather: WeatherDataService) {
    super(getWeather);
    super.ngOnInit();
  }
}
