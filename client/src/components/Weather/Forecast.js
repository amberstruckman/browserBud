import React, {Component} from 'react';
import Weather from './Weather';
import WeatherApi from '../../utils/WeatherApi';
import LocaleApi from '../../utils/LocaleApi'

const defaultForecast = { "list": [] };
const locationInputKey = "location-input";
const defaultLocation = {"city": "Seattle"};
const positionOptions = {
	enableHighAccuracy: false, //give quick location
	timeout: 5000, //5 second timeout
	maximumAge: 300000 //refresh after 5 minutes
}
const isZipCode = /^(\d{5})(-\d{4})?$/;
const isLatLon = /^(-?\d{1,3})(\.\d*)?([\s,]+)(-?\d{1,3})(\.\d*)?$/;

class Forecast extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			location: defaultLocation,
			forecast: defaultForecast
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.submitLocation = this.submitLocation.bind(this);
		this.saveLocation = this.saveLocation.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
		this.acquireUserLocation = this.acquireUserLocation.bind(this);
		this.getLocale = this.getLocale.bind(this);
		this.getWeather = this.getWeather.bind(this);
		this.dtDayMatch = this.dtDayMatch.bind(this);
		this.groupWeatherByDay = this.groupWeatherByDay.bind(this);
		this.selectWeatherForDay = this.selectWeatherForDay.bind(this);
		this.createAggregateWeather = this.createAggregateWeather.bind(this);
		this.saveLocation = this.saveLocation.bind(this);
		this.acquireSavedLocation = this.acquireSavedLocation.bind(this);
		this.getWeatherTitle = this.getWeatherTitle.bind(this);
	}

	componentDidMount() {
		//this.acquireSavedLocation();
		this.acquireUserLocation();
	}

	submitLocation(e) {
		e.preventDefault();
		const input = this.locationInput.value;
		const location = {
			"query": input.trim()
		};
		if (isLatLon.test(input)) {
			const matches = isLatLon.exec(input);
			location.latitude = matches[1] + (matches[2] || "");
			location.longitude= matches[4] + (matches[5] || "");
		} else if (isZipCode.test(input)) {
			location.zip = input.replace(isZipCode, "$1");
		} else {
			location.city = location.query;
		}
		if (this.state.location.saved) {
			location.saved = true;
			location.name = this.state.location.name;
		}
		this.saveLocation(location);
	}

	saveLocation(location) {
		//LocaleApi.save(location).then(this.updateLocation);
		this.updateLocation(location);
	}

	updateLocation(location) {
		console.log("update location");
		this.setState({
			location: location
		}, () => this.getWeather(location));
	}

	acquireSavedLocation() {
		LocaleApi.get()
			.then(
				location => location, 
				(err) => {
					console.log(err);
					return null;
				})
			.then(location => {
				if (location) {
					this.updateLocation(location);
				} else {
					this.acquireUserLocation();
				}});
	}

	acquireUserLocation() {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {console.log(position); this.updateLocation(position.coords)},
				(error) => {console.log(error); this.updateLocation(defaultLocation)},
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
		WeatherApi.getForecast(location)
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

				days[lastIndex] = currentDay;
			} else if (days.length < 3) {
				if (!period.hasOwnProperty("aggWeather")) {
					period.aggWeather = this.createAggregateWeather(period.weather[0]);
				}
				days.push(period);
			}
		}
		else {
			if (!period.hasOwnProperty("aggWeather")) {
				period.aggWeather = this.createAggregateWeather(period.weather[0]);
			}
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

	getWeatherTitle(data) {
		if (!data || !data.list || data.list.length < 1) {
			this.getLocale();
			return null;
		}
		const forecastLocation = data.city ? data.city.name : this.getLocale();
		const currentTemp = Math.round(data.list[0].main.temp) + "\u00B0";
		return (<h3>{forecastLocation}&nbsp;{currentTemp}</h3>);
	}

	render() {
		const data = this.state.forecast;
		const forecast = data.list.reduce(this.groupWeatherByDay, [])
			.map((weather, index) => {
				return (<Weather key={`weather${index}`} {...weather} />)
		});

		return (
			<div className="forecastbubble">
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
					{this.getWeatherTitle(data)}
					{forecast}
				</div>
			</div>
			</div>
		);
	}
}

export default Forecast;