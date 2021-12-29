import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Plus } from "react-native-feather";
import tw from "twrnc";

import ExploreScreen from "../containers/Explore";
import ArticleScreen from "../containers/Article";
import CreateArticleScreen from "../containers/CreateArticle";

const Stack = createStackNavigator();

function ExploreStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
        component={ExploreScreen}
        options={{
          headerTitle: "Articulos",
          headerRight: () => (
            <View style={tw`p-4`}>
              <Plus
                onPress={() => navigation.navigate("CreateArticle")}
                stroke={tw.color("black")}
              />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={({ route }) => ({ headerTitle: route.params.name })}
      />
      <Stack.Screen
        name="CreateArticle"
        component={CreateArticleScreen}
        options={{ headerTitle: "Nuevo Articulo" }}
      />
    </Stack.Navigator>
  );
}

export default ExploreStack;
