import React, {Component} from "react";
import "./weather.css";
import moment from "moment";

class Weather extends Component {

	render() {
		var forecastMoment = moment(this.props.dt_txt);
		var forecastDay = forecastMoment.format("M/D");

		return (
			 <div className="weather-card"> 
				<p className="notes">{this.props.location}</p>
				
				<div className="view">
					<img  src={"https://openweathermap.org/img/w/" + this.props.weather[0].icon + ".png"} alt={this.props.weather[0].description} />
					<p className="time">{forecastDay}</p>
				</div>

				<hr style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
				
				<div className="view">
					<p className="notes">{this.props.weather[0].description}</p>
					<p className="notes">{Math.round( this.props.main.temp)}&#8451;</p>
				</div>
			</div>
		);
	}
}



export default Weather;