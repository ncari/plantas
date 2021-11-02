import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../constants/styles/colors";

function ViewArticleButton({ onPress = () => {} }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>View Article</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.BLUE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  text: {
    fontWeight: "bold",
    color: colors.WHITE,
    textAlign: "center",
  },
});

export default ViewArticleButton;
