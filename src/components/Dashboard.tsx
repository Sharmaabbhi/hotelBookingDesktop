import React, { useEffect, useState } from "react";
import DateRangeSelector from "./DateRangeSelector";
import TimeSeriesChart from "./TimeSeriesChart";
import CountryVisitorsChart from "./CountryVisitorsChart";
import SparklineChart from "./SparklineChart";
import { fetchBookingData } from "../data/fetchBookingData";

export type BookingData = {
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  adults: number;
  children: number;
  babies: number;
  country: string;
};

const Dashboard: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData[]>([]); 
  const [filteredData, setFilteredData] = useState<BookingData[]>([]); 
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]); 

  
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBookingData();
      setBookingData(data); 
      setFilteredData(data); 
    };

    loadData(); 
  }, []);

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const filteredBookings = bookingData.filter((booking) => {
        const bookingDate = new Date(
          `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
        );
        return bookingDate >= dateRange[0]! && bookingDate <= dateRange[1]!; });
      setFilteredData(filteredBookings); 
    } else {
      setFilteredData(bookingData); 
    }
  }, [dateRange, bookingData]);

  return (
    <div>
      <h1>Hotel Booking Dashboard</h1>

      {}
      <DateRangeSelector onDateChange={setDateRange} />

      {}
      <div className="chart-container">
        <h2>Time Series Overview</h2>
        <TimeSeriesChart data={filteredData} />
      </div>

      {}
      <div className="chart-container">
        <h2>Country-wise Visitors</h2>
        <CountryVisitorsChart data={filteredData} />
      </div>

      {}
      <div className="chart-container">
        <h2>Visitors (Adults)</h2>
        <SparklineChart data={filteredData} metric="adults" />
      </div>

      <div className="chart-container">
        <h2>Visitors (Children)</h2>
        <SparklineChart data={filteredData} metric="children" />
      </div>
      
      <div className="chart-container">
        <h2>Visitors (Babies)</h2>
        <SparklineChart data={filteredData} metric="babies" />
      </div>
    </div>
  );
};

export default Dashboard;
