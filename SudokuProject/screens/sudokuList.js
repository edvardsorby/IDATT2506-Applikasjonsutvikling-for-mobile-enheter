import { View, StyleSheet, Text, ActivityIndicator, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GridPreview from "../components/gridPreview";
import RadioButtons from "../components/radioButtons";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../styles/global";

export default function SudokuList() {

  const { t } = useTranslation();


  const [fetching, setFetching] = useState(false);

  const [difficulty, setDifficulty] = useState("Medium");

    
  const [grids, setGrids] = useState();

  const getGrids = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e.message);
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
      console.log(e.message);
    }
  };


  const deleteGrid = async (index) => {

    if (grids.length > 1) {

      console.log(index);
      
      console.log(grids.length);
      grids.splice(index, 1);
      console.log(grids.length);
      
      updateGrids();
    } else {
      Alert.alert(t("Cannot delete grid"), t("There has to be at least one grid per difficulty."));
    }
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
  }

  useFocusEffect( // Runs when returning to this screen
    React.useCallback(() => {
      load();
    },[])
  );
  

  return (
    <View style={globalStyles.container}>
      <Text style={styles.header}>{t("Sudoku list")}</Text>
      <RadioButtons onPress={(value) => {onPressHandler(value)}} initialValue={1}/>
      {fetching && <ActivityIndicator size={"large"} marginTop={200}/>}
      <View style={styles.list}>
       {!fetching && grids && <FlatList
          data={grids}
          renderItem={({item, index}) => 
          <GridPreview data={item.value} deleteGrid={() => {deleteGrid(index)}} diff={difficulty} index={index}/>
        }
        />}
       
      </View>
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
  list: {
    marginTop: 20,
    flex: 1,
  }
})