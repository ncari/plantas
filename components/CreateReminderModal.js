import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";

import PrimaryButton from "./Buttons/PrimaryButton";
import Input from "./Input";
import Modal from "./Modal";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const daysSpanish = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

function CreateReminderModal({ loading = false, onNewReminder, onClose }) {
  const [time, setTime] = useState(null);
  const [note, setNote] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [daysCheckboxes, setDaysCheckboxes] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const updateCheckboxes = (i, v) => {
    const checkboxesUpdated = [...daysCheckboxes];
    checkboxesUpdated[i] = v;
    setDaysCheckboxes(checkboxesUpdated);
  };

  const handleCreateReminder = () => {
    let daysToRemind = {};
    days.forEach((d, i) => {
      Object.assign(daysToRemind, { [d.toLowerCase()]: daysCheckboxes[i] });
    });

    const reminder = { time, note, ...daysToRemind };
    onNewReminder(reminder);
  };
  return (
    <Modal visible={true} onClose={onClose}>
      <View>
        <View style={tw`my-2`}>
          <View style={tw`flex-row items-center`}>
            {time && <Text style={tw`font-bold mr-2`}>{time}</Text>}
            <Pressable onPress={() => setShowTimePicker(true)}>
              <Text style={tw`text-xs text-blue-400`}>Elegir hora</Text>
            </Pressable>
          </View>
          {showTimePicker && (
            <DateTimePicker
              mode="time"
              value={new Date()}
              onChange={(e, t) => {
                if (t) setTime(`${t.getHours()}:${t.getMinutes()}`);
                setShowTimePicker(false);
              }}
            />
          )}
        </View>
        {daysCheckboxes.map((v, i) => (
          <View key={i} style={tw`flex-row justify-between items-center mt-2`}>
            <Text style={tw`text-xs`}>Recordarme el {daysSpanish[i]}</Text>
            <CheckBox
              value={daysCheckboxes[i]}
              onValueChange={(v) => updateCheckboxes(i, v)}
              style={tw`h-4 w-4`}
            />
          </View>
        ))}
        <Input
          label="Nota"
          multiline
          numberOfLines={2}
          textAlignVertical="top"
          value={note}
          onChangeText={setNote}
        />
        <PrimaryButton
          label="Guardar"
          style={tw`mt-4`}
          onPress={handleCreateReminder}
          disabled={loading}
        />
      </View>
    </Modal>
  );
}

export default CreateReminderModal;
