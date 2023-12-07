"use client"
import { useState, useEffect } from "react";

export default function Weather() {

    const [weather, setWeather] = useState([]);

    const loadWeather = async () => {
        const weatherData = await getWeather("Calgary");
        setWeather(weatherData);
    }

    useEffect(() => {
        loadWeather();
    }, []);

    


    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-5xl font-bold text-white">Weather</h1>
            <ul>
                <li className="text-white">{weather.cityName}</li>
                <li className="text-white">{weather.temperature}</li>
                <li className="text-white">{weather.description}</li>
                <li className="text-white"><img src={weather.icon} /></li>
            </ul>
        </div>
    )
}



const getWeather = async (cityName) => {

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.trim()}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
    const data = await res.json();


    console.log(data);
    const weatherArray = {
        cityName: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    return weatherArray;
}