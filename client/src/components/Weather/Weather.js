import React, {Component} from "react";
import "./weather.css";
import moment from "moment";

class Weather extends Component {

	render() {
		const forecastMoment = moment(this.props.dt_txt);
		const isToday = forecastMoment.isBefore(moment().endOf("day"));
		var forecastDay = isToday ? "Today" : forecastMoment.format("dddd");

		return (
			 <div className="weather-card"> 
					{/* <p className="notes">{isToday ? Math.round( this.props.main.temp) + '\u00B0' : '\u00A0' }</p>				 */}
				<div className="view">
					<img  src={"https://openweathermap.org/img/w/" + this.props.aggWeather.icon + ".png"} alt={this.props.aggWeather.description} />
					<p className="time">{forecastDay}</p>
				</div>

				<hr style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
				
				<div className="view">
					<p className="notes">{Math.round(this.props.main.temp_max)}&deg;&nbsp;/&nbsp;{Math.round(this.props.main.temp_min)}&deg;</p>
					<p className="notes">{this.props.aggWeather.description}</p>
				</div>
			</div>
		);
	}
}



export default Weather;