import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../../Services/weather-data.service';
import { WindDirectionsParentComponent } from '../wind-directions-parent/wind-directions-parent.component';

@Component({
  selector: 'app-wind-directions-now',
  templateUrl: './wind-directions-now.component.html'
})
export class WindDirectionsNowComponent extends WindDirectionsParentComponent implements OnInit {

  public dayData: any;

  constructor(public override getWeather: WeatherDataService) {
    super(getWeather);
    super.ngOnInit();
  }

  override async ngOnInit() {
    await this.getWeather.initialize();
    this.getLocationDetail();
  }

    getLocationDetail() {
    this.getWeather.getLocationName().subscribe((data: any) => {
      this.dayData = data.wind.deg;
    });
  }


}

