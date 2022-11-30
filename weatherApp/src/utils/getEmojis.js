import { emojis } from "./emojis";

export const getEmojis = (id) => {
    let weather = "";

    if (id === "Snow") {
        weather += emojis.cold;
    }else if (id === "Clear"){
        weather += emojis.sun;
    }else if (id === "Rain"){
        weather += emojis.rain;
    }else if (id === "Clouds"){
        weather += emojis.cloud;
    }else if (id === "Thunderstorm"){
        weather += emojis.thunder;
    }else if (id === "Mist" ||"Smoke" ||"Haze"||"Dust"||"Fog"){
        weather += emojis.mist;
    }else{
        weather += "error"
    }

    return weather
}