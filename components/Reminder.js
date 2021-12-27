import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const reminderDaysStr = (reminder) => {
  const daysAux = [];
  days.forEach((d) => {
    if (reminder[d]) daysAux.push(d);
  });
  return daysAux
    .slice(0, daysAux.length - 1)
    .reduceRight((p, c) => `${c}, ${p}`, daysAux[daysAux.length - 1]);
};

function Reminder({ small, reminder = {} }) {
  return (
    <View style={tw`py-4 rounded-lg bg-green-100`}>
      <View style={tw`flex-row`}>
        {!small && (
          <>
            <View style={tw`w-0.5 bg-green-600`} />
            <View style={tw`h-0.5 w-0.5 bg-green-600 self-center`} />
          </>
        )}
        <View style={tw`ml-4 py-2`}>
          <Text style={tw`text-xs font-bold`}>{reminder.time}</Text>
          {!small && (
            <Text style={tw`text-xs font-bold mt-2`}>Nombre de planta</Text>
          )}
          {small && reminderDaysStr(reminder) && (
            <Text>{reminderDaysStr(reminder)}</Text>
          )}

          <Text style={tw`mt-2 `}>{reminder.note}</Text>
        </View>
      </View>
    </View>
  );
}

export default Reminder;
