import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Searchbar, Card } from 'react-native-paper'; 
import * as Location from 'expo-location';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import CityImages from '../components/CityImages';
import popularCities from '../data/cityData'; 
import foodData from '../data/foodData'; 
import { styles } from '../components/Styles';
import { useTheme } from '../themeContext';
import axios from 'axios';

export default function SafeMyProfileScreen() {
  const apiKey = '9a05000aa2177a72a4a01ddafd1bc03c';

  return (
    <>
      <SignedIn>
        <MyProfileScreen apiKey={apiKey} />
      </SignedIn>
      <SignedOut>
        <View style={styles.container}>
          <Text style={styles.unauthorizedText}>Unauthorized</Text>
        </View>
      </SignedOut>
    </>
  );
}

function WeatherDisplay({ temperature }) {
  const { darkMode, toggleDarkMode } = useTheme();
  function getWeatherIcon(temp) {
    let icon = null;

    if (temp < 10) {
      icon = <Icon name="snowflake" size={12} color="#00BFFF" />;
    } else if (temp >= 10 && temp < 25) {
      icon = <Icon name="sun" size={12} color="#FFD700" />;
    } else {
      icon = <Icon name="sun" size={12} color="#FF5733" />;
    }

    return icon;
  }

  return (
    <View style={[styles.weatherContainer, darkMode ? styles.weatherContainerDark : null]}>
      {temperature != null ? getWeatherIcon(temperature) : null}
      {temperature != null ? (
        <Text style={styles.temp}>{temperature}°C</Text>
      ) : null}
    </View>
  );
}

function MyProfileScreen({ apiKey }) {
  const { getToken, signOut } = useAuth();
  const { user } = useUser();
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false); // State to control showing suggestions
  const [selectedCity, setSelectedCity] = useState(''); // State to store the selected city
  const [filteredFoodData, setFilteredFoodData] = useState([]); // State to store filtered food data

  const onSignOutPress = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchWeatherData = async (cityName) => {
    if (cityName) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    } else {
      setWeatherData(null);
    }
  };

  const onSearch = (text) => {
    // Filter the popular cities based on the search text
    const filteredSuggestions = popularCities.filter((city) =>
      city.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5)); // Limit the list to 5 items

    // Show suggestions only when there is input text
    setShowSuggestions(text.length > 0);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchQuery(''); // Clear the search field
    setSuggestions([]); // Hide suggestions after selection
    fetchWeatherData(suggestion);

    // Filter food data based on the selected city
    const cityFoodData = foodData.filter((food) => food.city === suggestion);
    setFilteredFoodData(cityFoodData);
    setSelectedCity(suggestion);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          const cityName = response.data.name;
          setSearchQuery(cityName);
          fetchWeatherData(cityName);

          // Filter food data based on the selected city
          const cityFoodData = foodData.filter((food) => food.city === cityName);
          setFilteredFoodData(cityFoodData);
          setSelectedCity(cityName);
        })
        .catch((error) => {
          console.error('Error fetching location data:', error);
        });
    })();
  }, [apiKey]);

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : null]}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.profileImageUrl }}
          style={styles.profileImage}
        />
        <View style={[styles.header2, darkMode ? styles.header2Dark: null]}>
        <WeatherDisplay temperature={weatherData?.main.temp}/>
          <TouchableOpacity onPress={toggleDarkMode}>
          <Icon
            name={darkMode ? 'lightbulb' : 'moon'}
            type="font-awesome-5"
            color={darkMode ? '#fff' : '#000'}
            size={24}
          />
        </TouchableOpacity>
        </View>
        
      </View>

      <ScrollView>
        <Searchbar
          inputStyle={[styles.searchBar, darkMode ? styles.searchBarDark: null]}
          placeholder="Search City"
          onChangeText={(text) => {
            setSearchQuery(text);
            onSearch(text);
          }}
          value={searchQuery}
          onEndEditing={() => fetchWeatherData(selectedSuggestion || searchQuery)}
        />

        {showSuggestions && (
          <FlatList
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
                <View style={styles.suggestionItem}>
                  <Text style={styles.suggestionText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            style={styles.suggestionsList}
          />
        )}

        <CityImages city={selectedCity || searchQuery} />

        <View style={styles.foodListContainer}>
          <Text style={[styles.foodListHeader, darkMode ? styles.foodListHeaderDark: null]}>Food Places in {selectedCity}</Text>
          <FlatList
            data={filteredFoodData}
            renderItem={({ item }) => (
              <Card style={styles.foodCard}>
                <Card.Cover source={{ uri: item.url }} />
                <Card.Content>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodCuisine}>Cuisine: {item.cuisine}</Text>
                  <Text style={styles.foodAddress}>Address: {item.address}</Text>
                  <View>
                    
                    <View style={styles.ratingContainer}>
                      <View style={{flexDirection:'row'}}>
                        <Icon name="star" size={18} color="#111" />
                        <Text style={styles.foodName}> {item.rating}</Text>
                      </View>
                    <Text style={styles.foodName}>{item.price}</Text>
                    </View>
                  </View>
                  
                </Card.Content>
              </Card>
            )}
            keyExtractor={(item) => item.id.toString()} // Use toString() to ensure a string key
          />
        </View>
      </ScrollView>
    </View>
  );
}
