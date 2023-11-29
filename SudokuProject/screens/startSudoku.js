import { View, StyleSheet, Text, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../components/button";
import RadioButtons from "../components/radioButtons";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../styles/global";


export default function StartSudoku( { navigation }) {

  const { t } = useTranslation();

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
  ];

  const [fetching, setFetching] = useState(false);

  const [difficultyCode, setDifficultyCode] = useState(1);

  const getGrids = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log(JSON.parse(jsonValue));
      console.log("Antall: " + JSON.parse(jsonValue).length);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };


  const startSudoku = async () => {


    let difficulty;
    console.log("Kode: " + difficultyCode);
    switch (difficultyCode) {
      case 0:
        difficulty = "easy-grids";
        break;
      case 1:
        difficulty = "medium-grids";
        break;
      case 2:
        difficulty = "hard-grids";
        break;
      default: 
        difficulty = "medium-grids"
    }

    setFetching(true);
    
    const sudokus = await getGrids(difficulty);
    
    const noSudokus = sudokus.length;
    
    if (noSudokus < 1) {
      Alert.alert("Cannot start sudoku", "There are no " + difficulty + " saved. Add more from the grid overview page.");
    } else {
      
      
      const i = Math.floor(Math.random() * noSudokus);
      
      const sudoku = sudokus[i];
      
      console.log(sudoku);
      
      init = JSON.parse(JSON.stringify(sudoku.value)); // Deep copy to keep init separate
      
      
      
      value = sudoku.value;
      
      solution = sudoku.solution;
      
      navigation.navigate('PlaySudoku', {
        value: value,
        init: init,
        solution: solution,
        difficulty: difficulty
    });
  }
  setFetching(false);
}

const resume = async () => {
  setFetching(true);
  try {

    
    const key = "save";
    const jsonValue = await AsyncStorage.getItem(key);
    
    console.log(JSON.parse(jsonValue));
    if (jsonValue == null) {
      Alert.alert("Cannot start sudoku", "There is no saved game")
    } else {
      const resumeValues = JSON.parse(jsonValue);
      
      navigation.navigate('PlaySudoku', {
        value: resumeValues.value,
        init: resumeValues.init,
        solution: resumeValues.solution,
        difficulty: resumeValues.difficulty,
        colors1: resumeValues.colors
      });
    }
    
  } catch (e) {
    console.log(e.message);
  }
  setFetching(false);
}
  
  
  return (
    <View style={globalStyles.container}>
      <Text style={styles.header}>{t("Start Sudoku")}</Text>
        {!fetching ? <View>
          <Text>{t("Select difficulty")}:</Text>
          <RadioButtons onPress={(difficultyCode) => {setDifficultyCode(difficultyCode)}} initialValue={difficultyCode}/>
          <View style={styles.container2}>
            <CustomButton title={t("Start sudoku")} onPress={() => {startSudoku()}}/>
            <CustomButton title={t("Resume game")} onPress={() => {resume()}}/>
          </View>
        </View>
        : <ActivityIndicator size={'large'} />}
  
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 60
  },
  container2: {
    marginTop: 40 
  }
})