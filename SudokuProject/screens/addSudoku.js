import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import Grid from "../components/grid";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../components/button";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../styles/global";

export default function AddSudoku() {

  const { t } = useTranslation();

  const [selectedRadioButton, setSelectedRadioButton] = useState(1);

  const [fetching, setFetching] = useState(false);

  const [difficulty, setDifficulty] = useState("");

  const [grid, setGrid] = useState("");

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

    let stop = false;

    while (!stop && diff != wantedDifficulty) {
      const abortCont = new AbortController();
      
      const id = setTimeout(() => abortCont.abort(), timeout); // Timeout if one fetch hangs
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
          clearTimeout(id);
        } else {
          console.log(err.name); 
          console.log(err.message);
          Alert.alert(t("Something went wrong"), err.name + ": " + err.message);
          stop = true;
        }
      })
      console.log("Timeout cleared");
    }
    
    setFetching(false);
    setSudoku(temp.value);
    setDifficulty(temp.difficulty);
    console.log(sudoku);
    console.log(temp);
    setGrid(temp);
    console.log(grid);

    setFoundNewGrid(true);
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

      
      const jsonValue = JSON.stringify(grids);

   
      await AsyncStorage.setItem(key, jsonValue);
      console.log("Grid saved");
      Alert.alert(t(difficulty) + " " + t("grid saved"));
      setFoundNewGrid(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getGrids = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e.message);
    }
  };



  return (
    <View style={globalStyles.container}>
      <Text style={styles.header}>{t("Add new sudoku")}</Text>

      <Grid data={sudoku} />

      
      <Text>{t("Difficulty")}:</Text>
      <View style={styles.radioButtonGroup}>
        <TouchableOpacity onPress={() => setSelectedRadioButton(0)}>
          <View style={globalStyles.radioButton}>
            { selectedRadioButton == 0? 
              <View style={globalStyles.selectedEasy}>
                <Text style={globalStyles.radioButtonText}>{t("Easy")}</Text>
              </View>
               :
               <Text style={globalStyles.radioButtonText}>{t("Easy")}</Text>
              }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedRadioButton(1)}>
        <View style={globalStyles.radioButton}>
            { selectedRadioButton == 1? 
              <View style={globalStyles.selectedMedium}>
                <Text style={globalStyles.radioButtonText}>{t("Medium")}</Text>
              </View>
               :
               <Text style={globalStyles.radioButtonText}>{t("Medium")}</Text>
              }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedRadioButton(2)}>
        <View style={globalStyles.radioButton}>
            { selectedRadioButton == 2? 
              <View style={globalStyles.selectedHard}>
                <Text style={globalStyles.radioButtonText}>{t("Hard")}</Text>
              </View>
               :
               <Text style={globalStyles.radioButtonText}>{t("Hard")}</Text>
              }
          </View>
        </TouchableOpacity>

      </View>
      {fetching && <ActivityIndicator size={"large"} marginTop={25}/>}
      {!fetching && <CustomButton title={t("Get new grid")} style={styles.button} onPress={fetchSudoku}/>}
      {foundNewGrid && <CustomButton title={t("Save grid")} style={styles.button} onPress={saveGrid}/>}
 

    </View>
  )
}

const styles = StyleSheet.create({

  radioButtonGroup: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30
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