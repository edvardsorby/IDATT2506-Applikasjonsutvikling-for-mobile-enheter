import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";

export default function AddSudoku() {

  const [selectedRadioButton, setSelectedRadioButton] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create new sudoku</Text>
      <Grid data={{}}/>
      <Text>Difficulty:</Text>
      <View style={styles.radioButtonGroup}>
        <TouchableOpacity onPress={() => setSelectedRadioButton(0)}>
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

        <TouchableOpacity onPress={() => setSelectedRadioButton(1)}>
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

        <TouchableOpacity onPress={() => setSelectedRadioButton(2)}>
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
      <View style={styles.button}>
        <Button title="Add sudoku" style={styles.button}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})