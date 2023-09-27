import React,{useState, useEffect } from "react";
import { StyleSheet, Text, View , Image} from "react-native";

const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "3eeb04f612113565dc8bd4246cb1d88f";
const ICON_URL = "http://openweathermap.org/img/wn/";

export default function Weather({ latitude, longitude }) {

    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const url= API_URL
            + 'lat=' + latitude
            + '&lon=' + longitude
            + '&units=metric'
            + '&appid=' + API_KEY;
        fetch(url)
        .then (res => res.json())
        .then(
            (result) => {
                setTemp(result.main.temp);
                setDescription(result.weather[0].description);
                setIcon(ICON_URL + result.weather[0].icon + '@2x.png');
            },
            (error) => {
                alert(error);
            }
        )        
    }, []);

    return (
        <>
            <Text style={styles.label}>Temperature:</Text>
            <Text>{temp} C</Text>
            <Text style={styles.label}>Description:</Text>
            <Text>{description}</Text>
            {icon !== '' &&<Image source={{uri: icon}} style={{width: 100, height: 100}} />}
            

        </>
    );
}