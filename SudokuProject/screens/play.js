import { Button, View, StyleSheet, TouchableOpacity, Text, Activit, ActivityIndicator } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";

export default function Play() {

  const [fetching, setFetching] = useState(false);

  const [sudoku, setSudoku] = useState([
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

  const [answer, setAnswer] = useState([
    [-1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]]
    );

  const pressHandler = async function() {
    
    const timeout = 1000;
    
    let temp;
    
    let diff = "";
    setFetching(true);
    while (diff != "Medium") {
      const abortCont = new AbortController();
      
      const id = setTimeout(() => abortCont.abort(), timeout);
      await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},message}}", { signal: abortCont.signal })
      .then(res => {
        if(!res.ok) {
          throw Error("Could not get sudoku data");
        } else {
          return res.json();
        }
      })
      .then(data => {
        diff = data.newboard.grids[0].difficulty;
        temp = data.newboard.grids[0];
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(err.name);
        }
      })
      clearTimeout(id);
      console.log("Timeout cleared");
    }
    
    console.log("-----Done\n\n");
    setFetching(false);
    sudoku = temp.value;
    setAnswer(temp.solution);
  }


  const checkAnswer = () => {
    console.log(sudoku);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Play</Text>
      <View style={styles.button}>
        <Button title="Start sudoku" style={styles.button} onPress={pressHandler}/>
      </View>
      <Grid data={sudoku} solution={answer} />
      <View style={styles.button}>
        {/* <Button title="Check answer" style={styles.button} onPress={checkAnswer} /> */}
      </View>
      {fetching && <ActivityIndicator />}
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