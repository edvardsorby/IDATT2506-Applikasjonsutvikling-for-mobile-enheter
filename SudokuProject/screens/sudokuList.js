import { Button, View, StyleSheet, TouchableOpacity, Text, TextInput, ActivityIndicator, FlatList, Alert } from "react-native";
import Grid from "../components/grid";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GridPreview from "../components/gridPreview";
import RadioButtons from "../components/radioButtons";

export default function SudokuList() {


  const [fetching, setFetching] = useState(false);

  const [difficulty, setDifficulty] = useState("Medium");

  const [grid, setGrid] = useState("Initial state");
  // let grid = {initial: "initial"};

  const [foundNewGrid, setFoundNewGrid] = useState(false);


  
    
  const [grids, setGrids] = useState();

  const getGrids = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  };

  const load = async () => {

    setFetching(true);

    console.log("difficulty = " + difficulty);

    const key = (difficulty + "-grids").toLowerCase();
    console.log("key = " + key)
  
    const loadedGrids = await getGrids(key);
    setGrids(loadedGrids);


    setFetching(false);

  }

  const updateGrids = async () => {
    try {



      const key = (difficulty + "-grids").toLowerCase();
      console.log("key = " + key)

    

  
  
      
      const jsonValue = JSON.stringify(grids);

      await AsyncStorage.setItem(key, jsonValue);
      console.log("Grids updated");
      Alert.alert(difficulty + " grid deleted");

      load();
    } catch (e) {
      // saving error
    }
  };

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const deleteGrid = async (grid) => {

    const index = grids.indexOf(grid);
    console.log(index);
    
    console.log(grids.length);
    grids.splice(index, 1);
    console.log(grids.length);


    updateGrids();
  }

  
  useEffect(() => {
    load();
    console.log("Loading");
  }, [difficulty]);

  const onPressHandler = (value) => {

    console.log(value + " logged");
    
    let diff;
    switch (value) {
      case 0:
        diff = "Easy";
        break;
      case 1:
        diff = "Medium";
        break;
      case 2:
        diff = "Hard";
        break;
      default:
        diff = "Medium";
        break;
    }
    console.log(diff);
    setDifficulty(diff);
    console.log(difficulty);

    //load();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sudoku list</Text>
      <RadioButtons onPress={(value) => {onPressHandler(value)}} initialValue={1}/>
      {/* <Button title="Load" onPress={load}/> */}
      {fetching && <ActivityIndicator />}
      {!fetching && grids && grids.length < 1 && <Text style={styles.warning}>There are no {difficulty.toLowerCase()} grids saved</Text>}
      <View style={styles.list}>
       {grids && <FlatList
          data={grids}
          renderItem={({item}) => 
          // <Item title={item.difficulty} />
          // <Grid data={item.value} />
          <GridPreview data={item.value} deleteGrid={() => {deleteGrid(item)}} diff={difficulty}/>
        }
        />}
       
      </View>
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
  list: {
    marginTop: 20,
    flex: 1,
  },
  warning: {
    marginTop: 100,
    fontSize: 24,
    fontWeight: 'bold'
  }
})