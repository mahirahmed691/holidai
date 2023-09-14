import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import { styles } from '../components/Styles'

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'PGpCoTvE4PcjtQULpB8HOKhaIjJzJ7le';
const apiUrl = `https://opensky-network.org/api/states/all?api_key=${apiKey}`;

const FlightScreen = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setFlights(data.states || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const initialFiltered = flights.slice(0, 10);
    setFilteredFlights(initialFiltered);
  }, [flights]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = flights.filter((flight) =>
        flight[0].toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFlights(filtered);
    } else {
      const initialFiltered = flights.slice(0, 10);
      setFilteredFlights(initialFiltered);
    }
  }, [searchQuery, flights]);

  // Function to format Unix timestamp to a readable time
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString();
  };

  // Function to calculate flight duration
  const calculateDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return '';

    const durationInSeconds = arrivalTime - departureTime;
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);

    // Format hours and minutes
    const formattedHours = hours > 0 ? `${hours}h ` : '';
    const formattedMinutes = minutes > 0 ? `${minutes}m` : '';

    return formattedHours + formattedMinutes;
  };

  // Replace with a function that maps ICAO24 code to airport names
  const mapICAO24ToAirport = (icao24) => {
    // You need to implement this function based on your airport database/API
    // Return an object with departure and arrival airport names
    return {
      departureAirport: 'Departure Airport Name',
      arrivalAirport: 'Arrival Airport Name',
    };
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search by Flight ID"
        // onChangeText={(text) => setSearchQuery(text)}
        onChangeText={(text) => {
          setSearchQuery(text);
        }}
        value={searchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredFlights}
          keyExtractor={(flight) => flight[0]}
          renderItem={({ item, index }) => {
            const { departureAirport, arrivalAirport } = mapICAO24ToAirport(item[0]);
            return (
              <ListItem key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    Flight {index + 1}: ICAO24 - {item[0]}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    Departure Time - {formatTime(item[4])}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    Arrival Time - {formatTime(item[5])}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    Flight Duration - {calculateDuration(item[4], item[5])}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    Departure Country - {(item[2])}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          }}
        />
      )}
    </View>
  );
};

export default FlightScreen;
