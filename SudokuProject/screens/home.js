import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Button title="Play" onPress={() => navigation.navigate('StartSudoku')}/>
      <Text></Text>
      {/* <Button title="Add sudoku" onPress={() => navigation.navigate('AddSudoku')}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
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