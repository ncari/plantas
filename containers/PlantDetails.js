import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Plus } from "react-native-feather";
import tw from "twrnc";

import CreateReminderModal from "../components/CreateReminderModal";
import Reminder from "../components/Reminder";
import { Get, Post } from "../services/apicall";
import context from "../services/context";

function PlantDetails({ route }) {
  const { token, setError } = useContext(context);
  const { id } = route.params;
  const [reminders, setReminders] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(async () => {
    try {
      const { data } = await Get(`/plants/${id}/reminders`, token);
      setReminders(data);
    } catch (e) {
      setError();
    }
  }, []);

  const RemindersListHeader = () => (
    <View style={tw`flex-row items-center mb-2`}>
      <Text>Reminders</Text>
      <Plus stroke={tw.color("black")} onPress={() => setModal(true)} />
    </View>
  );

  const handleNewReminder = async (remainder) => {
    // make api call
    try {
      const { data } = await Post(`/plants/${id}/reminders`, remainder, token);
      setReminders([...reminders, data]);
      setModal(false);
    } catch (e) {
      setError();
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Reminders */}
      <FlatList
        ListHeaderComponent={RemindersListHeader}
        contentContainerStyle={tw`p-4`}
        data={reminders}
        renderItem={({ item }) => <Reminder small reminder={item} />}
        ItemSeparatorComponent={() => <View style={tw`my-1`} />}
      />
      {modal && (
        <CreateReminderModal
          onClose={() => setModal(false)}
          onNewReminder={handleNewReminder}
        />
      )}
    </View>
  );
}

export default PlantDetails;
