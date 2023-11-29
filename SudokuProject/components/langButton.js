import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function LangButton() {

  const { t, i18n } = useTranslation();

  const changeLanguage = async () => {
    let lng = "en" 
    if (i18n.language == "en") lng = "no";

    i18n.changeLanguage(lng);
  }

  return (
    <TouchableOpacity style={styles.box} onPress={changeLanguage}>
      <Text style={styles.flag}> {t("flag")} </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  flag: {
    fontSize: 30
  },
  box: {
    borderRadius: 15,
    borderColor: '#555',
    borderWidth: 2,
    paddingBottom: 3
  }
})