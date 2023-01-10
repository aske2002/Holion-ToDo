import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import internal from 'stream';
import { NumericLiteral } from 'typescript';

  
interface weather {
  date: string;
  temperatureC: number;
  temperatueF: NumericLiteral;
  summary: string;
}

function App() {
  const [weathers, setWeather] = useState<weather[]>([]);
  const [error, setError] = useState({});

  useEffect(() => {
    fetch('/WeatherForecast')
    .then(response => response.json())
    .then(res => setWeather(res))
    .catch(err => setError(err))
  }, []);
  return (
    <div className='App'>
      Hej
      {weathers.length > 0 ? weathers.map(weather => (weather.summary)) : ("Loading...")}
    </div>
  )
}

export default App;
