// ItineraryList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ItineraryList({ city }) {
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    // Fetch itinerary data based on the city (You need to implement this)
    fetchItineraryData(city);
  }, [city]);

  const fetchItineraryData = async (city) => {
    // Implement a function to fetch itinerary data based on the city
    // You can use axios or any other method to retrieve the data
    // For example:
    const apiUrl = `https://api.example.com/itinerary?city=${city}`;

    try {
      const response = await axios.get(apiUrl);
      setItinerary(response.data);
    } catch (error) {
      console.error('Error fetching itinerary data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itinerary for {city}</Text>
      <FlatList
        data={itinerary}
        renderItem={({ item }) => (
          <View style={styles.itineraryItem}>
            <Text>{item.activity}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itineraryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
