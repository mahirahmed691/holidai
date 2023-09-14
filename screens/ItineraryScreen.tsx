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
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library

export default function ItineraryScreen({ navigation }) {
  const { signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const filterCities = (query) => {
    return popularCities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchQuery('');

    const selectedCityData = holidayData.find((data) => data.city === city);
    if (selectedCityData) {
      setItinerary(selectedCityData.suggestions);
    } else {
      setItinerary([]);
    }
  };

  const toggleFavorite = (item) => {
    const isFavorite = favorites.some((favItem) => favItem.name === item.name);

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favItem) => favItem.name !== item.name
      );
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const openInGoogleMaps = (item) => {
    const { name, location } = item;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${name}&query_place_id=${location}`;

    Linking.openURL(googleMapsUrl)
      .catch((err) => console.error('An error occurred: ', err));
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCity(null);
    setItinerary([]);
  };

  useEffect(() => {
    handleCitySelect('');
    AsyncStorage.getItem('favorites')
      .then((storedFavorites) => {
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      })
      .catch((error) => console.error('Error loading favorites:', error));
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites))
      .catch((error) => console.error('Error saving favorites:', error));
  }, [favorites]);

  const viewFavorites = () => {
    navigation.navigate('Favorites');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
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
        <TouchableOpacity
          onPress={clearSearch}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

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
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.suggestionItem}>
                {Array.isArray(item.images) && item.images.map((image, imageIndex) => (
                  <Image
                    key={imageIndex}
                    source={{ uri: image }}
                    style={styles.suggestionImage}
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
                      color="#FFD700"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      ) : favorites.length > 0 || (searchQuery === '' && favorites.length > 0) ? (
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
                  {/* <Text style={styles.openInMapsButtonText}>Open in Google Maps</Text> */}
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
    marginTop: 0,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
    marginTop: 50,
  },
  searchBar: {
    flex: 1,
    borderRadius: 10,
    marginRight: 8, // Add right margin for the clear button
  },
  clearButton: {
    // Keep this style as it is
  },
  clearButtonText: {
    fontSize: 16,
    color: '#007AFF',
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
    marginBottom: 150,
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
  viewFavoritesButton: {
    margin: 16,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 12,
  },
  viewFavoritesButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
