import { Component } from '@angular/core';
import { PrintingWeatherService } from '../printing-weather.service';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.css',
  inputs: ['hourlyData']
})

export class HourlyComponent extends PrintingWeatherService {
  hourlyData: object | any;
  constructor() {
    super();
  }

}
