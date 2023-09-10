import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import foodData from '../data/foodData';
import { Searchbar } from 'react-native-paper';

const FoodScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoodData, setFilteredFoodData] = useState([]);

  // Function to filter food data based on the search query
  const handleSearch = (query) => {
    const filteredData = foodData.filter((food) =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoodData(filteredData);
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Food"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={searchQuery ? filteredFoodData : foodData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodCuisine}>{item.cuisine}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  foodItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 0,
    marginTop:20,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodCuisine: {
    fontSize: 16,
    color: '#666',
  },
});

export default FoodScreen;
