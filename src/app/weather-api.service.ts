import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';

declare interface Params {
  latitude: number,
  longitude: number,
  current: Array<string>,
  hourly: Array<string>,
  daily: Array<string>,
  timezone: string,
  past_days: number,
  forecast_hours: number,
}

@Injectable({
  providedIn: 'root'
})

export class WeatherApiService {
  params: Params = {
    "latitude": 33.5102,
    "longitude": 36.2913,
    "current": ["temperature_2m", "apparent_temperature", "is_day", "weather_code", "cloud_cover", "wind_speed_10m", "wind_direction_10m"],
    "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation_probability", "weather_code", "wind_speed_10m", 'is_day'],
    "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_hours"],
    "timezone": "auto",
    "past_days": 1,
    "forecast_hours": 24
  };

  async setLatLng(lat: any, lng: any) {
    this.params.latitude = lat;
    this.params.longitude = lng;
    return await this.getWeatherData()
  }

  // Helper function to form time ranges
  private range(start: number, stop: number, step: number) {
    return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  }

  private async getWeatherData() {
    const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", this.params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    return {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        apparentTemperature: current.variables(1)!.value(),
        isDay: current.variables(2)!.value(),
        weatherCode: current.variables(3)!.value(),
        cloudCover: current.variables(4)!.value(),
        windSpeed10m: current.variables(5)!.value(),
        windDirection10m: current.variables(6)!.value(),
      },
      hourly: {
        time: this.range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        apparentTemperature: hourly.variables(2)!.valuesArray()!,
        precipitationProbability: hourly.variables(3)!.valuesArray()!,
        weatherCode: hourly.variables(4)!.valuesArray()!,
        windSpeed10m: hourly.variables(5)!.valuesArray()!,
        isDay: hourly.variables(6)!.valuesArray()!,
      },
      daily: {
        time: this.range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
        precipitationHours: daily.variables(3)!.valuesArray()!,
      },
    };
  }
}
