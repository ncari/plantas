import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

import Reminder from "../components/Reminder";
import { Get } from "../services/apicall";
import context from "../services/context";

function Calendar() {
  const { token, setError } = useContext(context);
  const [reminders, setReminders] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await Get("/reminders", token);
      setReminders(data);
    } catch (err) {
      setError();
    }
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={reminders}
        renderItem={({ item }) => <Reminder small reminder={item} />}
        contentContainerStyle={tw`p-4`}
        ItemSeparatorComponent={() => <View style={tw`my-1`} />}
      />
    </View>
  );
}

export default Calendar;
