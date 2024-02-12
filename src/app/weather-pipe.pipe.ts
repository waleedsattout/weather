import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherPipe',
  standalone: true
})
export class WeatherPipePipe implements PipeTransform {
  //----------------------------------------------------------------
  // if you want to pass an argument just type | weatherPipe:"Some string i want to pass"
  //
  // then you change to this
  // transform(data: any, dataType: string): any {
  //----------------------------------------------------------------
  /**
   * 
   * @param data the data will be formatted
   * @param isDaily to format the data with a specific format like `[time, weatherCode, temperature2mMax, temperature2mMin, precipitationHours]`
   * @returns 
   */
  transform(data: any, options = { isDaily: false, type: '', trim: 24, search: false }): any {
    var result: object | any;
    if (!options.search) {
      if (options.isDaily == true) {
        result = []
        for (let i = 0; i < data.time.length; i++) {
          const day = [];
          day.push(data.time[i]);
          day.push(data.weatherCode[i]);
          day.push(data.temperature2mMax[i]);
          day.push(data.temperature2mMin[i]);
          day.push(data.precipitationHours[i]);
          result.push(day);
        }
      } else if (options.type == 'hourly') {
        result = []
        for (let i = 0; i < data.time.length; i++) {
          if (options.trim == i) break;
          const day = [];
          day.push(data.time[i]);
          day.push(data.temperature2m[i]);
          day.push(data.relativeHumidity2m[i]);
          day.push(data.apparentTemperature[i]);
          day.push(data.precipitationProbability[i]);
          if (data.weatherCode != undefined)
            day.push(data.weatherCode[i]);
          if (data.visibility != undefined)
            day.push(data.visibility[i]);
          if (data.windSpeed10m != undefined)
            day.push(data.windSpeed10m[i]);
          if (data.isDay != undefined)
            day.push(data.isDay[i]);
          result.push(day);
        }
      } else {
        for (const keyval of Object.keys(data)) {
          result.push([keyval, data[keyval]])
        }
      }
    } else {
      result = []
      for (let r of data)
        result.push([
          r.formatted,
          r.geometry
        ])
    }
    return result;
  }
}
