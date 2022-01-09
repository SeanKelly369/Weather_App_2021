import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { WeatherLocalDetails } from '../Interfaces/WeatherLocationDetails';
import { InternationalCodes } from '../Utilities/CountryCodes';


@Injectable()
export class WeatherDataService {

  public internationalCodes: InternationalCodes = new InternationalCodes();

  private appID: string = '616711bbee79313325570ae3515e5b71';
  private url: any = '';
  public tempType: string = '';
  public isC: boolean = false;
  public isKm: boolean = true;

  // coordinates for queries, begin with Greenwich by default
  public latitude: number = 51.4934;
  public longitude: number = 0.0098;

  public weatherLocalDetails: WeatherLocalDetails = {
    temperatureNow: 0,
    temperaturePlus3: 0,
    temperaturePlus9: 0,
    temperaturePlus15: 0,
    temperaturePlus1Day: 0,
    temperaturePlus2Day: 0,
    temperaturePlus3Day: 0,
    temperaturePlus4Day: 0,
    temperaturePlus5Day: 0,
    location: 'Greenwich',
    country: 'United Kingdom',
    humidity: '',
    airPressure: 0,
    windDirection: 0,
    sunriseToday: '',
    sunsetToday: '',
    sunriseTomorrow: '',
    sunsetTomorrow: '',
    sunrisePlus2Days: '',
    sunsetPlus2Days: '',
    sunrisePlus3Days: '',
    sunsetPlus3Days: '',
    sunrisePlus4Days: '',
    sunsetPlus4Days: '',
    sunrisePlus5Days: '',
    sunsetPlus5Days: '',
    nightOrDay: 'd',
    
  }

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

  public isCLocal: boolean = false;
  public temp: number = 273.48;
  public currentTime = Date.now();

  constructor(private http: HttpClient) { }

  public initialize() {
    // user the default Greenwich geocoordinates to begin with if no coordinates exist in local storage
    let prestoredGeoCoordinates = localStorage.getItem('coordinates');
    if(prestoredGeoCoordinates !== null) {
      this.latitude = parseInt(prestoredGeoCoordinates.split(',')[0]);
      this.longitude = parseInt(prestoredGeoCoordinates.split(',')[1]);
    }

    this.getForeCast().subscribe( (response: any) => {
      console.log(response);
      this.weatherLocalDetails.temperatureNow = response.list[0].main.temp - 273.48;
    });

    this.getLocationName().subscribe( (response: JSON) => {
      console.log(response);
    })

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
      console.log(response)
      this.sunriseSunsetToday = response;
    });
    this.getSunriseSunsetTomorrow(tomorrowFormatted).subscribe( (response: JSON) => {
      this.sunriseSunsetTomorrow = response;
    });
    this.getSunriseSunsetDay2(plus2DaysFormatted).subscribe( (response: JSON) => {
      this.sunriseSunsetPlusTwo = response;
    });
    this.getSunriseSunsetDay3(plus3DaysFormatted).subscribe( (response: JSON) => {
      console.log(response);
      this.sunriseSunsetPlusThree = response;
      console.log(this.sunriseSunsetPlusThree);
    });
    this.getSunriseSunsetDay4(plus4DaysFormatted).subscribe( (response: JSON) => {
      this.sunriseSunsetPlusFour = response;
    });
    this.getSunriseSunsetDay5(plus5DaysFormatted).subscribe( (response: JSON) => {
      this.sunriseSunsetPlusFive = response;
    });
      
  }

  public getForeCastNew(lat: number, lon: number): object {
    this.fiveDayForecast =
      this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${this.appID}`).subscribe( (response: any) => {
        console.log(response);
        
        // 3, 5, 7, 15, 23, 31
        this.weatherLocalDetails.temperatureNow = response.list[0].main.temp - 273.48;
        this.weatherLocalDetails.temperaturePlus3 = response.list[3].main.temp - 273.48;
        this.weatherLocalDetails.temperaturePlus15 = response.list[5].main.temp - 273.48;
        this.weatherLocalDetails.temperaturePlus1Day = response.list[7].main.temp - 273.48;
        this.weatherLocalDetails.temperaturePlus2Day = response.list[15].main.temp - 273.48;
        this.weatherLocalDetails.temperaturePlus3Day = response.list[23].main.temp - 273.48;
        this.weatherLocalDetails.temperaturePlus4Day = response.list[31].main.temp - 273.48;

        this.weatherLocalDetails.location = response.city.name;
        let countryCode = response.city.country;
        this.weatherLocalDetails.country = this.internationalCodes.userLocationAdd(countryCode);
        this.weatherLocalDetails.humidity = response
      })

    return this.fiveDayForecast;
  }

  public getLocationNameNew(lat: number, lon: number) {
    this.url = this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${this.appID}`)
    .subscribe( (response: any) => {
      console.log(response);

    })
    return this.url;
  }

  public getForeCast(): any {
    this.fiveDayForecast =
      this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&APPID=${this.appID}`)

    return this.fiveDayForecast;
  }

  
  public getLocationName() {
    this.url = this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&APPID=${this.appID}`)

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
        this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.latitude}&lng=${this.longitude}&date=${currentTimeFormatted}`, 
        { headers: this. setSunriseSunsetApiHeaders(), responseType: 'json' } );
      return this.sunriseSunsetToday;
      
    } catch (error) {
        return EMPTY;
    }
  }


  // Sunrise and sunset tomorrow
  public getSunriseSunsetTomorrow(tomorrow: string | undefined) {
    try {

      this.sunriseSunsetTomorrow =
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.latitude}&lng=${this.longitude}&date=${tomorrow}`, 
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
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.latitude}&lng=${this.longitude}&date=${plus2Days}`, 
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
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.latitude}&lng=${this.longitude}&date=${plus3Days}`, 
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
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.latitude}&lng=${this.longitude}&date=${plus4Days}`, 
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
      this.http.get<any>(`https://api.sunrise-sunset.org/json?lat=${this.latitude}&lng=${this.longitude}&date=${plus5Days}`, 
        {headers: this.setSunriseSunsetApiHeaders(), responseType: 'json'});      
        return this.sunriseSunsetPlusFive;
      
    } catch (error) {
        return EMPTY;      
    }
  }

}
