import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import colors from "../constants/styles/colors";

function ArticleScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/rose.jpg")} style={styles.picture} />
      <View style={styles.body}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.interactions}>
            <Image
              source={require("../assets/heart.png")}
              style={styles.interactionIcon}
            />
            <Text style={styles.likes}>1,1k</Text>
          </View>
          <Text style={styles.title}>Positive effects in detail</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            eleifend enim. Quisque cursus pellentesque lacinia. Nulla fringilla
            venenatis ipsum eu consequat. Aenean mauris risus, pellentesque eu
            tortor non, gravida interdum turpis. Nullam mattis ante vitae ante
            scelerisque, a lobortis tellus dignissim. Etiam in consequat mauris.
            Integer tincidunt felis ac elit consectetur, sit amet pretium arcu
            accumsan. Suspendisse facilisis dui hendrerit dignissim porttitor.
            Cras fringilla urna nec sapien tincidunt tempus. Aenean arcu sapien,
            ultrices vel nulla quis, facilisis efficitur est. Curabitur pulvinar
            et nunc eget pulvinar. Nunc molestie tellus fringilla augue
            sollicitudin lobortis. Sed purus felis, rutrum eget purus sit amet,
            feugiat maximus nisi. Pellentesque dolor ipsum, fringilla et
            fringilla sit amet, auctor nec enim. Morbi a dolor at nisi vulputate
            convallis ac dignissim odio. Nunc sed ipsum nec tellus fermentum
            tristique.
          </Text>
          <View style={styles.picsContainer}>
            <Image
              source={require("../assets/rose.jpg")}
              style={styles.smallPicture1}
            />
            <Image
              source={require("../assets/rose.jpg")}
              style={styles.smallPicture2}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  picture: {
    width: "100%",
    height: 200,
  },

  scrollView: {
    flex: 1,
  },

  body: {
    marginTop: -15,
    borderTopLeftRadius: 20,
    zIndex: 100,
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  title: {
    fontWeight: "bold",
    fontSize: 14,
  },

  description: {
    marginTop: 10,
    fontSize: 12,
    color: colors.GREY,
  },

  picsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  smallPicture1: {
    height: 100,
    width: "48%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  smallPicture2: {
    height: 100,
    width: "48%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
  },

  interactions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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

export default ArticleScreen;
