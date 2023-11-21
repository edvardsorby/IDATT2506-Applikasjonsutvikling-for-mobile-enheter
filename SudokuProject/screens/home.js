import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";

export default function Home() {

  return (
    <View>
      <Text style={styles.header}>Welcome</Text>
      <Button title="Add sudoku"/>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30
  }
})