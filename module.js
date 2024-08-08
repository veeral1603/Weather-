'use stict' ;

export const weekDayNames = ["Sunday", "Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const monthNames = ["Jan" , "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * 
 * @param {number} dateUnix unix date in seconds
 * @param {number} timeZone timezone shift from utc in seconds
 * @returns {string} Date string
 */

export const getDate = function(dateUnix, timeZone){
    const date = new Date((dateUnix + timeZone) * 1000);
    const weekDayName = weekDayNames[date.getUTCDay()];
    const monthName = monthNames[date.getUTCMonth()];

    return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;
}


export const getTime = function ( dateUnix, timeZone){
    const date = new Date((dateUnix + timeZone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours > 12 ? "PM" : "AM";

    return `${hours % 12 || 12}:${minutes} ${period}`;
}

export const getHours = function ( dateUnix, timeZone){
    const date = new Date((dateUnix + timeZone) * 1000);
    const hours = date.getUTCHours();
    const period = hours > 12 ? "PM" : "AM";

    return `${hours % 12 || 12}:${minutes} ${period}`;
}

export const mps_To_kmh = mps => {
    const mph = mps * 3600;

    return mph / 1000;
}

export const aqiText = {
    1: {
        level: "Good",
        message: "Air quality is considered satisfactory, and air pollution poses little to no risk."
    },
    2: {
        level: "Fair",
        message: "Air quality is acceptable, however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitivie to air pollution."
    },
    3: {
        level: "Moderate",
        message: "Members of sensitive group may experience health effects. The general public is not likely to be affected."
    },
    4: {
        level: "Poor",
        message: "Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects."
    },
    5: {
        level: "Very Poor",
        message: "Health warnings of emergency conditions. The entire population is likely to be affected."
    }
};