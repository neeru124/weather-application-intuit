import { Component, Input, OnInit } from '@angular/core';
import { ImageCodeMap } from 'src/app/image-map';
import { CurrentWeather, WEEKDAY } from 'src/app/interfaces/currWeather.model';
import { ForecastWeather, List } from 'src/app/interfaces/rapidAPIforecast.model';
import { Weather } from 'src/app/interfaces/weather.model';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss']
})
export class ForecastWeatherComponent implements OnInit {
  // @Input() weatherForecast!:Weather;
  @Input() weatherForecast!:ForecastWeather;

  @Input() tempUnit!: string;

  forecastWeather:CurrentWeather[]=[];
  constructor() { }

  ngOnInit(): void {
    // let { forecastday } = this.weatherForecast.forecast;
    // console.log('forecastday',forecastday)
    // this.forecastWeather = forecastday.map((foreCastDetails) => {
    //   let forecastData: CurrentWeather = {};
    //   const { day, date } = foreCastDetails;
    //   const datObj = new Date(date);
    //   const { condition } = day;
    //   return {
    //     imagePath: `../../../assets/day/${ImageCodeMap[condition.code]}.png`,
    //     date,
    //     day: WEEKDAY[datObj.getDay()].slice(0, 3),
    //     weatherDescription: condition.text,
    //     minTempCelcius: day.mintemp_c,
    //     maxTempCelcius: day.maxtemp_c,
    //     minTempFarenheit: day.mintemp_f,
    //     maxTempFarenheit: day.maxtemp_f,
    //   };
    // });
    // console.log('forecastWeather',this.forecastWeather)

    let  forecastday  = this.weatherForecast.list;
    this.forecastWeather = forecastday.map((foreCastDetails:List) => {
      let forecastData: CurrentWeather = {};
      // const { day, date } = foreCastDetails;
      const datObj = new Date(foreCastDetails.dt*1000);
      // const { condition } = day;
      const weather = foreCastDetails.weather[0];
      return {
        imagePath: `http://openweathermap.org/img/w/${weather.icon}.png`,
        datObj,
        day: WEEKDAY[datObj.getDay()].slice(0, 3),
        weatherDescription: weather.description,
        minTempFarenheit: foreCastDetails.temp.min,
        maxTempFarenheit: foreCastDetails.temp.max,
        minTempCelcius: (foreCastDetails.temp.min - 32) * 5 / 9,
        maxTempCelcius: (foreCastDetails.temp.max - 32) * 5 / 9,
        
      };
    });
    
  }

}
