//Using a flag to log once
let flag = false;

//Geolocation options
let options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 10000
};


// On succesfull call saves current user location to localStorage
const successCallback = (position) => {
    const coordinates = {
        location: "Your Area",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    localStorageService.coordinates = coordinates;
    console.log(position);
}

//On error saves default coordinates to localStorage
const errorCallback = (error) => {
    const defaultCoordinates = {
        location: "Kaunas",
        latitude: 54.8985,
        longitude: 23.9036
    }
    localStorageService.coordinates = defaultCoordinates;
    console.error(error);
}

//Adds a zero to the beggining if the number is smaller than 10
const formatTime = (time) => {
    return time < 10 ? (`0${time}`) : time;
}

//Calculates the next sunset time and initializes the counter
const countdown = () => {

    const coords = localStorageService.coordinates
    const { location, latitude, longitude } = coords;

    if (location == undefined) {
        //The timer will not start without a location
    } else {
        const currentTime = new Date();
        const sunsetMain = new Date().sunset(latitude, longitude)
        //Will check if the sunset already ended. If yes then will start counting time to the next sunset else returns sunset time of today
        const sunset = currentTime > sunsetMain ? new Date(currentTime.getTime()+86400000).sunset(latitude, longitude) : sunsetMain;

        if (flag == false) {
            console.log("Next sunset will be at:", sunset);
            console.log("Miliseconds until next sunset:", sunset - currentTime);
            flag = true;
        }
        const totalSeconds = Math.floor((sunset - currentTime) / 1000);
        const seconds = Math.floor(totalSeconds % 60)
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600) % 24;

        const setLocation = document.querySelector('#location');
        const setHours = document.querySelector('#hours');
        const setMinutes = document.querySelector('#minutes');
        const setSeconds = document.querySelector('#seconds');

        setLocation.textContent = `Next Sunset In ${location}`;
        setHours.textContent = formatTime(hours);
        setMinutes.textContent = formatTime(minutes);
        setSeconds.textContent = formatTime(seconds);
    }
}

//Finds current location and saves it to localStorage
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

//Calls the countdown function every second
setInterval(countdown, 1000);