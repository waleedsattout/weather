import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherPipePipe } from "../weather-pipe.pipe";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  imports: [FormsModule, CommonModule, WeatherPipePipe],
})

export class SearchBarComponent {
  query: string = '';
  timeout: any;
  results: any = [];
  notRounded = '';
  geometry: any;
  @Output() objectChanged: EventEmitter<any> = new EventEmitter();

  fetchGeolocation() {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.query}&key=1ac8174fe16b4ed4bc1f7d64666d2213`).then(response => {
      return response.status == 200 ? response.json() : null;
    }).then(data => {
      if (data !== null) {
        if (data.status.code == 200) {
          this.results = data.results
          this.notRounded = 'no-round'
        } else {
          this.results = []
          this.notRounded = ''
        }
      } else {
        this.notRounded = ''
        this.results = []
      }
    })
  }

  geo(eve: any) {
    this.geometry = JSON.parse(eve.target.children[0].innerHTML)
    this.objectChanged.emit(this.geometry);
    this.results = []
    this.notRounded = ''
  }

  stringify(obj: any) {
    return JSON.stringify(obj)
  }

  keyUp(event: any) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.fetchGeolocation()
    }, 500);
  }
}
