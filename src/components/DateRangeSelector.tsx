import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateRangeSelectorProps = {
  onDateChange: (dateRange: [Date | null, Date | null]) => void;
};

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateChange(dates); 
  };

  return (
    <DatePicker
      selected={startDate || undefined}    
      onChange={handleChange}
      startDate={startDate || undefined}   
      endDate={endDate || undefined}       
      selectsRange
      inline
    />
  );
};

export default DateRangeSelector;
