import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icons from "@/constants/icons";

interface FormFieldProps {
  title?: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles?: any;
  keyboardType?: any;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);  // Esconde o picker após a seleção
    setDate(currentDate);
    handleChangeText(moment(currentDate).format("DD/MM/YYYY")); // Formata e envia a data
  };

  return (
    <View style={[styles.formView, otherStyles]}>
      <Text style={styles.formText}>{title}</Text>
      <View style={[styles.viewInput, isFocused && styles.inputFocused]}>
        {/* Se for um campo de data, ao clicar ele abrirá o DatePicker */}
        {title === "Data de Nascimento" ? (
          <>
            <TouchableOpacity
              style={styles.formInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: value ? "#000" : "#7b7b8b" }}>
                {value || placeholder || "Selecione uma data"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        ) : (
          <TextInput
            style={styles.formInput}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Senha" && !showPassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType={keyboardType || "default"}
          />
        )}

        {/* Se for senha, mostra o ícone de mostrar/esconder */}
        {title === "Senha" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? Icons.eye : Icons.eyeHide}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  formView: {
    display: "flex",
    flexDirection: "column",
    width: 310,
    gap: 6,
    marginTop: 9
  },
  formText: {
    fontSize: 15,
    color: "#AFAFAF",
    fontFamily: "CircularSpotifyText-Medium",
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  formInput: {
    flex: 1,
    color: "black",
    fontFamily: "CircularSpotifyText-Medium",
    fontSize: 14,
  },
  inputFocused: {
    borderColor: "#AE8333",
  },
});
