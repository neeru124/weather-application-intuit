import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ForecastWeather } from './interfaces/rapidAPIforecast.model';
import { PresentWeather } from './interfaces/rapidAPIWeather.model';
import { Weather } from './interfaces/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = "What's The Weather";
  weatherForm!: FormGroup;
  weatherData!: Weather;
  presentWeatherData!: PresentWeather;
  futureWeatherData!:ForecastWeather;

  currentPlace = '';
  isLocationAvailable = false;
  currLat = 0;
  currLng = 0;
  errMsg = 'Please enter a city or zipcode';
  showErrMsg = false;
  showCurrWeather = false;
  showForecastWeather = false;
  currTempMode = 'celcius'; // farenheit
  currWindMode = 'KM'; // MILES
  
  constructor(private fb: FormBuilder, private weatherDetail: WeatherService) {
    this.weatherForm = this.fb.group({
      city: '',
      zipcode: '',
    });
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      this.isLocationAvailable = true;
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        this.weatherDetail
          .getCurrentLocationName(this.currLat, this.currLng)
          .subscribe((res) => {
            console.log('ressssssssssssssss', res);
            this.currentPlace = res[2].name;
          });
      });
    } else {
      this.isLocationAvailable = false;
      alert('Geolocation is not supported by this browser.');
    }
  }

  onSubmit(form: FormGroup, days?: string) {
    console.log('onSubmit called')
    this.isLocationAvailable = true;
    if (!form.value.city && !form.value.zipcode) {
      this.showErrMsg = true;
    } else {
      this.showErrMsg = false;
    }
    let noOfDays = 0;
    if (days) {
      noOfDays = 10;
    }
    
    if (form.value.city) {
      this.showWeather(noOfDays, form.value.city, undefined);
    } else {
      this.showWeather(noOfDays, undefined, form.value.zipcode);
    }
  }

  showWeather(noOfDays: number, city: any, zipcode: any) {
    // this.weatherDetail
    //   .getWeatherData(noOfDays, city, zipcode)
    //   .subscribe((response: Weather) => {
    //     this.weatherData = response;
    //     console.log(this.weatherData);
    //     if (noOfDays > 0) {
    //       this.showCurrWeather = true;
    //       this.showForecastWeather = true;
    //     } else {
    //       this.showCurrWeather = true;
    //       this.showForecastWeather = false;
    //     }
    //   });
    if(noOfDays>0){
      this.weatherDetail
      .getRapidForecasttWeather(city, zipcode)
      .subscribe((response: ForecastWeather) => {
        this.futureWeatherData = response;
        console.log(this.weatherData);
        if (noOfDays > 0) {
          this.showCurrWeather = false;
          this.showForecastWeather = true;
        } 
      });
    }else {
      this.weatherDetail
      .getRapidCurrentWeather(city, zipcode)
      .subscribe((response: PresentWeather ) => {
        this.presentWeatherData = response;
        console.log(this.weatherData);
        if (noOfDays > 0) {
          this.showCurrWeather = true;
          this.showForecastWeather = true;
        } else {
          this.showCurrWeather = true;
          this.showForecastWeather = false;
        }
      });
    }
    
  }
  updateCurrPlaceWeather() {
    this.weatherDetail
      .getCurrWeatherData(0, this.currentPlace)
      .subscribe((res: Weather) => {
        this.weatherData = res;
        console.log(this.currentPlace, res);
        this.showWeather(0, this.currentPlace, undefined);
      });
  }
}
