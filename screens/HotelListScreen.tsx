import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

export default function HotelList() {
  const [hotelData, setHotelData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencies, setCurrencies] = useState(['GBP']);

  const convertCurrency = (priceInGBP) => {
    if (exchangeRates[selectedCurrency]) {
      const convertedPrice = (priceInGBP * exchangeRates[selectedCurrency]).toFixed(2);
      return `${convertedPrice} ${selectedCurrency}`;
    }
    return `£${priceInGBP} ${selectedCurrency}`;
  };

  useEffect(() => {
    // Set up Axios to use the RapidAPI endpoint with the required headers
    const axiosInstance = axios.create({
      baseURL: 'https://hotels4.p.rapidapi.com',
      headers: {
        'X-RapidAPI-Key': '526f6bb878msh75578594898d51bp1adc7fjsn31e679e857d3',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    });
  
    // Fetch hotel data from the API
    axiosInstance
      .get('/v2/get-meta-data')
      .then((response) => {
        if (response.data && response.data.data) {
          setHotelData(response.data.data);
          setFilteredHotels(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching hotel data:', error);
      });


    // Fetch exchange rates from "exchangeratesapi.io"
    axios
      .get('https://openexchangerates.org/api/latest.json?app_id=7474faa22ff84a508d192c3f651d7334')
      .then((response) => {
        setExchangeRates(response.data.rates);
        const allCurrencies = Object.keys(response.data.rates);
        setCurrencies((prevCurrencies) => {
          const uniqueCurrencies = ['GBP', ...allCurrencies];
          return [...new Set(uniqueCurrencies)];
        });
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);

    const filtered = hotelData.filter((hotel) => {
      const locationMatches = hotel.location.toLowerCase().includes(text.toLowerCase());
      const nameMatches = hotel.name.toLowerCase().includes(text.toLowerCase());
      return locationMatches || nameMatches;
    });

    setFilteredHotels(filtered);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.hotelCard}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title style={styles.hotelName}>
          {item.name}
        </Title>
        <Paragraph style={styles.hotelLocation}>
          {item.location}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Chip icon="star" style={styles.hotelRating}>
          {item.rating}
        </Chip>
        <Chip icon="cash" style={styles.hotelPrice}>
          {convertCurrency(item.pricePerNight)}
        </Chip>
      </Card.Actions>
      <Card.Content>
        <Paragraph style={styles.hotelAmenities}>
          Amenities: {item.amenities.join(', ')}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Searchbar
            placeholder="Search Hotels"
            onChangeText={handleSearch}
            value={searchQuery}
            style={styles.hotelSearchBar}
          />
          <ModalDropdown
            options={currencies}
            defaultValue={`${selectedCurrency}`}
            onSelect={(index, value) => setSelectedCurrency(value)}
            textStyle={styles.pickerLabel}
            dropdownTextStyle={styles.modalText}
            dropdownStyle={styles.modalContent}
          />
        </View>
      </View>
      <ScrollView initialScrollIndex={0}>
        <FlatList
          data={filteredHotels}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.hotelCard}>
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content>
                <Title style={styles.hotelName}>
                  {item.name}
                </Title>
                <Paragraph style={styles.hotelLocation}>
                  {item.location}
                </Paragraph>
              </Card.Content>
              <Card.Actions>
                <Chip icon="star" style={styles.hotelRating}>
                  {item.rating}
                </Chip>
                <Chip icon="cash" style={styles.hotelPrice}>
                  {convertCurrency(item.pricePerNight)}
                </Chip>
              </Card.Actions>
              <Card.Content>
                <Paragraph style={styles.hotelAmenities}>
                  Amenities: {item.amenities.join(', ')}
                </Paragraph>
              </Card.Content>
            </Card>
          )}
        />
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 50, // Adjust the top padding to create space at the top

  }, 
  darkContainer: {
    flex: 1,
    backgroundColor: '#111',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding:0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  header2: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: '#fff',
    
  },
  header2Dark: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: '#111',
  },
  darkHeader: {
    backgroundColor: '#111',
  },
  hotelSearchBar: {
      flex:1,
      marginTop: 10,
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      elevation: 4,
      shadowColor: "#000",
      margin:10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
  },
  darkSearchBar: {
    color: '#fff',
  },
  hotelCard: {
    margin: 16,
    elevation: 200,
  
    backgroundColor: '#fff',
  },
  darkHotelCard: {
    backgroundColor: '#111',
    borderColor:'#fff'
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  darkHotelName: {
    color: '#fff',
  },
  hotelLocation: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight:'500'
  },
  darkHotelLocation: {
    color: '#fff',
  },
  hotelRating: {
    backgroundColor: '#fff',
    marginEnd: 2,
    alignSelf:'center',
  },
  darkHotelRating: {
    backgroundColor: '#111',
    color: '#fff',
    verticalAlign:'auto',
  },
  hotelPrice: {
    backgroundColor: '#678',
    color:'#fff'
  },
  darkHotelPrice: {
    backgroundColor: '#fff',
    color: '#fff',
  },
  hotelAmenities: {
    color: '#666',
  },
  darkHotelAmenities: {
    color: '#fff',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    width:"auto",
    marginTop:5,
    alignContent:'center',
    height:500,
  },
  modalText: {
    fontSize: 12,
    marginBottom: 1,
  },
  modalButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileView: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileText: {
    fontSize: 18,
    marginVertical: 10,
  },
});