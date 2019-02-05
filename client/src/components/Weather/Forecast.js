import React, {Component} from 'react';
import Weather from './Weather';
import Api from '../../utils/WeatherApi';

const defaultForecast = { "list": [] };
const locationInputKey = "location-input";
const defaultLocation = {"city": "Seattle"};
const positionOptions = {
	enableHighAccuracy: false, //give quick location
	timeout: 5000, //5 second timeout
	maximumAge: 300000 //refresh after 5 minutes
}
const isZipCode = /^(\s*)(\d{5})(-\d{4})?(\s*)$/;
const isLatLon = /^(\s*)(-?\d{1,3})(\.\d*)?([\s,]+)(-?\d{1,3})(\.\d*)?(\s*)$/;

class Forecast extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			location: defaultLocation,
			forecast: defaultForecast
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.submitLocation = this.submitLocation.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
		this.acquireUserLocation = this.acquireUserLocation.bind(this);
		this.getLocale = this.getLocale.bind(this);
		this.getWeather = this.getWeather.bind(this);
		this.dtDayMatch = this.dtDayMatch.bind(this);
		this.groupWeatherByDay = this.groupWeatherByDay.bind(this);
		this.selectWeatherForDay = this.selectWeatherForDay.bind(this);
		this.createAggregateWeather = this.createAggregateWeather.bind(this);
	}

	componentDidMount() {
		this.acquireUserLocation();
	}

	submitLocation(e) {
		e.preventDefault();
		const input = this.locationInput.value;
		if (isLatLon.test(input)) {
			const json = input.replace(isLatLon, "{lat: $2, lon: $6}");
			const matches = isLatLon.exec(input);
			const gpsLocation = {
				latitude: matches[2] + (matches[3] || ""),
				longitude: matches[5] + (matches[6] || "")
			};
			this.updateLocation(gpsLocation);
		}
		if (isZipCode.test(input)) {
			this.updateLocation({zip: input.replace(isZipCode, "$2")});
		} else {
			this.updateLocation({city: input.trim()});
		}
	}

	updateLocation(location) {
		this.setState({
			location: location
		}, () => this.getWeather(location));
	}

	acquireUserLocation() {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {console.log(JSON.stringify(position)); this.updateLocation(position.coords)},
				(error) => {console.log(JSON.stringify(error)); this.updateLocation(defaultLocation)},
				positionOptions
			);
		}
	}

	getLocale() {
		const location = this.state.location;
		if (location) {
			if (location.lat && location.lon) {
				return `${location.lat}, ${location.lon}`;	
			}
			if (location.latitude && location.longitude) {
				return `${location.latitude}, ${location.longitude}`;	
			}
			if (location.zip) {
				return location.zip;
			}
			if (location.city) {
				return location.city;
			}
		}

		return "Seattle";
	}

	getWeather(location){
		Api.getForecast(location)
			.then(data => {
				this.setState({
					forecast: data
				});
			});
	}

	dtDayMatch(dt1, dt2) {
		const spaceIndex = dt1.indexOf(" ");
		return dt1.substr(0, spaceIndex) == dt2.substr(0, spaceIndex);
	}

	groupWeatherByDay(days, period, index) {
		if (days.length > 0) {
			const lastIndex = days.length - 1;
			const currentDay = days[lastIndex];
			if (this.dtDayMatch(currentDay.dt_txt, period.dt_txt)) {
				//lowest minimim
				if (currentDay.main.temp_min > period.main.temp_min) {
					currentDay.main.temp_min = period.main.temp_min;
				}
				//highest high
				if (currentDay.main.temp_max < period.main.temp_max) {
					currentDay.main.temp_max = period.main.temp_max;
				}
				//push weather
				currentDay.weather.push(...period.weather);
				currentDay.aggWeather = this.selectWeatherForDay(currentDay.aggWeather || this.createAggregateWeather(currentDay.weather[0]), period.weather[0]);
			} else if (days.length < 3) {
				days.push(period);

			}
			days[lastIndex] = currentDay;
		}
		else {
			days.push(period);
		}
		// if (index % 8 === 0 && index / 8 < 3) {
		// 	days.push(period)
		// }
		return days;
	}

	createAggregateWeather(weather) {
		weather.dayOrNight = weather.icon.substr(weather.icon.length-1);
		weather.count = 1;
		weather[weather.id] = weather;
		weather.first = weather.id;
		weather.secondary = undefined;
		weather.min = weather.id;

		return weather;
	}

	selectWeatherForDay(agg, weather) {
		//try for daytime

		if (!agg.hasOwnProperty(weather.id)) {
			weather.count = 1;
			agg[weather.id] = weather;
			//https://openweathermap.org/weather-conditions
			if ((agg.min < 800 && weather.id < agg.min) || (agg.min >= 800 && agg.min < weather.id)) {
				agg.min = weather.id
				agg.icon = weather.icon;
				agg.main = weather.main;
				agg.description = weather.description;
			}
			if (!agg.secondary) {
				agg.secondary = weather.id;
			}
		} else {
			agg[weather.id].count++;
			if (agg.first != weather.id) {
				if (agg.secondary === weather.id) {
					if (agg[agg.secondary].count > agg[agg.first].count) {
						agg.secondary = agg.first;
						agg.first = weather.id;
					}
				} else if(agg[weather.id].count > agg[agg.secondary].count) { 
					agg.secondary = weather.id;
				}
			}
		}

		if (agg.dayOrNight != "d" && agg.dayOrNight != weather.icon.substr(weather.icon.length-1)) {
			agg.dayOrNight = "d";
			agg.icon = agg.icon.substr(0, agg.icon.length -1 ) + agg.dayOrNight;
		}


		return agg;
	}

	render() {
		const data = this.state.forecast;
		const forecast = data.list.reduce(this.groupWeatherByDay, [])
//			.filter((forecast, index) => index % 8 === 0 && index / 8 < 3)
			.map((weather, index) => {
				return (<Weather key={`weather${index}`} {...weather} />)
		});
		const forecastLocation = data && data.city ? data.city.name : this.getLocale();
		const currentTemp = data && data.list && data.list.length ? Math.round( data.list[0].main.temp) + "\u00B0" : "";

		return (
			<div className="weather-widget">
				<form onSubmit={this.submitLocation}>
					<input type="text" 
						title="Enter a city, zip code, or latitude/longitude to get its weather forecast." 
						key={locationInputKey} 
						name={locationInputKey} 
						placeholder="City, Zip Code, or GPS" 
						ref={(a) => this.locationInput = a}
						/>
					<button type="submit" key="submit" title="Update your weather report!">Update</button>
				</form>
				<div className="weather-forecast">
					<h3>{forecastLocation}&nbsp;{currentTemp}</h3>
				{forecast}
				</div>
			</div>
		);
	}
}

export default Forecast;