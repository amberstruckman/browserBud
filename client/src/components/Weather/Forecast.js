import React, {Component} from 'react';
import Weather from './Weather';
import Api from '../../utils/WeatherApi';
import MockForecast from './MockForecast';

const defaultForecast = { "list": [] };
class Forecast extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			location: { "city": "Seattle" },
			forecast: defaultForecast
		};
	}

	componentDidMount() {
		this.getWeather(this.state.location)
	}

	getWeather(location){
		Api.getForecast(location)
			.then(data => {
				this.setState({
					forecast: data
				});
			});
	}

	render() {
		const data = this.state.forecast;
		const weathers = data.list
			.filter((forecast, index) => index % 8 === 0 && index / 8 < 3)
			.map(weather => {
				return (<Weather location={data.city.name} {...weather} />)
		});
		return (
			<div className="weather-forecast">
				{weathers}
			</div>
		);
	}
}

export default Forecast;

// {/* <FlatList data={this.state.forecast.list} style={{marginTop:20}} keyExtractor={item => item.dt_txt} renderItem={({item}) =>  */}