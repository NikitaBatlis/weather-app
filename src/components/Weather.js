import React from 'react'

function Weather(props) {

    return (
        <div className="weather__info"> 
        {
            props.icon && <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="weather_icon"/>
        }
        {	//Conditions to check whether the props passed from App.js return true. If true display <p> element with API props data.
            props.city && props.country && <p className="weather__key"> Location: 
                <span className="weather__value"> { props.city }, { props.country }</span>
            </p> 
        }
        { 	
            props.temperature && <p className="weather__key"> Temperature: 
                <span className="weather__value"> { props.temperature.toFixed(0) }°C</span>
            </p> 
        }
        { 	
            props.description && <p className="weather__key"> Conditions: 
                <span className="weather__value"> { props.description} </span> 
            </p> 
        }
        { 	
            props.humidity && <p className="weather__key"> Humidity: 
                <span className="weather__value"> { props.humidity }% </span>
            </p> 
        }
        { 
            props.error && <p className="weather__error">{ props.error }</p>  
        }
       </div>
    )
}

export default Weather;