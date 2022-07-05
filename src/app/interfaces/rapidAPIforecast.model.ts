

    export interface Coord {
        lon: number;
        lat: number;
    }

    export interface City {
        id: number;
        name: string;
        coord: Coord;
        country: string;
    }

    export interface Temp {
        average: number;
        average_max: number;
        average_min: number;
        record_max: number;
        record_min: number;
    }

    export interface List {
        dt: number;
        humidity: number;
        pressure: number;
        temp: Temp;
        wind_speed: number;
    }

    export interface ForecastWeather {
        cod: string;
        city: City;
        message: number;
        list: List[];
    }

