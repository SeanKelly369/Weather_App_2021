import { Component } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions2days',
  templateUrl: './wind-directions2days.component.html'
})
export class WindDirections2daysComponent extends WindDirectionsParentComponent {


  constructor(public override getWeather: WeatherDataService) {
    super(getWeather);
  }


}
