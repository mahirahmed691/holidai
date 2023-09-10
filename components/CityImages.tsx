import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

function CityImages({ city }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Replace 'YOUR_UNSPLASH_API_KEY' with your actual Unsplash API key
        const apiKey = 'XPj7YdRR8wGP_B0H_r1MUJRxHN-OCgTCh72Yjkr7wvo';
        const apiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}&per_page=5`;
        const response = await axios.get(apiUrl);
        const data = response.data.results;
        const imageUrls = data.map((result) => result.urls.small);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (city) {
      fetchImages();
    }
  }, [city]);

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 40} // Adjust as needed
        autoplay
        autoplayInterval={3000}
        loop
        layout="default"
        inactiveSlideScale={0.95} // Scale of inactive slides
        inactiveSlideOpacity={0.7} // Opacity of inactive slides
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  card: {
    width: screenWidth - 40,
    height: 220,
    marginRight: 20,
    borderRadius: 10, // Add rounded corners
    shadowColor: '#000', // Add shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // Match the card's border radius
  },
});

export default CityImages;
