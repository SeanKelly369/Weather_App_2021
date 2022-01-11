export interface WeatherLocalDetails {
  temperatureNow: number;
  temperaturePlus1: number;
  temperaturePlus3: number;
  temperaturePlus9: number;
  temperaturePlus15: number;
  temperaturePlus1Day: number;
  temperaturePlus2Day: number;
  temperaturePlus3Day: number;
  temperaturePlus4Day: number;
  temperaturePlus5Day: number;

  location: string;
  country: string;

  humidityNow: number;
  humidity1Hr: number;
  humidity3Hrs: number;
  humidity9Hrs: number;
  humidity15Hrs: number;
  humidity1Day: number;
  humidity2Days: number;
  humidity3Days: number;
  humidity4Days: number;
  humidity5Days: number;
  
  airPressureNow: number;
  airPressure1Hr: number;
  airPressure3Hrs: number;
  airPressure9Hrs: number;
  airPressure15Hrs: number;
  airPressure1Day: number;
  airPressure2Days: number;
  airPressure3Days: number;
  airPressure4Days: number;
  airPressure5Days: number;

  windDirectionNow: number;
  windDirection1Hr: number;
  windDirection3Hrs: number;
  windDirection9Hrs: number;
  windDirection15Hrs: number;
  windDirection1Day: number;
  windDirection2Days: number;
  windDirection3Days: number;
  windDirection4Days: number;
  windDirection5Days: number;

  sunrise: string;
  sunset: string;

  nightOrDayNow: string;
  nightOrDay1Hr: string;
  nightOrDayIn3Hrs: string;
  nightOrDayIn9Hrs: string;
  nightOrDayIn15Hrs: string;
  nightOrDayIn1Day: string;
  nightOrDayIn2Days: string;
  nightOrDayIn3Days: string;
  nightOrDayIn4Days: string;
  nightOrDayIn5Days: string;

  weatherIdNow: number;
  weatherId1Hr: number;
  weatherId3Hrs: number;
  weatherId9Hrs: number;
  weatherId15Hrs: number;
  weather1Day: number;
  weather2Days: number;
  weather3Days: number;
  weather4Days: number;
  weather5Days: number;

  windSpeedNow: number;
  windSpeed1Hr: number;
  windSpeed3Hrs: number;
  windSpeed9Hrs: number;
  windSpeed15Hrs: number;
  windSpeed1Day: number;
  windSpeed2Days: number;
  windSpeed3Days: number;
  windSpeed4Days: number;
  windSpeed5Days: number;

}