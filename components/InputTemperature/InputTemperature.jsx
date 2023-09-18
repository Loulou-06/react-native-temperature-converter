import { Text, TextInput, View } from "react-native";
import { s } from "./InputTemperature.style";
import { UNITS } from "../../constant";

export function InputTemperature({ defaultValue, onChangeText, unit }) {
  return (
    <View style={s.container}>
      <TextInput
        style={s.input}
        placeholder="indique une température a convertir"
        keyboardType="numeric"
        maxLength={4}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
      />
      <Text style={s.unit}>{unit}</Text>
    </View>
  );
}
