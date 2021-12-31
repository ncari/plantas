import React from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

import Reminder from "../components/Reminder";
import useGetData from "../services/hooks/useGetData";

function Calendar() {
  const [reminders, setReminders, handleRefresh, refreshing] =
    useGetData("/reminders");

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={reminders}
        renderItem={({ item }) => <Reminder reminder={item} />}
        contentContainerStyle={tw`p-4`}
        ItemSeparatorComponent={() => <View style={tw`my-1`} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

export default Calendar;
