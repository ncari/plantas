import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Plus } from "react-native-feather";
import tw from "twrnc";

import CreateReminderModal from "../components/CreateReminderModal";
import Reminder from "../components/Reminder";
import useAxios from "../services/hooks/useAxios";
import useError from "../services/hooks/useError";
import useGetData from "../services/hooks/useGetData";

function PlantDetails({ route }) {
  const error = useError();
  const axios = useAxios();
  const { id } = route.params;
  const [reminders, setReminders, handleRefresh, refreshing] = useGetData(
    `/plants/${id}/reminders`
  );
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const RemindersListHeader = () => (
    <View style={tw`flex-row items-center mb-2`}>
      <Text>Recordatorios</Text>
      <Plus stroke={tw.color("black")} onPress={() => setModal(true)} />
    </View>
  );

  const handleNewReminder = async (remainder) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/plants/${id}/reminders`, remainder);
      setReminders([...reminders, data]);
      setModal(false);
    } catch (e) {
      error();
    }
    setLoading(false);
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
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
      {modal && (
        <CreateReminderModal
          onClose={() => setModal(false)}
          onNewReminder={handleNewReminder}
          loading={loading}
        />
      )}
    </View>
  );
}

export default PlantDetails;
