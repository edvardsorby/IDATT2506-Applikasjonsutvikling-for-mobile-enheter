import { Button, View, StyleSheet, TouchableOpacity, Text, Activit, ActivityIndicator } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";

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
  ]


  const pressHandler = function() {

    navigation.navigate('PlaySudoku', {
      value: value,
      init: init,
      solution: solution
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start Sudoku</Text>
      <View style={styles.button}>
        <Button title="Start sudoku" style={styles.button} onPress={pressHandler}/>
      </View>
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