import { Component } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions15hrs',
  templateUrl: './wind-directions15hrs.component.html'
})

export class WindDirections15hrsComponent extends WindDirectionsParentComponent {

  constructor(public override getWeather: WeatherDataService) {
    super(getWeather);
    super.ngOnInit();
  }
}
