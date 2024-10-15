import Papa from "papaparse";
import hotelBookings from "./hotel_bookings_1000.csv"; 
import { BookingData } from "./BookingData"; 

export const fetchBookingData = async (): Promise<BookingData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(hotelBookings, {
      header: true,
      dynamicTyping: true, 
      complete: (results) => {
        const parsedData: BookingData[] = results.data.map((row: any) => ({
          arrival_date_year: row.arrival_date_year,
          arrival_date_month: row.arrival_date_month,
          arrival_date_day_of_month: row.arrival_date_day_of_month,
          adults: row.adults,
          children: row.children,
          babies: row.babies,
          country: row.country,
        }));
        resolve(parsedData);
      },
      error: (error) => reject(error),
    });
  });
};
