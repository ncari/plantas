import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

import colors from "../constants/styles/colors";
import ViewArticleButton from "./Buttons/ViewArticle";

function PlantCard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.picAndTitle}>
          <Image
            source={require("../assets/profile.jpg")}
            style={styles.profilePic}
          />
          <Text style={styles.title}>Effective irrigation on rose plants</Text>
        </View>
        <View>
          <Text>..</Text>
        </View>
      </View>
      <Image source={require("../assets/rose.jpg")} style={styles.image} />
      <View style={styles.footer}>
        <View style={styles.interactions}>
          <Image
            source={require("../assets/heart.png")}
            style={styles.interactionIcon}
          />
          <Text style={styles.likes}>1,1k</Text>
        </View>
        <View>
          <ViewArticleButton
            onPress={() => {
              navigation.navigate("Article");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  header: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },

  picAndTitle: {
    flexDirection: "row",
    flex: 1,
  },

  profilePic: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
    height: 48,
    width: 48,
  },

  title: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  interactions: {
    flexDirection: "row",
    alignItems: "center",
  },

  interactionIcon: {
    width: 24,
    height: 24,
  },

  likes: {
    marginLeft: 5,
    color: colors.GREY,
    fontWeight: "bold",
    fontSize: 11,
  },
});

export default PlantCard;
