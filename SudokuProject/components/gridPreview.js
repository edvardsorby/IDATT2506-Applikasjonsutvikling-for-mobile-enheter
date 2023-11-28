import { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button, Alert } from "react-native";
import Grid from "./grid";

export default function GridPreview( {data, deleteGrid, diff} ) {

 


  return (
    <View style={styles.container}>
      <Grid data={data} />
      <Text>Difficulty: {diff}</Text>
      <Button title={"Delete grid"} onPress={deleteGrid}/>
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
  container: {
    marginBottom: 50
  }
})


