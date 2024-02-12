import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherPipePipe } from "../weather-pipe.pipe";
import { PrintingWeatherService } from '../printing-weather.service';
import { HourlyComponent } from "../hourly/hourly.component";

@Component({
  selector: 'app-prediction',
  standalone: true,
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css',
  inputs: ['weatherData', 'weatherCodes'],
  imports: [CommonModule, WeatherPipePipe, HourlyComponent]
})

export class PredictionComponent extends PrintingWeatherService implements AfterViewInit {
  deltaDragging: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    super();
  }

  handleDrag(keyDownEvent: any, isDown: boolean): void {
    if (isDown)
      this.deltaDragging = keyDownEvent.clientX
    else
      //@ts-ignore
      document.getElementById('scrollHours').scrollLeft -= keyDownEvent.clientX - this.deltaDragging
  }


  setFlowTimeout() {
    const flow = this.el.nativeElement.querySelector('#flow');
    if (flow !== null) {
      this.renderer.addClass(flow.children[1], 'none');
      this.renderer.addClass(flow, 'hide');
      setTimeout(() => {
        this.renderer.addClass(flow, 'none');
        setTimeout(() => {
          flow.remove()
        }, 500);
      }, 450);
    } else {
      setTimeout(() => {
        this.setFlowTimeout();
      }, 250);
    }
  }

  ngAfterViewInit() {
    this.setFlowTimeout()
  }
}
