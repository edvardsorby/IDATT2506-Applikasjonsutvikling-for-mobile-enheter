import { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function RadioButtons({ onPress, initialValue }) {

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
                <Text style={styles.radioButtonText}>Easy</Text>
              </View>
              :
              <Text style={styles.radioButtonText}>Easy</Text>
              }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectRadioButton(1)}>
        <View style={styles.radioButton}>
            { selectedRadioButton == 1? 
              <View style={styles.selectedMedium}>
                <Text style={styles.radioButtonText}>Medium</Text>
              </View>
              :
              <Text style={styles.radioButtonText}>Medium</Text>
              }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectRadioButton(2)}>
        <View style={styles.radioButton}>
            { selectedRadioButton == 2? 
              <View style={styles.selectedHard}>
                <Text style={styles.radioButtonText}>Hard</Text>
              </View>
              :
              <Text style={styles.radioButtonText}>Hard</Text>
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
    // borderRadius: 20,
    borderColor: '#000',
    borderWidth: 3,
    marginTop: 20,
  },
  radioButtonText: {
    textAlign: 'center'
  },
  radioButtonGroup: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  selectedEasy: {
    backgroundColor: '#a3ff87',
    height: '100%'
  },
  selectedMedium: {
    backgroundColor: '#f9ff87',
    height: '100%'
  },
  selectedHard: {
    backgroundColor: '#ff8787',
    height: '100%',
  },
})