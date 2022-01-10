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
    temperaturePlus1: 0,
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

    humidityNow: 0,
    humidity1Hr: 0,
    humidity3Hrs: 0,
    humidity9Hrs: 0,
    humidity15Hrs: 0,
    humidity1Day: 0,
    humidity2Days: 0,
    humidity3Days: 0,
    humidity4Days: 0,
    humidity5Days: 0,

    airPressureNow: 0,
    airPressure1Hr: 0,
    airPressure3Hrs: 0,
    airPressure9Hrs: 0,
    airPressure15Hrs: 0,
    airPressure1Day: 0,
    airPressure2Days: 0,
    airPressure3Days: 0,
    airPressure4Days: 0,
    airPressure5Days: 0,

    windDirectionNow: 0,
    windDirection1Hr: 0,
    windDirection3Hrs: 0,
    windDirection9Hrs: 0,
    windDirection15Hrs: 0,
    windDirection1Day: 0,
    windDirection2Days: 0,
    windDirection3Days: 0,
    windDirection4Days: 0,
    windDirection5Days: 0,


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

    nightOrDayNow: 'd',
    nightOrDay1Hr: 'd',
    nightOrDayIn3Hrs: 'd',
    nightOrDayIn9Hrs: 'd',
    nightOrDayIn15Hrs: 'd',
    nightOrDayIn1Day: 'd',
    nightOrDayIn2Days: 'd',
    nightOrDayIn3Days: 'd',
    nightOrDayIn4Days: 'd',
    nightOrDayIn5Days: 'd',

    weatherIdNow: 200,
    weatherId1Hr: 200,
    weatherId3Hrs: 200,
    weatherId9Hrs: 200,
    weatherId15Hrs: 200,
    weather1Day: 200,
    weather2Days: 200,
    weather3Days: 200,
    weather4Days: 200,
    weather5Days: 200,

    windSpeedNow: 0,
    windSpeed1Hr: 0,
    windSpeed3Hrs: 0,
    windSpeed9Hrs: 0,
    windSpeed15Hrs: 0,
    windSpeed1Day: 0,
    windSpeed2Days: 0,
    windSpeed3Days: 0,
    windSpeed4Days: 0,
    windSpeed5Days: 0,
    
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

        
        // 0, 1, 3, 5, 8, 16, 24, 32

        // Weather icons' ids
        this.weatherLocalDetails.weatherId1Hr = response.list[0].weather.id;
        this.weatherLocalDetails.weatherId3Hrs = response.list[1].weather.id;
        this.weatherLocalDetails.weatherId9Hrs = response.list[3].weather.id;
        this.weatherLocalDetails.weatherId15Hrs = response.list[5].weather.id;
        this.weatherLocalDetails.weather1Day = response.list[8].weather.id;
        this.weatherLocalDetails.weather2Days = response.list[16].weather.id;
        this.weatherLocalDetails.weather3Days = response.list[24].weather.id;
        this.weatherLocalDetails.weather4Days = response.list[32].weather.id;
        if(response.list[40].weather.id != null) {
          this.weatherLocalDetails.weather5Days = response.list[40].weather.id;
        } else {
          this.weatherLocalDetails.weather4Days = response.list[32].weather.id;
        }

        // Temperatures
        this.weatherLocalDetails.temperaturePlus1 = response.list[0].main.temp - 273.48; // 1 hr
        this.weatherLocalDetails.temperaturePlus3 = response.list[1].main.temp - 273.48; // 3 hrs
        this.weatherLocalDetails.temperaturePlus9 = response.list[3].main.temp - 273.48; // 9 hrs
        this.weatherLocalDetails.temperaturePlus15 = response.list[5].main.temp - 273.48; // 15 hrs
        this.weatherLocalDetails.temperaturePlus1Day = response.list[8].main.temp - 273.48; // 1 d
        this.weatherLocalDetails.temperaturePlus2Day = response.list[16].main.temp - 273.48; 
        this.weatherLocalDetails.temperaturePlus3Day = response.list[24].main.temp - 273.48;
        this.weatherLocalDetails.temperaturePlus4Day = response.list[32].main.temp - 273.48;
        if(response.list[40] != null) {
          this.weatherLocalDetails.temperaturePlus5Day = response.list[40].main.temp - 273.48;
        } else {
          this.weatherLocalDetails.temperaturePlus5Day = response.list[32].main.temp - 273.48;
        }

        // Air pressure
        this.weatherLocalDetails.humidityNow;


        this.weatherLocalDetails.location = response.city.name;
        let countryCode = response.city.country;
        this.weatherLocalDetails.country = this.internationalCodes.userLocationAdd(countryCode);
      })

    return this.fiveDayForecast;
  }

  public getLocationNameNew(lat: number, lon: number) {
    this.url = this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${this.appID}`)
    .subscribe( (response: any) => {
      console.log(response);
      this.weatherLocalDetails.weatherIdNow = response.weather.id;
      this.weatherLocalDetails.humidityNow = response.main.humidity;
      this.weatherLocalDetails.airPressureNow = response.main.pressure;
      this.weatherLocalDetails.windSpeedNow = response.wind.speed;
      this.weatherLocalDetails.windDirectionNow = response.wind.deg;

      this.weatherLocalDetails.location = response.name;
      let countryCode = response.city.country;
      this.weatherLocalDetails.country = this.internationalCodes.userLocationAdd(countryCode);

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
