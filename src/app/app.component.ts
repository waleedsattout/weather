import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { WeatherPipePipe } from "./weather-pipe.pipe";
import { WeatherApiService } from './weather-api.service';
import { HttpClient } from '@angular/common/http';
import { WeatherInterface } from './weather-interface';
import { PredictionComponent } from "./prediction/prediction.component";
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SharedDataService } from './shared-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, OverviewComponent, NgbAlert, WeatherPipePipe, PredictionComponent, SearchBarComponent]
})

export class AppComponent {
  title = 'weather';
  weatherData: WeatherInterface | any;
  weatherCodes!: object;

  constructor(private weatherAPIService: WeatherApiService, private http: HttpClient, private sharedData: SharedDataService) { }

  async setLatLng(e: any) {
    this.weatherData = await this.weatherAPIService.setLatLng(e.lat, e.lng)
  }

  async ngOnInit(): Promise<void> {
    // await this.sharedData.setWeatherData(this.weatherAPIService.setLatLng(33.5102, 36.2913)).then(data => {
    //   this.weatherData = data;
    // });

    this.http.request('GET', '/assets/weatherCodes.json', { responseType: 'json' })
      .subscribe(data =>
        this.weatherCodes = data
      );
    this.http.request('GET', '/assets/weather.json', { responseType: 'json' })
      .subscribe(data =>
        this.weatherData = data
      );
  }
}
