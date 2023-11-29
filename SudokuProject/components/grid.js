import { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button, Alert } from "react-native";
import { globalStyles } from "../styles/global";

export default function Grid( {data} ) {

 


  let sudoku = data;



  const newRow = function(n) {
    const cells = [];
    
    for (let i = 0; i < 9; i++) {
      const key = n + "" + i;
      cells.push(
        <View style={[styles.cell, i == 3 ? styles.marginLeft : null, i == 5 ? styles.marginRight : null, sudoku[n][i] != 0 ? globalStyles.greyedOut : null]} key={key}>
          <Text style={styles.textInput}>{sudoku[n][i] != 0 ? sudoku[n][i].toString() : null}</Text>
        </View>
      )
    }
    return cells;
  }


  const newBoard = function() {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      rows.push(
        <View style={[styles.row, i == 3 ? styles.marginTop : null, i == 5 ? styles.marginBottom : null]} key={i}>
          {newRow(i)}
        </View>
      )
    }
    return rows;
  }

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {newBoard()}
      </View>
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
    textAlign: 'center',
  },
  greyedOut: {
    backgroundColor: '#ddd'
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
  container: {
    marginBottom: 50
  }
})


