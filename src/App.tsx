import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './app.css';


interface BookingData {
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  adults: string;
  children: string;
  babies: string;
  country: string;
}

const App: React.FC = () => {
  
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings')
      .then(response => {
        setBookings(response.data);
        setFilteredBookings(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const filterByDateRange = () => {
    if (startDate && endDate) {
      const filtered = bookings.filter(booking => {
        const bookingDate = new Date(
          Number(booking.arrival_date_year),
          Number(booking.arrival_date_month) - 1,
          Number(booking.arrival_date_day_of_month)
        );
        return bookingDate >= startDate && bookingDate <= endDate;
      });
      setFilteredBookings(filtered);
    }
  };

  useEffect(() => {
    filterByDateRange();
  }, [startDate, endDate, bookings]);

 
  const getVisitorsPerDay = () => {
    const visitorsByDate = filteredBookings.reduce((acc: Record<string, number>, booking) => {
      const dateKey = `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`;
      const totalVisitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);

      acc[dateKey] = (acc[dateKey] || 0) + totalVisitors;
      return acc;
    }, {});

    return Object.entries(visitorsByDate).map(([date, visitors]) => ({ x: date, y: visitors }));
  };

  
  const getVisitorsPerCountry = () => {
    const visitorsByCountry = filteredBookings.reduce((acc: Record<string, number>, booking) => {
      const totalVisitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);
      acc[booking.country] = (acc[booking.country] || 0) + totalVisitors;
      return acc;
    }, {});

    return Object.entries(visitorsByCountry).map(([country, visitors]) => ({ x: country, y: visitors }));
  };

  return (
    <div className="container">
      <h1>Hotel Booking Dashboard</h1>

      {}
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          placeholderText="Select start date"
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          placeholderText="Select end date"
        />
      </div>

      {}
      <div className="chart-container">
        {}
        <div className="chart-box">
          <h2>Visitors Per Day</h2>
          <ApexCharts
            type="line"
            series={[{ name: 'Visitors', data: getVisitorsPerDay() }]}
            options={{
              chart: { id: 'visitors-per-day', zoom: { enabled: true } },
              xaxis: { type: 'category', title: { text: 'Date' } },
              yaxis: { title: { text: 'Number of Visitors' } },
            }}
            width="100%"
            height="300"
          />
        </div>

        {}
        <div className="chart-box">
          <h2>Visitors Per Country</h2>
          <ApexCharts
            type="bar"
            series={[{ name: 'Visitors', data: getVisitorsPerCountry() }]}
            options={{
              chart: { id: 'visitors-per-country' },
              xaxis: { type: 'category', title: { text: 'Country' } },
              yaxis: { title: { text: 'Number of Visitors' } },
            }}
            width="100%"
            height="300"
          />
        </div>
      </div>

      {}
      <div className="sparkline-container">
        {}
        <div className="sparkline-box">
          <h3>Adult Visitors</h3>
          <ApexCharts
            type="line"
            series={[{
              name: 'Adults',
              data: filteredBookings.map(booking => Number(booking.adults))
            }]}
            options={{
              chart: { sparkline: { enabled: true } },
              title: { text: `Total Adults: ${filteredBookings.reduce((acc, booking) => acc + Number(booking.adults), 0)}` },
              xaxis: { type: 'category' },
            }}
            width="100%"
            height="150"
          />
        </div>

        {}
        <div className="sparkline-box">
          <h3>Children Visitors</h3>
          <ApexCharts
            type="line"
            series={[{
              name: 'Children',
              data: filteredBookings.map(booking => Number(booking.children))
            }]}
            options={{
              chart: { sparkline: { enabled: true } },
              title: { text: `Total Children: ${filteredBookings.reduce((acc, booking) => acc + Number(booking.children), 0)}` },
              xaxis: { type: 'category' },
            }}
            width="100%"
            height="150"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
