import { Component, OnInit, ViewChild, Output, Input, EventEmitter, Renderer } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private static APPID = '76d0f4435e1b0c058889c284e7debd73';

  @ViewChild('weatherForm') weatherForm: NgForm;

  weatherOfCities = [];
  cityList = [];
  cityname: string;

  constructor(private http: Http) { }

  ngOnInit() {
    
      }

      addCityList(cityname: string) {
        console.log('city: %s', cityname);

        if (!this.cityList.includes(cityname)) {
          this.cityList.push(cityname);
        }

        this.weatherForm.reset();
      }
    
  
  
  getWeather(cityname: string) {

    const cityName = this.weatherForm.value.cityName;
    console.log('City Weather: %s', cityname);
    
    this.http.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: cityName,
        appid: WeatherComponent.APPID
      }
    }).subscribe(
       (result) => {
        this.weatherOfCities = result.json().weather;
        this.cityname = result.json().cityName;
        console.log("weather = ", this.weatherOfCities);
        console.log('citynamejs = ', this.cityname);
       
      },
      (error) => {
        console.log("error: ", error);
      }
    ) 

  }

}