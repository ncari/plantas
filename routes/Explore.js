import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Plus } from "react-native-feather";
import tw from "twrnc";

import ExploreScreen from "../containers/Explore";
import ArticleScreen from "../containers/Article";
import CreateArticleScreen from "../containers/CreateArticle";
import { useEffect } from "react";
import { Get } from "../services/apicall";
import context from "../services/context";

const Stack = createStackNavigator();

function ExploreStack({ navigation }) {
  const { token, setError } = useContext(context);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      const { data } = await Get("/articles", token);
      setArticles(data);
    } catch (error) {
      setError();
    }
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const { data } = await Get("/articles", token);
      setArticles(data);
    } catch (error) {
      setError();
    }
    setLoading(false);
  };

  const publishSuccessHandler = (article) => {
    setArticles([article, ...articles]);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
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
      >
        {(props) => (
          <ExploreScreen
            {...props}
            articles={articles}
            loading={loading}
            onRefresh={handleRefresh}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={({ route }) => ({ headerTitle: route.params.name })}
      />
      <Stack.Screen
        name="CreateArticle"
        options={{ headerTitle: "Nuevo Articulo" }}
      >
        {(props) => (
          <CreateArticleScreen
            {...props}
            onPublishSuccess={publishSuccessHandler}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default ExploreStack;
