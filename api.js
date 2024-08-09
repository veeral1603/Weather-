export const api_key = "797af8683d27a9e82a425e1671a6e13d";

export const fetchData = async function(URL , callback){
    try {
    const  res = await fetch(`${URL}&appid=${api_key}`);
    if (res.status !== 200)
    {
        throw new Error(); 
    }
    const data = await res.json();
    callback(data);
    } 
    catch (err){
        console.error(`${err}`);
    }

}

export const url = {
    currentWeather(lat , lon){
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
    },

    forecast(lat , lon){
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
    },

    airPollution(lat , lon){
        return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
    },

    reverseGeo(lat , lon){
        return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
    },

    geo(query){
        return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
    }
};

