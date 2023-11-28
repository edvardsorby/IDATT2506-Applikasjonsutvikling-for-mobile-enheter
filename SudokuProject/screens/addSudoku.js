import { Button, View, StyleSheet, TouchableOpacity, Text, TextInput, ActivityIndicator, Alert } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../components/button";

export default function AddSudoku( {navigation} ) {

  const [selectedRadioButton, setSelectedRadioButton] = useState(1);

  const [fetching, setFetching] = useState(false);

  const [difficulty, setDifficulty] = useState("");

  const [grid, setGrid] = useState("Initial state");
  // let grid = {initial: "initial"};

  const [foundNewGrid, setFoundNewGrid] = useState(false);

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

  const findDifficulty = () => {
    switch (selectedRadioButton) {
      case 0:
        return "Easy";
      case 1:
        return "Medium";
      case 2:
        return "Hard";
      default:
        return "Medium";
    }
  }

  const fetchSudoku = async () => {
    
    const timeout = 1000;
    
    let temp;
    
    let diff = "";
    const wantedDifficulty = findDifficulty();
    setFetching(true);
    while (diff != wantedDifficulty) {
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
    setSudoku(temp.value);
    setDifficulty(temp.difficulty);
    console.log(sudoku);
    console.log(temp);
    console.log("Inside fetchSudoku - Before setGrid", grid);
    setGrid(temp);
    // grid = temp;
    console.log("Inside fetchSudoku - After setGrid", grid);

    console.log(grid);

    setFoundNewGrid(true);
    //setAnswer(temp.solution);
  }


  const saveGrid = async () => {
    try {

      let key = "medium-grids";
      switch(selectedRadioButton) {
        case 0:
          key = "easy-grids";
          break;
        case 2:
          key = "hard-grids";
          break;
      }

      console.log(key);

      console.log("Grid: " + JSON.stringify(grid));
      
      const grids = await getGrids(key);

      grids.push(grid);
      //grid = grid;

  
      
      const jsonValue = JSON.stringify(grids);

      // Use the state variable directly
      // const jsonValue = JSON.stringify([...(await getGrids(key)) || [], grid]);

      await AsyncStorage.setItem(key, jsonValue);
      console.log("Grid saved");
      Alert.alert(difficulty + " grid saved");
      setFoundNewGrid(false);
    } catch (e) {
      // saving error
    }
  };

  const getGrids = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add new sudoku</Text>

      <Grid data={sudoku} />

      
      <Text>Difficulty: {difficulty}</Text>
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
      {fetching && <ActivityIndicator />}
      {!fetching && <CustomButton title="Get new grid" style={styles.button} onPress={fetchSudoku}/>}
      {foundNewGrid && <CustomButton title="Save grid" style={styles.button} onPress={saveGrid}/>}
 

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
})