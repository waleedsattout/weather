import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherPipePipe } from "../weather-pipe.pipe";
import { PrintingWeatherService } from '../printing-weather.service';


@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
  inputs: ['weatherData', 'weatherCodes'],
  imports: [
    CommonModule,
    WeatherPipePipe,
  ]
})

export class OverviewComponent extends PrintingWeatherService {
  largeScreen: boolean = window.innerWidth > 675;
  constructor() {
    super();
  }

  fixWindDirection(direction: number): [string, string] {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const directionsIcon = ['arrow-up', 'arrow-up-right', 'arrow-right', 'arrow-down-right', 'arrow-down', 'arrow-down-left', 'arrow-left', 'arrow-up-left'];

    const index = Math.round(direction / 45) % 8;

    return [directions[index], directionsIcon[index] + '.svg'];
  }
}
