import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { s } from "./App.style";
import { InputTemperature } from "./components/InputTemperature/InputTemperature";
import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay";
import { DEFAULT_TEMPERATURE, DEFAULT_UNIT, UNITS } from "./constant";
import {
  getOppositUnit,
  convertTemperatureTo,
  isIceTemperature,
} from "./services/temperature-service";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert";

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE);
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNIT);
  const [currentBackground, setCurrentBackground] = useState();
  const oppositeUnit = getOppositUnit(currentUnit);

  useEffect(() => {
    const temperatureAsFloat = Number.parseFloat(inputValue);
    if(!isNaN(temperatureAsFloat)){
      const isColdBackground = isIceTemperature(inputValue, currentUnit);
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground);
    }
  }, [inputValue, currentUnit]);

  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat)
      ? ""
      : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
  }

  // console.log(inputValue);
  return (
    <>
      <ImageBackground source={currentBackground} style={s.container}>
        <View style={s.workspace}>
          <TemperatureDisplay
            value={getConvertedTemperature()}
            unit={getOppositUnit(currentUnit)}
          />
          <InputTemperature
            onChangeText={setInputValue}
            defaultValue={DEFAULT_TEMPERATURE}
            unit={currentUnit}
          />
          <ButtonConvert
            onPress={() => {
              setCurrentUnit(oppositeUnit);
            }}
            unit={currentUnit}
          />
        </View>
      </ImageBackground>
    </>
  );
}
