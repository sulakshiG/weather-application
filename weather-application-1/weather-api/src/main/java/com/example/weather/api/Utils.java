package com.example.weather.api;

import java.text.SimpleDateFormat;

public class Utils {

    // Method to convert a timestamp to a readable date format
    public static String convertTimestampToReadableDate(long timestamp) {

        // Creating SimpleDateFormat instances for time and date formatting
        SimpleDateFormat timeFormatter = new SimpleDateFormat("h.mma"); // Format: 12-hour time with AM/PM
        SimpleDateFormat dateFormatter = new SimpleDateFormat("MMM dd"); // Format: Month (abbreviation) followed by day of the month

        // Formatting timestamp to time and date strings
        String formattedTime = timeFormatter.format(timestamp).toLowerCase(); // Converting time to lowercase
        String formattedDate = dateFormatter.format(timestamp);

        // Concatenating formatted time and date
        return formattedTime + ", " + formattedDate;
    }
}
