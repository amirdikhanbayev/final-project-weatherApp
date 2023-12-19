import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import cityCoordinates from './cities';

const apiKey = 'b9861106c0aeb152a3567b9ce20ec84d';
const converter = (far) => {
    return (far - 273).toFixed(2);
};

const Weather = () => {
    const [city, setCity] = useState('');
    const [citiesWeather, setCitiesWeather] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const weatherBoxes = document.querySelectorAll('.weather-box');
        weatherBoxes.forEach((box) => {
            box.classList.remove('active');
            void box.offsetWidth;
            box.classList.add('active');
        });
    }, [citiesWeather]);

    const getWeatherData = async (lat, lon, cityName) => {
        try {
            const response = await axios.get(
                `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}`
            );
            setCitiesWeather((prevCitiesWeather) => ({
                ...prevCitiesWeather,
                [cityName]: response.data.list,
            }));
            setError(null);
        } catch (error) {
            setError('Ошибка при получении прогноза');
        }
    };

    const handleGetWeatherClick = async () => {
        try {
            const formattedCity = city.trim().replace(/^\w/, (c) => c.toUpperCase());

            if (/^[a-zA-Z]+$/.test(formattedCity)) {
                if (cityCoordinates[formattedCity]) {
                    const { lat, lon } = cityCoordinates[formattedCity];
                    await getWeatherData(lat, lon, formattedCity);
                    setError(null);
                } else {
                    setError('Координаты для указанного города не найдены');
                }
            } else {
                setError('Введите название города на английском языке');
            }
        } catch (error) {
            setError('Ошибка при определении координат города');
        }
    };

    const handleGetCitiesListClick = () => {
        const citiesList = Object.keys(cityCoordinates).join(', ');
        alert(`Города: ${citiesList}`);
    };

    const handleRemoveCity = (cityName) => {
        const updatedCitiesWeather = { ...citiesWeather };
        updatedCitiesWeather[cityName] = updatedCitiesWeather[cityName].map((forecast) => ({
            ...forecast,
            remove: true,
        }));
        setCitiesWeather(updatedCitiesWeather);

        setTimeout(() => {
            const { [cityName]: removedCity, ...restCities } = updatedCitiesWeather;
            setCitiesWeather(restCities);
        }, 500);
    };

    return (
        <div className="container">
            <h2>Погода в данный момент</h2>
            <input
                type="text"
                placeholder="Введите город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="weather-input"
            />
            <button className="weather-button" onClick={handleGetWeatherClick}>Получить данные</button>
            <button className="weather-button" onClick={handleGetCitiesListClick}>Получить список городов</button>

            <div className="weather-grid-container">
                {Object.entries(citiesWeather).map(([cityName, hourlyForecast]) => (
                    <div
                        key={cityName}
                        className={`weather-box ${hourlyForecast[0]?.remove ? 'active' : ''}`}
                    >
                        <h3>{cityName}</h3>
                        <button onClick={() => handleRemoveCity(cityName)}>Удалить</button>

                        {hourlyForecast.length > 0 && (
                            <div className={`weather-box active`}>
                                <h3>Ощущается как: {converter(hourlyForecast[0].main.feels_like)}°C</h3>
                                <ul>
                                    <li>Температура: {converter(hourlyForecast[0].main.temp)}°C</li>
                                    <li>Влажность: {hourlyForecast[0].main.humidity}%</li>
                                    <h3>Ветер:</h3>
                                    <ul>
                                        <li>Скорость: {hourlyForecast[0].wind.speed} м/с</li>
                                        <li>Направление: {hourlyForecast[0].wind.deg}°</li>
                                    </ul>
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {error && (
                <p className="error-message" style={{ marginTop: '10px' }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Weather;