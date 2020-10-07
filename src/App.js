import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Titles from './components/Titles';
import Forms from './components/Forms';
import Weather from './components/Weather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends React.Component {
    //Constructed starting state:
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: undefined
    };

    //The getWeather function that will fire and make the call to the API with the city/country inputs from the form component.
    
    getWeather = async (e) => { // 'e' is the props past through from the form component when getWeather function is called.

        e.preventDefault(); //Needed to override default reload on button submit function.

        const city = e.target.city.value; //getting the input value of the city.
        const country = e.target.country.value; //getting input value of the country

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`); 
        const data = await api_call.json(); //Parsing the json api_call data.

        if (city && country ) { //if city and country both return true/have inputs.

            if (data.cod === 404) { //if api_call doesn't match any location on the database (404 error), show this error message.
                this.setState({
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    icon: undefined,
                    error: "Input doesn't match any known location!"
                });
                
            } else { //if inputs match location in database.
                this.setState({
                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].main,
                    icon: data.weather[0].icon,
                    error: ""
                });
            }

        } else { //if inputs were empty.
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                icon: undefined,
                error: "Please enter valid location."
            });
        }
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <Container className="container">
                            <Row className="row">

                                <Col className="title-container">
                                    <Titles />
                                </Col>
                                        
                                <Col className="form-container">
                                    <Forms getWeather={this.getWeather} /> 
                                    <Weather 
                                        temperature={this.state.temperature} 
                                        humidity={this.state.humidity}
                                        city={this.state.city}
                                        country={this.state.country}
                                        description={this.state.description}
                                        icon ={this.state.icon}
                                        error={this.state.error}
                                    />
                                </Col>
                                
                            </Row>
                        </Container>
                    </div>
                </div>            
            </div>
        );
    }
}

export default App;