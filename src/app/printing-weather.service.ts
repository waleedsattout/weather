import { Injectable } from '@angular/core';
import { WeatherInterface } from './weather-interface';

@Injectable({
  providedIn: 'root'
})
export class PrintingWeatherService {
  Object = Object;
  weatherCodes: object | any;
  weatherData: WeatherInterface | undefined | any;
  weatherIcons: any = {
    "0": {
      "0": "clear-night.svg",
      "1": "clear-day.svg",
    },
    "1": {
      "0": "clear-night.svg",
      "1": "clear-day.svg",
    },
    "2": {
      "0": "partly-cloudy-night.svg",
      "1": "partly-cloudy-day.svg",
    },
    "3": {
      "0": "overcast-night.svg",
      "1": "overcast-day.svg",
    },
    "45": {
      "0": "fog-night.svg",
      "1": "fog-day.svg",
    },
    "48": {
      "0": "fog-night.svg",
      "1": "fog-day.svg",
    },
    "51": "drizzle.svg",
    "53": "drizzle.svg",
    "55": "drizzle.svg",
    "56": "drizzle.svg",
    "57": "drizzle.svg",
    "61": "rain.svg",
    "63": "rain.svg",
    "65": "rain.svg",
    "66": "rain.svg",
    "67": "rain.svg",
    "71": "snow.svg",
    "73": "snow.svg",
    "75": "snow.svg",
    "77": "snow.svg",
    "80": "rain.svg",
    "81": "rain.svg",
    "82": "rain.svg",
    "85": "snow.svg",
    "86": "snow.svg",
    "95": "thunderstorms-day-rain.svg",
    "96": "thunderstorms-day-rain.svg",
    "99": "thunderstorms-day-rain.svg",

    "w0": "wind-beaufort-0.svg",
    "w1": "wind-beaufort-1.svg",
    "w2": "wind-beaufort-2.svg",
    "w3": "wind-beaufort-3.svg",
    "w4": "wind-beaufort-4.svg",
    "w5": "wind-beaufort-5.svg",
    "w6": "wind-beaufort-6.svg",
    "w7": "wind-beaufort-7.svg",
    "w8": "wind-beaufort-8.svg",
    "w9": "wind-beaufort-9.svg",
    "w10": "wind-beaufort-10.svg",
    "w11": "wind-beaufort-11.svg",
    "w12": "wind-beaufort-12.svg",
  };

  getIcon(code: string | number, isDay: number = 0, custom: string = "") {
    let url = './assets/icons/';
    if (typeof (this.weatherIcons[code]) == 'object')
      url += this.weatherIcons[code][isDay];
    else if (this.weatherIcons[code] != undefined)
      url += this.weatherIcons[code];
    else if (custom != "")
      url += custom;
    return url;
  }

  fixDate(date: string): Date {
    return new Date(date)
  }

  round(value: number): number {
    return Math.round(value)
  }

  kmhToBeaufort(kmh: number): number {
    let beaufortScale;
    switch (true) {
      case (kmh < 1):
        beaufortScale = 0;
        break;
      case (kmh >= 1 && kmh <= 5):
        beaufortScale = 1;
        break;
      case (kmh >= 6 && kmh <= 11):
        beaufortScale = 2;
        break;
      case (kmh >= 12 && kmh <= 19):
        beaufortScale = 3;
        break;
      case (kmh >= 20 && kmh <= 28):
        beaufortScale = 4;
        break;
      case (kmh >= 29 && kmh <= 38):
        beaufortScale = 5;
        break;
      case (kmh >= 39 && kmh <= 49):
        beaufortScale = 6;
        break;
      case (kmh >= 50 && kmh <= 61):
        beaufortScale = 7;
        break;
      case (kmh >= 62 && kmh <= 74):
        beaufortScale = 8;
        break;
      case (kmh >= 75 && kmh <= 88):
        beaufortScale = 9;
        break;
      case (kmh >= 89 && kmh <= 102):
        beaufortScale = 10;
        break;
      case (kmh >= 103 && kmh <= 117):
        beaufortScale = 11;
        break;
      default:
        beaufortScale = 12;
    }
    return beaufortScale;
  }

  constructor() { }
}
