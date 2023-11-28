import { Button, View, StyleSheet, TouchableOpacity, Text, Activit, ActivityIndicator, Alert } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../components/button";


export default function StartSudoku( { navigation }) {

  let value = [
    [5,0,0,0,0,1,0,0,0],
    [0,9,0,6,0,8,0,5,0],
    [0,0,0,0,4,0,0,7,6],
    [0,0,0,0,1,5,0,0,0],
    [2,7,6,0,0,0,1,0,5],
    [9,0,5,0,0,6,0,2,0],
    [8,0,3,0,6,0,0,0,7],
    [0,0,0,8,0,0,6,0,0],
    [0,0,0,0,9,7,5,8,3]
  ];

  let solution = [
    [5,6,7,3,2,1,9,4,8],
    [3,9,4,6,7,8,2,5,1],
    [1,8,2,5,4,9,3,7,6],
    [4,3,8,2,1,5,7,6,9],
    [2,7,6,9,8,4,1,3,5],
    [9,1,5,7,3,6,8,2,4],
    [8,5,3,1,6,2,4,9,7],
    [7,4,9,8,5,3,6,1,2],
    [6,2,1,4,9,7,5,8,3]
  ];

  let init = [
    [5,0,0,0,0,1,0,0,0],
    [0,9,0,6,0,8,0,5,0],
    [0,0,0,0,4,0,0,7,6],
    [0,0,0,0,1,5,0,0,0],
    [2,7,6,0,0,0,1,0,5],
    [9,0,5,0,0,6,0,2,0],
    [8,0,3,0,6,0,0,0,7],
    [0,0,0,8,0,0,6,0,0],
    [0,0,0,0,9,7,5,8,3]
  ];

  const [fetching, setFetching] = useState(false);

  const getGrids = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log(JSON.parse(jsonValue));
      console.log("Antall: " + JSON.parse(jsonValue).length);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };


  const startSudoku = async (difficulty) => {

    setFetching(true);
    
    const sudokus = await getGrids(difficulty);
    
    const noSudokus = sudokus.length;
    
    if (noSudokus < 1) {
      Alert.alert("Cannot start sudoku", "There are no " + difficulty + " saved. Add more from the grid overview page.");
    } else {
      
      
      const i = Math.floor(Math.random() * noSudokus);
      
      const sudoku = sudokus[i];
      
      console.log(sudoku);
      
      init = JSON.parse(JSON.stringify(sudoku.value)); // Deep copy to keep init separate
      
      
      
      value = sudoku.value;
      
      solution = sudoku.solution;
      
      navigation.navigate('PlaySudoku', {
        value: value,
      init: init,
      solution: solution
    });
  }
  setFetching(false);
}
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start Sudoku</Text>
      {
      !fetching ?
        <View>
          <CustomButton title="Start easy sudoku" style={styles.button} onPress={() => {startSudoku("easy-grids")}}/>
          <CustomButton title="Start medium sudoku" style={styles.button} onPress={() => {startSudoku("medium-grids")}}/>
          <CustomButton title="Start hard sudoku" style={styles.button} onPress={() => {startSudoku("hard-grids")}}/>
        </View>
        : <ActivityIndicator />}
  
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
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