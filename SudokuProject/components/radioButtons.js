import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function RadioButtons({ onPress, initialValue }) {

  const { t } = useTranslation();

  const [selectedRadioButton, setSelectedRadioButton] = useState(initialValue);

  const selectRadioButton = (value) => {

    setSelectedRadioButton(value);
    onPress(value);
  }

  return (
    <View>
      <View style={styles.radioButtonGroup}>
        <TouchableOpacity onPress={() => selectRadioButton(0)}>
          <View style={styles.radioButton}>
            { selectedRadioButton == 0? 
              <View style={styles.selectedEasy}>
                <Text style={styles.radioButtonText}>{t("Easy")}</Text>
              </View>
              :
              <Text style={styles.radioButtonText}>{t("Easy")}</Text>
              }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectRadioButton(1)}>
        <View style={styles.radioButton}>
            { selectedRadioButton == 1? 
              <View style={styles.selectedMedium}>
                <Text style={styles.radioButtonText}>{t("Medium")}</Text>
              </View>
              :
              <Text style={styles.radioButtonText}>{t("Medium")}</Text>
              }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectRadioButton(2)}>
        <View style={styles.radioButton}>
            { selectedRadioButton == 2? 
              <View style={styles.selectedHard}>
                <Text style={styles.radioButtonText}>{t("Hard")}</Text>
              </View>
              :
              <Text style={styles.radioButtonText}>{t("Hard")}</Text>
              }
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    width: 200,
    margin: 5
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: 16,
    textAlign: 'center',
  },
  radioButton: {
    width: 75,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 3,
    marginTop: 20,
    marginRight: 10
  },
  radioButtonText: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  radioButtonGroup: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  selectedEasy: {
    backgroundColor: '#a3ff87',
    borderRadius: 17,
    height: '100%'
  },
  selectedMedium: {
    backgroundColor: '#f9ff87',
    borderRadius: 17,
    height: '100%'
  },
  selectedHard: {
    backgroundColor: '#ff8787',
    borderRadius: 17,
    height: '100%'
  },
})