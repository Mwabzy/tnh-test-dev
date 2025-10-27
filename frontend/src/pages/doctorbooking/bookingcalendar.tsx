import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarWithTimesProps {
  onDateSelected?: (date: Date) => void;
}

const CalendarWithTimes: React.FC<CalendarWithTimesProps> = ({
  onDateSelected,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Example hourly slots (customize as needed)
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`); // 8 AM to 8 PM

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateSelected?.(date);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Calendar onChange={(date) => handleDateChange(date as Date)} />
      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <h3>Available times on {selectedDate.toDateString()}</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {timeSlots.map((time) => (
              <button
                key={time}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarWithTimes;
