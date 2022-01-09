import { Component, OnInit, DoCheck} from '@angular/core';
import { WeatherDataService } from '../../Services/weather-data.service';
import { InternationalCodes } from 'src/app/Utilities/CountryCodes';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-weather-local',
  templateUrl: './weather-local.component.html',
  styleUrls: ['./weather-local.component.scss']
})
export class WeatherLocalComponent implements OnInit, DoCheck {

  constructor(public getWeather: WeatherDataService) {}

  public internationalCodes: InternationalCodes = new InternationalCodes;

  isCLocal: boolean = false;
  public currentTime = Date.now();


  getLocationDetail() {
    this.getWeather.getLocationName().subscribe((data: any) => {
      console.log(data);
      // this.userLocationAdd( this.localWeather);
    });
  }

  ngOnInit() {
    this.getWeather.initialize();
    this.getLocationDetail();
  }

  ngDoCheck() {
    setTimeout(() => {
      this.currentTime = Date.now();
    }, 15000);
  }

  receiveIsCP(isC: boolean) {
    this.isCLocal = isC;
  }


 
}
