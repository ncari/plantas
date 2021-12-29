import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Book, Grid, Home, User } from "react-native-feather";
import tw from "twrnc";

import HomeStack from "./Home";
import ExploreStack from "./Explore";
import ProfileStack from "./Profile";
import MyPlantsStack from "./MyPlants";

const tabBarIconColor = (focused) => {
  return tw.color(focused ? "black" : "gray-400");
};

const Tab = createBottomTabNavigator();

const HomeTab = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ focused }) => <Home stroke={tabBarIconColor(focused)} />,
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreStack}
      options={{
        tabBarIcon: ({ focused }) => <Grid stroke={tabBarIconColor(focused)} />,
      }}
    />
    <Tab.Screen
      name="My Plants"
      component={MyPlantsStack}
      options={{
        tabBarIcon: ({ focused }) => <Book stroke={tabBarIconColor(focused)} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        tabBarIcon: ({ focused }) => <User stroke={tabBarIconColor(focused)} />,
      }}
    />
  </Tab.Navigator>
);

export default HomeTab;
