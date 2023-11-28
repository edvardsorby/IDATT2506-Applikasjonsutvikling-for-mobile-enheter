import { Button, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, TextInput, Alert } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";
import CustomButton from "../components/button";

export default function PlaySudoku( { route } ) {

  const { value, init, solution } = route.params;



  const initialValues = JSON.parse(JSON.stringify(init));

  let sudoku = value;

  const [selectedCell, setSelectedCell] = useState(null);

  const [colors, setColors] = useState([
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ]);



  const findColor = function(n,i) {

    var color = colors[n][i];

    switch(color) {
      case 1:
        return styles.green;
      case 2:
        return styles.yellow;
      case 3:
        return styles.red;
      default:
        return null;
    }
  }

  const newRow = function(n) {
    const cells = [];
    
    // console.log(sudoku);
    for (let i = 0; i < 9; i++) {
      const key = n + "" + i;
      let blank = true;
      if (!(initialValues[n][i] == 0)) blank = false
      cells.push(
        <View style={[styles.cell, i == 3 ? styles.marginLeft : null, i == 5 ? styles.marginRight : null, findColor(n,i)]} key={key}>
          <TextInput keyboardType="numeric" 
            maxLength={1} 
            style={styles.textInput} 
            value={!blank ? sudoku[n][i].toString() : null}
            onChangeText={(e) => updateSudoku(e, key)}
            editable={blank ? true : false} 
            onFocus={() => {focus(key)}}
            />
        </View>
      )
      // console.log(key);
    }
    return cells;
  }

  let s = [];

  const newBoard = function() {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      rows.push(
        <View style={[styles.row, i == 3 ? styles.marginTop : null, i == 5 ? styles.marginBottom : null]} key={i}>
          {newRow(i)}
        </View>
      )
    }
    s = rows;
    return rows;
  }


  const updateSudoku = function(e, key) {
    
    console.log(sudoku);
    sudoku[key[0]][key[1]] = parseInt(e);
    if (!(sudoku[key[0]][key[1]] > 0 && sudoku[key[0]][key[1]] < 10)) sudoku[key[0]][key[1]] = 0;
    console.log(sudoku);
  }

  const checkAnswer = function() {
    console.log(solution);
    console.log(sudoku);

    if (JSON.stringify(sudoku) === JSON.stringify(solution)) {
      console.log("Correct solution!");
      Alert.alert("Congratulations!", "You have solved the sudoku");
    } else {
      console.log("Wrong solution");
      Alert.alert("Wrong!", "You have not solved the sudoku correctly");
    }
  }

  const focus = function(key) {
    setSelectedCell(key);
    console.log(key);
    }
    
    const setGreen = function() {
      if (selectedCell === null) return;

      setColors(prevColors => {
        const newColors = [...prevColors];
        newColors[selectedCell[0]][selectedCell[1]] = 1;
        return newColors;
      });
    }
    
    const setYellow = function() {
      if (selectedCell === null) return;

      setColors(prevColors => {
      const newColors = [...prevColors];
      newColors[selectedCell[0]][selectedCell[1]] = 2;
      return newColors;
    });
  } 

  const setRed = function() {
    if (selectedCell === null) return;

    setColors(prevColors => {
      const newColors = [...prevColors];
      newColors[selectedCell[0]][selectedCell[1]] = 3;
      return newColors;
    });
  } 

  const setClear = function() {
    if (selectedCell === null) return;

    setColors(prevColors => {
      const newColors = [...prevColors];
      newColors[selectedCell[0]][selectedCell[1]] = 0;
      return newColors;
    });
  }


  return (
    <View style={styles.container}>
      <Text>Play Sudoku</Text>
      <View style={styles.board}>
        {newBoard()}
      </View>
      <Text>Color the cells:</Text>

      <View style={styles.radioButtonGroup}>

      <TouchableOpacity onPress={setClear}>
          <View style={styles.radioButton}>
              <View>
                <Text style={styles.radioButtonText}>Clear</Text>
              </View>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={setGreen}>
          <View style={styles.radioButton}>
              <View style={styles.selectedEasy}>
                <Text style={styles.radioButtonText}>Green</Text>
              </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={setYellow}>
        <View style={styles.radioButton}>
              <View style={styles.selectedMedium}>
                <Text style={styles.radioButtonText}>Yellow</Text>
              </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={setRed}>
        <View style={styles.radioButton}>
              <View style={styles.selectedHard}>
                <Text style={styles.radioButtonText}>Red</Text>
              </View>
          </View>
        </TouchableOpacity>
      </View>
      
      <CustomButton title="Check answer" onPress={checkAnswer} />

    
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
  board: {
    backgroundColor: '#333333',
    display: 'flex',
    padding: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  cell: {
    width: 30,
    height: 30,
    margin: 1,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  marginLeft: {
    marginLeft: 3,
  },
  marginRight: {
    marginRight: 3,
  },
  marginTop: {
    marginTop: 3,
  },
  marginBottom: {
    marginBottom: 3,
  },
  textInput: {
    fontSize: 20,
    textAlign: 'center'
  },
  greyedOut: {
    color: '#777'
  },
  green: {
    backgroundColor: '#a3ff87',
  },
  yellow: {
    backgroundColor: '#f9ff87',
  },
  red: {
    backgroundColor: '#ff8787',
  },
})