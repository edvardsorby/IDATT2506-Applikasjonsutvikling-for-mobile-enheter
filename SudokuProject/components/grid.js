import { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button, Alert } from "react-native";

export default function Grid( {data, solution} ) {

  let initial = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ];

 

  let sudoku = data;


  let answer = solution;

  let selectedCell;

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
      let blank = false;
      if (sudoku[n][i]== 0) blank = true
      cells.push(
        <View style={[styles.cell, i == 3 ? styles.marginLeft : null, i == 5 ? styles.marginRight : null, colors[n][i] == 1 ? styles.green : null, colors[n][i] == 2 ? styles.yellow : null, colors[n][i] == 3 ? styles.red : null,]} key={key}>
          <TextInput keyboardType="numeric" 
            maxLength={1} 
            style={styles.textInput} 
            value={!blank ? sudoku[n][i].toString() : null}
            onChangeText={(e) => updateSudoku(e, key)}
            editable={initialSudoku[n][i] == 0 ? true : false} 
            onFocus={(e) => {focus(e, key)}}
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
    // console.log(e);
    // console.log(key);
    // console.log(key[0]);
    // console.log(key[1]);
    sudoku[key[0]][key[1]] = parseInt(e);
    console.log("S: " + sudoku);
    console.log("D: " + data);
    console.log("I: " + initial);
    console.log("init1: " + init1);
    console.log("init2: " + initialSudoku);
  }

  const checkAnswer = function() {
    console.log(answer);
    console.log(sudoku);

    if (JSON.stringify(sudoku) === JSON.stringify(answer)) {
      console.log("Hurra!");
      Alert.alert("Hurra!", "Det var riktig svar");
    } else {
      console.log("Feil!");
      Alert.alert("Feil", "Du har ikke løst sudokuen riktig");
    }
  }

  const focus = function(e, key) {
    //console.log(e);
    
    // setSelectedCell(key);
    selectedCell = key;
    console.log(key);
    
    // setColors(prevColors => {
    //   const newColors = colors;
    //   newColors[selectedCell[0]][selectedCell[1]] = 1;
    //   // return newColors;
    //   setColors(newColors);
    // // });


    // console.log(selectedCell);

    // console.log(colors);
    
    
    
    // setTest(prevTest => {
      //   const newTest = [...prevTest];
      //   newTest[0] = false;
      //   return newTest;
      // });
      // console.log(test);
    }
    
    const setGreen = function() {
      console.log(selectedCell);
      // const newColors = colors;
      // newColors[selectedCell[0]][selectedCell[1]] = 1;
      // setColors(newColors);
      
      setColors(prevColors => {
        const newColors = [...prevColors];
        newColors[selectedCell[0]][selectedCell[1]] = 1;
        return newColors;
      });
      console.log(selectedCell);
    }
    
    const setYellow = function() {
      setColors(prevColors => {
      const newColors = [...prevColors];
      newColors[selectedCell[0]][selectedCell[1]] = 2;
      return newColors;
    });
  } 

  const setRed = function() {
    console.log("CELLE:" + selectedCell);
    setColors(prevColors => {
      const newColors = [...prevColors];
      newColors[selectedCell[0]][selectedCell[1]] = 3;
      return newColors;
    });
  } 

  const setClear = function() {
    setColors(prevColors => {
      const newColors = [...prevColors];
      newColors[selectedCell[0]][selectedCell[1]] = 0;
      return newColors;
    });
  }

  return (
    <View>
      <View style={styles.board}>
        {newBoard()}
      </View>
    <Text>Color the cells:</Text>
    <Button title="Green" onPress={setGreen} />
    <Button title="Yellow" onPress={setYellow} />
    <Button title="Red" onPress={setRed} />
    <Button title="Clear color" onPress={setClear} />
    <Button title="Check answer" onPress={checkAnswer} />
    </View>

  )
}

const styles = StyleSheet.create({
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


