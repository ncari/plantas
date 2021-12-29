import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import tw from "twrnc";
import HTMLView from "react-native-htmlview";
import { baseUrl } from "../config/config";

function ArticleScreen({ route }) {
  const { title, resume, body, image_path } = route.params.article;
  return (
    <View style={tw`flex-1`}>
      <Image
        source={{ uri: `${baseUrl}/${image_path}` }}
        style={styles.picture}
      />
      <View style={tw`flex-1 bg-white px-4`}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={tw`mt-4 text-lg font-bold`}>{title}</Text>
          <Text style={tw`mt-4 mb-2`}>{resume}</Text>

          <HTMLView value={body} style={tw`mb-4`} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: "100%",
    height: 200,
  },

  scrollView: {
    flex: 1,
  },
});

export default ArticleScreen;
