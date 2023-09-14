import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Searchbar, IconButton, Menu, Divider, Provider, List } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import foodData from '../data/foodData';
import Accordion from '../components/Accordion'
import { useNavigation } from '@react-navigation/native';


const FoodScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoodData, setFilteredFoodData] = useState(foodData);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const applyFilters = () => {
    const filteredData = foodData.filter((food) => {
      const nameMatch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const placeMatch = food.address.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = categoryFilter === 'All' || food.cuisine === categoryFilter;
      const locationMatch = locationFilter === 'All' || food.city === locationFilter;
      const priceMatch = priceFilter === 'All' || food.price === priceFilter;
      const ratingMatch = ratingFilter === 'All' || parseFloat(food.rating) >= parseFloat(ratingFilter);

      return (nameMatch || placeMatch) && categoryMatch && locationMatch && priceMatch && ratingMatch;
    });

    setFilteredFoodData(filteredData);
    closeMenu();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredData = foodData.filter((food) => {
      const nameMatch = food.name.toLowerCase().includes(query.toLowerCase());
      const placeMatch = food.address.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = categoryFilter === 'All' || food.cuisine === categoryFilter;
      const locationMatch = locationFilter === 'All' || food.city === locationFilter;
      const priceMatch = priceFilter === 'All' || food.price === priceFilter;
      const ratingMatch = ratingFilter === 'All' || parseFloat(food.rating) >= parseFloat(ratingFilter);

      return (nameMatch || placeMatch) && categoryMatch && locationMatch && priceMatch && ratingMatch;
    });

    setFilteredFoodData(filteredData);
  };

  const clearFilters = () => {
    setCategoryFilter('All');
    setPriceFilter('All');
    setRatingFilter('All');
    setLocationFilter('All');
    setSearchQuery('');
    setFilteredFoodData(foodData);
  };

  const sections = [
    {
      title: 'Categories',
      options: [
        { label: 'All Categories', value: 'All' },
        { label: 'Pan Asian', value: 'Pan Asian' },
        { label: 'Italian', value: 'Italian' },
        { label: 'Fast Food', value: 'Fast Food' },
        // Add more category options here
      ],
      selectedOption: categoryFilter,
      setSelectedOption: setCategoryFilter,
    },
    {
      title: 'Location',
      options: [
        { label: 'All Locations', value: 'All' },
        { label: 'Manchester', value: 'Manchester' },
        // Add more location options here
      ],
      selectedOption: locationFilter,
      setSelectedOption: setLocationFilter,
    },
    {
      title: 'Prices',
      options: [
        { label: 'All Prices', value: 'All' },
        { label: '£30-49', value: '£30-49' },
        { label: '£50-99', value: '£50-99' },
        { label: '£100+', value: '£100+' },
        // Add more price options here
      ],
      selectedOption: priceFilter,
      setSelectedOption: setPriceFilter,
    },
    {
      title: 'Ratings',
      options: [
        { label: 'All Ratings', value: 'All' },
        { label: '4.0+', value: '4.0' },
        { label: '4.5+', value: '4.5' },
        { label: '5.0+', value: '5.0' },
        // Add more rating options here
      ],
      selectedOption: ratingFilter,
      setSelectedOption: setRatingFilter,
    },
  ];

  return (
    <Provider>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search Food"
          value={searchQuery}
          onChangeText={handleSearch}
          onIconPress={applyFilters}
          style={styles.searchBar}
        />
        <View style={styles.filterSection}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="filter"
                color="#333"
                size={24}
                onPress={openMenu}
              />
            }
          >
            {sections.map((section, index) => (
              <Accordion
                key={index}
                title={section.title}
                selectedOption={section.selectedOption}
                setSelectedOption={section.setSelectedOption}
                options={section.options}
              />
            ))}
            <List.Item
              title="Apply Filters"
              left={() => <List.Icon icon="check-circle" />}
              onPress={applyFilters}
            />
          </Menu>
          <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
            <Icon
              name="close"
              color="#333"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredFoodData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.foodItem}
              onPress={() => {
                // Handle item press if needed
              }}
            >
              <Image
                source={{ uri: item.url }}
                style={styles.foodImage}
              />
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodCuisine}>{item.cuisine}</Text>
              <Text style={styles.foodLocation}>{item.city}</Text>
              <Text style={styles.foodAddress}>{item.address}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingIconContainer}>
                  <Icon name="star" size={18} color="#FFD700" solid style={styles.starIcon} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={styles.foodPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  searchBar: {
    marginBottom: 16,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clearButton: {
    padding: 8,
  },
  foodItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3, // Add elevation for a card-like effect
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    marginLeft: 8,
  },
  foodCuisine: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  foodLocation: {
    fontSize: 14,
    color: '#777',
    marginLeft: 8,
  },
  foodAddress: {
    fontSize: 14,
    color: '#777',
    marginLeft: 8,
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
  },
  ratingIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  foodPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default FoodScreen;
