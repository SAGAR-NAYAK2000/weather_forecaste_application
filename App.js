import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: 0,
      lat: 0,
      long: 0,
      wind: 0,
      humidity: 0,
      feelsLike: 0,
      city: "Bangalore",
      weatherType: ""
    };
  }

  componentDidMount() {
    this.getData("Delhi");
  }

  getData = (value) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        value +
        "&appid=bf15b4581bbc7f0236fc8735ff83965e"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          temperature: json.list[0].main.temp,
          humidity: json.list[0].main.humidity,
          feelsLike: json.list[0].main.feels_like,
          lat: json.city.coord.lat,
          long: json.city.coord.lon,
          wind: json.list[0].wind.speed,
          city: value,
          weatherType: json.list[0].weather[0].main
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <div>
        <h1 className="header">WEATHER APP</h1>
        <div
          className="city"
          onClick={() => {
            this.getData("Bangalore");
          }}
        >
          Bangalore
        </div>
        <div
          className="city"
          onClick={() => {
            this.getData("Delhi");
          }}
        >
          Delhi
        </div>
        <div
          className="city"
          onClick={() => {
            this.getData("Mumbai");
          }}
        >
          Mumbai
        </div>
        <div className="container">
          {/*Weather Component */}
          <div className="weather">
            <div className="container-inner">
              {/*Left Side Content */}
              <div className="content-inner left-side">
                <span className="primary">{this.state.city}</span>
                <br />
                <span className="secondary">As of {new Date().toString()}</span>
                <br />
                <br />

                <span className="temp">{this.state.temperature}</span>
                <br />
                <br />

                <span className="primary">{this.state.weatherType}</span>
                <br />
                <span className="secondary">42% chance of rain until</span>
                <br />
              </div>
              {/*Right Side Content */}
              <div className="content-inner right-side">
                <span className="primary">{this.state.humidity}</span>
                <br />
                <span className="secondary">Humidity</span>
                <br />
                <br />

                <span className="primary">{this.state.feelsLike}</span>
                <br />
                <span className="secondary">Feels like</span>
                <br />
                <br />

                <span className="primary">{this.state.wind}</span>
                <br />
                <span className="secondary">Wind</span>
                <br />
                <br />
              </div>
            </div>
          </div>
          {/*Detail Component */}
          <div className="details">
            <div className="container-inner">
              {/*LEFT SIDE CONTENT */}
              <div className="content-inner">
                <br />
                <br />
                <span className="primary">
                  {this.state.lat} , {this.state.long}
                </span>
                <br />
                <span className="secondary">Location</span>

                <br />
                <br />
                <br />
                <br />

                <span className="primary-timezone">
                  {new Date().toString()}
                </span>
                <br />
                <span className="secondary">Time Zone</span>
                <br />
                <br />
                <br />
              </div>
              {/*RIGHT SIDE CONTENT */}
              <div className="content-inner">
                <span className="primary">0 N</span>
                <br />
                <span className="secondary">Local Time</span>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <span className="primary">0 N</span>
                <br />
                <span className="secondary">Co-ordinates</span>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
