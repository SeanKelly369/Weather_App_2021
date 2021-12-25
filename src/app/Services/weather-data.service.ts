import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY } from 'rxjs';


@Injectable()
export class WeatherDataService {

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

      const currentTime = new Date();
      const currentTimeFormatted = currentTime.getFullYear() + '-' + (currentTime.getMonth()+ 1) + '-' + currentTime.getDate();
      const currentTimeNum = currentTime.getTime();
      const tomorrow = (new Date(currentTimeNum +86400000));
      const tomorrowFormatted = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate();
      const plus2Days = (new Date(currentTimeNum + (86400000 * 2)));
      const plus2DaysFormatted = plus2Days.getFullYear() + '-' + (plus2Days.getMonth() + 1) + '-' + plus2Days.getDate();
      const plus3Days = (new Date(currentTimeNum + (86400000 * 3)));
      const plus3DaysFormatted = plus3Days.getFullYear() + '-' + (plus3Days.getMonth() + 1 ) + '-' + plus3Days.getDate();
      const plus4Days = (new Date(currentTimeNum + (86400000 * 4)));
      const plus4DaysFormatted = plus4Days.getFullYear() + '-' + (plus4Days.getMonth() + 1 ) + '-' + plus4Days.getDate();
      const plus5Days = (new Date(currentTimeNum + (86400000 * 5)));
      const plus5DaysFormatted = plus5Days.getFullYear() + '-' + (plus5Days.getMonth() + 1 ) + '-' + plus5Days.getDate();

      this.getSunriseSunsetToday(currentTimeFormatted).subscribe( (response: JSON) => {
        this.sunriseSunsetToday = response;
      });
      this.getSunriseSunsetTomorrow(tomorrowFormatted).subscribe( (response: JSON) => {
        this.sunriseSunsetTomorrow = response;
      });
      this.getSunriseSunsetDay2(plus2DaysFormatted).subscribe( (response: JSON) => {
        this.sunriseSunsetPlusTwo = response;
      });
      this.getSunriseSunsetDay3(plus3DaysFormatted).subscribe( (response: JSON) => {
        this.sunriseSunsetPlusThree = response;
        console.log(this.sunriseSunsetPlusThree);
      });
      this.getSunriseSunsetDay4(plus4DaysFormatted).subscribe( (response: JSON) => {
        this.sunriseSunsetPlusFour = response;
      });
      this.getSunriseSunsetDay5(plus5DaysFormatted).subscribe( (response: JSON) => {
        this.sunriseSunsetPlusFive = response;
      });
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


  // Sunrise and sunset API headers
  public setSunriseSunsetApiHeaders() : HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization')
      .set('Access-Control-Allow-Methods', 'GET');

      return headers;
  }

  // Sunrise and sunset today
  public getSunriseSunsetToday(currentTimeFormatted: any | undefined) {
    try {
      this.sunriseSunsetToday =
        this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.lon}&date=${currentTimeFormatted}`);
      return this.sunriseSunsetToday;
      
    } catch (error) {
        return EMPTY;
    }
  }


  // Sunrise and sunset tomorrow
  public getSunriseSunsetTomorrow(tomorrow: string | undefined) {
    try {

      this.sunriseSunsetTomorrow =
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.lon}&date=${tomorrow}`, 
        {headers: this.setSunriseSunsetApiHeaders(), responseType: 'json'});
      return this.sunriseSunsetTomorrow;
      
    } catch (error) {
        return EMPTY;      
    }
  }

  // Sunrise and sunset 2 days plus
  public getSunriseSunsetDay2(plus2Days: string | undefined) {
    try {
      this.sunriseSunsetPlusTwo =
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.lon}&date=${plus2Days}`, 
        {headers: this.setSunriseSunsetApiHeaders(), responseType: 'json'});
      return this.sunriseSunsetPlusTwo;
      
    } catch (error) {
        return EMPTY;
    }

  }

  // Sunrise and sunset 3 days plus
  public getSunriseSunsetDay3(plus3Days: string | undefined) {
    try {
      this.sunriseSunsetPlusThree =
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.lon}&date=${plus3Days}`, 
        {headers: this.setSunriseSunsetApiHeaders(), responseType: 'json'});
      return this.sunriseSunsetPlusThree;
      
    } catch (error) {
        return EMPTY;
    }
  }

  // Sunrise and sunset 4 days plus
  public getSunriseSunsetDay4(plus4Days: string | undefined) {
    try {
      this.sunriseSunsetPlusFour =
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.lon}&date=${plus4Days}`, 
        {headers: this.setSunriseSunsetApiHeaders(), responseType: 'json'});      
        return this.sunriseSunsetPlusFour;
      
    } catch (error) {
        return EMPTY;
    }
  }

  // Sunrise and sunset 5 days plus
  public getSunriseSunsetDay5(plus5Days: string | undefined) {
    try {
      this.sunriseSunsetPlusFive =
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.lon}&date=${plus5Days}`, 
        {headers: this.setSunriseSunsetApiHeaders(), responseType: 'json'});      
        return this.sunriseSunsetPlusFive;
      
    } catch (error) {
        return EMPTY;      
    }
  }

}
