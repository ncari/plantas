import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../constants/styles/colors";

const title = "Some title";
const description = "Lorem ipsum dolor sit amet consequeaut";
const data = [1, 2, 3, 4, 5, 6].map((i) => ({
  id: i,
  title: `${title} ${i}`,
  description: `${description} ${i}`,
}));

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={[styles.white, styles.bold]}>{item.title}</Text>
    <Text style={styles.white}>{item.description}</Text>
  </View>
);

const renderArticles = () => (
  <FlatList data={data} renderItem={renderItem} keyExtractor={(i) => i.id} />
);

const renderPeople = () => (
  <View>
    <Text>People</Text>
  </View>
);

function Tabs({
  initial = "",
  renderPeople = () => {},
  renderArticles = () => {},
}) {
  const [current, setCurrent] = useState(initial);
  const people = current === "people";

  const handleTabChange = () => {
    setCurrent(people ? "articles" : "people");
  };
  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabsOptions}>
        <TouchableOpacity onPress={handleTabChange}>
          <Text style={!people && { fontWeight: "bold" }}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTabChange}>
          <Text style={people && { fontWeight: "bold" }}>People</Text>
        </TouchableOpacity>
      </View>
      {people ? renderPeople() : renderArticles()}
    </View>
  );
}

function ExploreScreen() {
  return (
    <ImageBackground style={styles.background}>
      <View style={styles.container}>
        <Text>Explore</Text>
        <TextInput placeholder="Search" />
        <Tabs
          initial="articles"
          renderPeople={renderPeople}
          renderArticles={renderArticles}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },

  container: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
  },

  item: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#0e8a00",
    marginBottom: 5,
  },

  white: {
    color: colors.WHITE,
  },

  bold: {
    fontWeight: "bold",
  },

  tabsOptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  tabsContainer: {
    flex: 1,
  },
});

export default ExploreScreen;
