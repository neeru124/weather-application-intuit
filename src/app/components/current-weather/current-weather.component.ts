import { Component, Input, OnInit } from '@angular/core';
import { ImageCodeMap } from 'src/app/image-map';
import { CurrentWeather, WEEKDAY } from 'src/app/interfaces/currWeather.model';
import { PresentWeather } from 'src/app/interfaces/rapidAPIWeather.model';
import { Weather } from 'src/app/interfaces/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  // @Input() weatherInfo!:Weather; 
  @Input() presentWeatherInfo!:PresentWeather; 

  @Input() tempUnit:string='';
  @Input() windUnit:string='';

  currWeather:CurrentWeather={};
  constructor() { }

  ngOnInit(): void {
    
    console.log('Inside Curr Weather Component',this.currWeather);
    // let imageCode;
    // // commented code for weatherapi.com images
    // for (let key in ImageCodeMap) {
    //   if (key === this.weatherInfo.current.condition.code + '') {
    //     imageCode = ImageCodeMap[key];
    //   }
    // }

    // console.log(' weatherInfo =========>  ',this.weatherInfo);
    // this.currWeather.imagePath = '../../../assets/day/' + imageCode + '.png';
    // console.log(this.currWeather.imagePath);
    // const date = new Date(this.weatherInfo.location.localtime);
    // this.currWeather.day = WEEKDAY[date.getDay()];
    // this.currWeather.date = this.weatherInfo.location.localtime;
    // this.currWeather.humidity = this.weatherInfo.current.humidity ;
    // this.currWeather.pressure = this.weatherInfo.current.pressure_mb ;
    // this.currWeather.tempCelcius = this.weatherInfo.current.temp_c ;
    // this.currWeather.tempFarenheit = this.weatherInfo.current.temp_f ;
    // this.currWeather.weatherDescription = this.weatherInfo.current.condition.text;
    // this.currWeather.icon = this.weatherInfo.current.condition.icon;
    // this.currWeather.wind_kph = this.weatherInfo.current.wind_kph ;
    // this.currWeather.wind_mph = this.weatherInfo.current.wind_mph ;
    // this.currWeather.feelsLike_c = this.weatherInfo.current.feelslike_c;
    // this.currWeather.feelsLike_f = this.weatherInfo.current.feelslike_f;

    // RAPID API WEATHER CODE
    let iconCode = this.presentWeatherInfo.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    this.currWeather.imagePath = iconurl;
    const date = new Date(this.presentWeatherInfo.dt*1000+(this.presentWeatherInfo.timezone*1000));
    this.currWeather.day = WEEKDAY[date.getDay()];
    // this.currWeather.date = this.presentWeatherInfo.location.localtime;
    this.currWeather.humidity = this.presentWeatherInfo.main.humidity;
    this.currWeather.pressure = this.presentWeatherInfo.main.pressure;
    this.currWeather.tempFarenheit = this.presentWeatherInfo.main.temp;
    this.currWeather.tempCelcius = (this.currWeather.tempFarenheit - 32) * 5 / 9;

    this.currWeather.weatherDescription = this.presentWeatherInfo.weather[0].description;
    this.currWeather.icon = iconurl;
    this.currWeather.wind_mph = this.presentWeatherInfo.wind.speed;
    this.currWeather.wind_kph = Math.round(this.presentWeatherInfo.wind.speed * 1.852000888);
    this.currWeather.feelsLike_f = this.presentWeatherInfo.main.feelslike;

    this.currWeather.feelsLike_c = (this.presentWeatherInfo.main.feelslike - 32) * 5 / 9;

  }

}
