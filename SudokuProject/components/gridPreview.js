import { View, StyleSheet, Text } from "react-native";
import Grid from "./grid";
import CustomButton from "./button";
import { useTranslation } from "react-i18next";

export default function GridPreview( {data, deleteGrid, diff, index} ) {

  const { t } = useTranslation();


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t(diff)} {t("initial board")} {index+1}</Text>
      <Grid data={data} />
      <CustomButton title={t("Delete grid")} onPress={deleteGrid}/>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#000',
    borderTopWidth: 3,
    marginBottom: 35,
    display: "flex",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20
  }
})


