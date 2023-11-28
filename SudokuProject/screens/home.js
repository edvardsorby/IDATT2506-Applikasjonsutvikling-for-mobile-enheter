import { Button, View, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator } from "react-native";
import Grid from "../components/grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import CustomButton from "../components/button";

export default function Home({ navigation }) {

  const {t, i18n} = useTranslation();


  const [langLoaded, setLangloaded] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setLangloaded(true);
      console.log(true);
      
    } else {
      console.log(false);
    }
  });

  return (
    <View style={styles.container}>
      <Image source={require('../assets/sudoku-logo.png')} style={styles.logo}/>
      <CustomButton title={langLoaded ? t("Play") : ""} onPress={() => navigation.navigate('StartSudoku')}/>
      <CustomButton title={langLoaded ?t("Add/remove sudoku grids") : ""} onPress={() => navigation.navigate('SudokuList')}/>
      {/* <CustomButton title={langLoaded ?t("Change language") : ""} onPress={changeLanguage}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  logo: {
    width: 206,
    height: 204,
    marginBottom: 100
  },
  button: {
    margin: 10,
    backgroundColor: "green",
    width: '90%',
    color: "#000000"
  },


})