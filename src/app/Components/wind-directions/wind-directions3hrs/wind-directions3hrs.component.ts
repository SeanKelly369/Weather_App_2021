import { Component } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions3hrs',
  templateUrl: './wind-directions3hrs.component.html'
})
export class WindDirections3hrsComponent extends WindDirectionsParentComponent {

  constructor(public override getWeather: WeatherDataService) {
    super(getWeather);
    super.ngOnInit();
  }

}
