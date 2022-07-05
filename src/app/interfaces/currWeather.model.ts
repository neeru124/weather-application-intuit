export interface CurrentWeather {
    date?: string;
    day?: string;
    weatherDescription?: string;
    tempCelcius?: number;
    tempFarenheit?: number;
    pressure?: number;
    humidity?: number;
    wind_kph?: number;
    wind_mph?: number;
    minTempCelcius?: number;
    maxTempCelcius?: number;
    minTempFarenheit?: number;
    maxTempFarenheit?: number;
    icon?: any;
    feelsLike_c?: number;
    feelsLike_f?: number;
    imagePath?: string;
  }

 export const WEEKDAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];