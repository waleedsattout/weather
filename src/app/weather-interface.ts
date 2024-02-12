export interface WeatherInterface {
    current: {
        time: Date,
        temperature2m: number,
        apparentTemperature: number,
        rain: number,
    },
    hourly: {
        time: Date[],
        temperature2m: Float32Array,
        relativeHumidity2m: Float32Array,
        apparentTemperature: Float32Array,
        precipitationProbability: Float32Array,
        precipitation: Float32Array,
        rain: Float32Array,
        showers: Float32Array,
        snowfall: Float32Array,
        weatherCode: Float32Array,
        visibility: Float32Array,
        windSpeed10m: Float32Array,
        windDirection10m: Float32Array,
        windGusts10m: Float32Array,
        temperature80m: Float32Array,
    },
    daily: {
        time: Date[],
        weatherCode: Float32Array,
        temperature2mMax: Float32Array,
        temperature2mMin: Float32Array,
        precipitationHours: Float32Array,
    }
}