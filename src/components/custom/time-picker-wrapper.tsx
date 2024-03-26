"use client";

import * as React from "react";
import { TimePicker } from "./TimePicker";


export function TimePickerWrapper() {
  const [date, setDate] = React.useState<Date>();
  return <TimePicker setDate={setDate} date={date} />;
}