import Papa from 'papaparse';

export interface BookingData {
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

export const fetchBookingData = async (): Promise<BookingData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse('/path/to/hotel_bookings_1000.csv', {
      header: true,
      download: true,
      complete: (result) => {
        resolve(result.data as BookingData[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
