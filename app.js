window.addEventListener('load', () => {
    let long; 
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description"); 
    let temperatureDegree = document.querySelector(".temperature-degree"); 
    let locationTimezone = document.querySelector(".location-timezone"); 

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude; 
            lat = position.coords.latitude; 
            
            const proxy = 'https://cors-anywhere.herokuapp.com/'; 
            const api = `${proxy}https://api.darksky.net/forecast/c7e0ae610af06c083f00c4ccb8b1eb68/${lat},${long}`; 
        
        
        fetch(api)
            .then(response => {
                return response.json(); 
            })// end .then(response)

            .then(data => {
                // console.log(data); 
                const {temperature, summary, icon} = data.currently;
                //Set DOM Elements from the API 
                temperatureDegree.textContent = temperature;  
                locationTimezone.textContent = data.timezone; 
                //set Icon 
                setIcons(icon, document.querySelector('.icon')); 
            
            }); //end .then(data)
        }); 

    }//end if 

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"}); 
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); 
        skycons.play(); 
        return skycons.set(iconID, Skycons[currentIcon]); 
    }
}); //end window.addEventListener 