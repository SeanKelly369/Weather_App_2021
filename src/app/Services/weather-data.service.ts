import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';


@Injectable()
export class WeatherDataService {

  private secureUrl = 'https://localhost:4200';

  private appID = '616711bbee79313325570ae3515e5b71';
  private lat: number = 0;
  private lon: number = 0;
  private url: any = '';
  public country = '';
  public tempType: string = '';
  public isC: boolean = false;

  fiveDayForecast: any;
  sunriseSunset: any;
  sunriseSunset2: any;
  sunriseSunset3: any;
  sunriseSunset4: any;
  sunriseSunset5: any;
  sunriseSunset6: any;

  private currentTime = new Date();
  private currentTimeFormatted = this.currentTime.getFullYear() + this.currentTime.getMonth() + this.currentTime.getDate();
  private currentTimeNum = (this.currentTime).getTime();
  private tomorrow = this.currentTimeNum +86400000;
  private plus2Days = this.currentTimeNum + (86400000 * 2);
  private plus3Days = this.currentTimeNum + (86400000 * 3);
  private plus4Days = this.currentTimeNum + (86400000 * 4);
  private plus5Days = this.currentTimeNum + (86400000 * 5);

  sunriseSunsetToday: any;
  sunriseSunsetTomorrow: any;
  sunriseSunsetPlusTwo: any;
  sunriseSunsetPlusThree: any;
  sunriseSunsetPlusFour: any;
  sunriseSunsetPlusFive: any;

  constructor(private http: HttpClient) { }

  public async initialize() {
    await this.getPosition().then(pos => {
      this.lat = pos.lat;
      this.lon = pos.lon;
      this.getSunriseSunsetToday();
      this.getSunriseSunsetTomorrow();
      this.getSunriseSunsetDay2();
      this.getSunriseSunsetDay3();
      this.getSunriseSunsetDay4();
      this.getSunriseSunsetDay5();
    });

    await this.getSunriseSunsetToday()
    .subscribe((response: JSON) => {
      this.sunriseSunsetToday = response;
    });

    await this.getSunriseSunsetTomorrow()
    .subscribe((response: JSON) => {
      this.sunriseSunsetTomorrow = response;
    });

    await this.getSunriseSunsetDay2()
    .subscribe((response: JSON) => {
      this.sunriseSunsetPlusTwo = response;
    });

    await this.getSunriseSunsetDay3()
    .subscribe((response: JSON) => {
      this.sunriseSunsetPlusThree = response;
    });

    await this.getSunriseSunsetDay4()
    .subscribe((response: JSON) => {
      this.sunriseSunsetPlusFour = response;
    });

    await this.getSunriseSunsetDay5()
    .subscribe((response: JSON) => {
      this.sunriseSunsetPlusFive = response;
    });

  }

  public getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lon: resp.coords.longitude,
          lat: resp.coords.latitude,
        });
      },
        err => {
          reject(err);
        });
    });
  }

  public getForeCast() {
    this.fiveDayForecast =
      this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&APPID=${this.appID}`);

    return this.fiveDayForecast;
    };


  public getLocationName() {
    this.url = this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&APPID=${this.appID}`);
    return this.url;
  }

  // Sunrise and sunset today
  public getSunriseSunsetToday() {
    try {
      this.sunriseSunsetToday =
        this.http.get<any>(`https://localhost:8082/api/getLatLon?lat=${this.lat}&lon=${this.lon}&date=${this.currentTimeFormatted}`);
      return this.sunriseSunsetToday;
      
    } catch (error) {
        return EMPTY;
    }
  }


  // Sunrise and sunset tomorrow
  public getSunriseSunsetTomorrow() {
    try {
      this.sunriseSunsetTomorrow =
        this.http.get<any>(`https://localhost:8082/api/getLatLon?lat=${this.lat}&lon=${this.lon}&date=${this.tomorrow}`);
      return this.sunriseSunsetTomorrow;
      
    } catch (error) {
        return EMPTY;      
    }
  }

  // Sunrise and sunset 2 days plus
  public getSunriseSunsetDay2() {
    try {
      this.sunriseSunsetPlusTwo =
      this.http.get<any>(`https://localhost:8082/api/getLatLon?lat=${this.lat}&lon=${this.lon}&date=${this.plus2Days}`);
      return this.sunriseSunsetPlusTwo;
      
    } catch (error) {
        return EMPTY;
    }

  }

  // Sunrise and sunset 3 days plus
  public getSunriseSunsetDay3() {
    try {
      this.sunriseSunsetPlusThree =
      this.http.get<any>(`https://localhost:8082/api/getLatLon?lat=${this.lat}&lon=${this.lon}&date=${this.plus3Days}`);
      return this.sunriseSunsetPlusThree;
      
    } catch (error) {
        return EMPTY;
    }
  }

  // Sunrise and sunset 4 days plus
  public getSunriseSunsetDay4() {
    try {
      this.sunriseSunsetPlusFour =
      this.http.get<any>(`https://localhost:8082/api/getLatLon?lat=${this.lat}&lon=${this.lon}&date=${this.plus4Days}`);
      return this.sunriseSunsetPlusFour;
      
    } catch (error) {
        return EMPTY;
    }
  }

  // Sunrise and sunset 5 days plus
  public getSunriseSunsetDay5() {
    try {
      this.sunriseSunsetPlusFive =
      this.http.get<any>(`https://localhost:8082/api/getLatLon?lat=${this.lat}&lon=${this.lon}&date=${this.plus5Days}`);
      return this.sunriseSunsetPlusFive;
      
    } catch (error) {
        return EMPTY;      
    }
  }

}
