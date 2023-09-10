import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import popularCities from '../data/cityData'; // Replace with your city data
import holidayData from '../data/holidayData'; // Import your holiday data
import { Linking } from 'react-native'; // Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library

export default function ItineraryScreen() {
  const { signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]); // Array to store favorite places

  const filterCities = (query) => {
    return popularCities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchQuery('');

    // Find the holiday data for the selected city
    const selectedCityData = holidayData.find((data) => data.city === city);
    if (selectedCityData) {
      setItinerary(selectedCityData.suggestions);
    } else {
      setItinerary([]); // Clear the itinerary
    }
  };

  const toggleFavorite = (item) => {
    // Check if the item is already in favorites
    const isFavorite = favorites.some((favItem) => favItem.name === item.name);

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        (favItem) => favItem.name !== item.name
      );
      setFavorites(updatedFavorites);
    } else {
      // Add to favorites
      setFavorites([...favorites, item]);
    }
  };

  const openInGoogleMaps = (item) => {
    const { name, location } = item; // Assuming 'location' contains latitude and longitude

    // Construct the Google Maps URL with the location information
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${name}&query_place_id=${location}`;

    // Open the URL using Linking
    Linking.openURL(googleMapsUrl)
      .catch((err) => console.error('An error occurred: ', err));
  };

  useEffect(() => {
    // Fetch data for Dubai when the component mounts (you can change this if needed)
    handleCitySelect('');

    // Load favorites from AsyncStorage when the component mounts
    AsyncStorage.getItem('favorites')
      .then((storedFavorites) => {
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      })
      .catch((error) => console.error('Error loading favorites:', error));
  }, []);

  // Update favorites in AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites))
      .catch((error) => console.error('Error saving favorites:', error));
  }, [favorites]);

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search City"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          if (selectedCity) {
            setSelectedCity(null);
            setItinerary([]);
          }
        }}
      />

      {searchQuery && (
        <FlatList
          data={filterCities(searchQuery)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.autocompleteItem}
              onPress={() => handleCitySelect(item)}
            >
              <Text style={styles.autocompleteText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.autocompleteList}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      ) : selectedCity ? (
        <View style={styles.itineraryContainer}>
          <Text style={styles.itineraryHeader}>Holiday Suggestions for {selectedCity}:</Text>
          <FlatList
            data={itinerary}
            keyExtractor={(item) => item.name} // Use the suggestion name as the key
            renderItem={({ item }) => (
              <View style={styles.suggestionItem}>
                {Array.isArray(item.images) && item.images.map((image, imageIndex) => (
                  <Image
                    key={imageIndex}
                    source={{ uri: image }}
                    style={styles.suggestionImage} // Apply your image styles here
                    onError={() => console.log('Image failed to load')}
                  />
                ))}
                <View style={styles.suggestionDetails}>
                  <Text style={styles.suggestionText}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => openInGoogleMaps(item)}
                    style={styles.openInMapsButton}
                  >
                    <Icon name="map-marker" size={30} color="#007AFF" />
                    <Text style={styles.openInMapsButtonText}>Open in Google Maps</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(item)}
                    style={styles.favoriteButton}
                  >
                    <Icon
                      name={favorites.some((favItem) => favItem.name === item.name) ? 'star' : 'star-o'}
                      size={30}
                      color="#FFD700" // Yellow color for the star
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      ) : favorites.length > 0 ? ( // Display favorites when the search bar is empty
        <ScrollView style={styles.favoritesContainer}>
          <Text style={styles.favoritesHeader}>Favorite Places:</Text>
          {favorites.map((favItem, index) => (
            <View key={index} style={styles.suggestionItem}>
              {Array.isArray(favItem.images) &&
                favItem.images.map((image, imageIndex) => (
                  <Image
                    key={imageIndex}
                    source={{ uri: image }}
                    style={styles.suggestionImage}
                    onError={() => console.log('Image failed to load')}
                  />
                ))}
              <View style={styles.suggestionDetails}>
                <Text style={styles.suggestionText}>{favItem.name}</Text>
                <TouchableOpacity
                  onPress={() => openInGoogleMaps(favItem)}
                  style={styles.openInMapsButton}
                >
                  <Icon name="map-marker" size={30} color="#007AFF" />
                  <Text style={styles.openInMapsButtonText}>Open in Google Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleFavorite(favItem)}
                  style={styles.favoriteButton}
                >
                  <Icon
                    name={favorites.some((item) => item.name === favItem.name) ? 'star' : 'star-o'}
                    size={30}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    margin: 16,
    borderRadius: 10,
  },
  autocompleteItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  autocompleteText: {
    fontSize: 18,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  itineraryContainer: {
    margin: 16,
    flexGrow: 1,
    marginBottom:150
  },
  itineraryHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  suggestionItem: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
  },
  suggestionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  suggestionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionText: {
    flex: 1,
    fontSize: 20,
  },
  openInMapsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openInMapsButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#007AFF',
  },
  favoriteButton: {
    marginLeft: 16,
  },
  favoritesContainer: {
    flex: 1,
    margin: 16,
  },
  favoritesHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
