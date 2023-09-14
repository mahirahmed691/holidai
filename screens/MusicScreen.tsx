import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Modal,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const MusicScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [artistSuggestions, setArtistSuggestions] = useState([]);
  const apiKey = 'YOUR_DEEZER_API_KEY';
  const [clearModalVisible, setClearModalVisible] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    loadFavoriteTracks();
  }, []);

  const saveFavoriteTracks = async () => {
    try {
      const jsonValue = JSON.stringify(favoriteTracks);
      await AsyncStorage.setItem('favoriteTracks', jsonValue);
    } catch (error) {
      console.error('Error saving favorite tracks:', error);
    }
  };

  const loadFavoriteTracks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favoriteTracks');
      if (jsonValue !== null) {
        const parsedValue = JSON.parse(jsonValue);
        setFavoriteTracks(parsedValue);
      }
    } catch (error) {
      console.error('Error loading favorite tracks:', error);
    }
  };

  const searchArtistsAndAlbums = () => {
    if (searchQuery) {
      const apiUrl = `https://api.deezer.com/search?q=${searchQuery}&apikey=${apiKey}`;
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data && response.data.data) {
            setSearchResults(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    } else {
      setSearchResults([]);
    }
  };

  const filterArtistSuggestions = (input) => {
    if (input) {
      const apiUrl = `https://api.deezer.com/search/artist?q=${input}&apikey=${apiKey}`;
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data && response.data.data) {
            setArtistSuggestions(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching artist suggestions:', error);
        });
    } else {
      setArtistSuggestions([]);
    }
  };

  const toggleFavoriteTrack = (track) => {
    const isFavorite = favoriteTracks.some((favTrack) => favTrack.id === track.id);

    if (isFavorite) {
      // If the track is already a favorite, remove it from the favorites
      const updatedFavorites = favoriteTracks.filter((favTrack) => favTrack.id !== track.id);
      setFavoriteTracks(updatedFavorites);
    } else {
      // If the track is not a favorite, add it to the favorites
      setFavoriteTracks([...favoriteTracks, track]);
    }

    saveFavoriteTracks();
  };

  const clearFavoriteTracks = () => {
    // Show the clear favorites confirmation modal
    setClearModalVisible(true);
  };

  const handleClearFavorites = () => {
    // Clear favorites and close the modal
    setFavoriteTracks([]);
    saveFavoriteTracks();
    setClearModalVisible(false);
  };

  const handleCancelClearFavorites = () => {
    // Close the modal without clearing favorites
    setClearModalVisible(false);
  };

  const openDeezer = (track) => {
    const deezerUrl = track.link;

    Linking.canOpenURL(deezerUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(deezerUrl)
            .then(() => {
              console.log(`Opened Deezer for track: ${track.title}`);
            })
            .catch((error) => {
              console.error('Error opening Deezer:', error);
            });
        } else {
          console.error('Deezer is not supported on this device.');
        }
      })
      .catch((error) => {
        console.error('Error checking if Deezer can be opened:', error);
      });
  };

  const renderSearchResultItem = ({ item }) => (
    <View style={styles.musicItem}>
      <Image source={{ uri: item.artist.picture_small }} style={styles.musicCover} />
      <View style={styles.musicDetails}>
        <Text style={styles.musicTitle}>{item.title}</Text>
        <Text style={styles.musicArtist}>Artist: {item.artist.name}</Text>
        <Text style={styles.musicLength}>Length: {formatTrackLength(item.duration)}</Text>
        <Text style={styles.musicAlbum}>Album: {item.album.title}</Text>
        <View style={styles.playButtons}>
          <TouchableOpacity onPress={() => openDeezer(item)} style={[styles.playButton, styles.deezerButton]}>
            <Icon name="play-circle" type="font-awesome" color="#FF2D55" size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleFavoriteTrack(item)} style={styles.heartButton}>
          <Icon name={favoriteTracks.some((favTrack) => favTrack.id === item.id) ? 'heart' : 'heart-o'} type="font-awesome" color="#FF5733" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const formatTrackLength = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for artists and albums..."
        onChangeText={(text) => {
          setSearchQuery(text);
          filterArtistSuggestions(text);
        }}
        value={searchQuery}
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchInput}
        searchIcon={{ color: '#1E1E1E' }}
        onSubmitEditing={searchArtistsAndAlbums}
      />

      {searchQuery === '' ? (
        <ScrollView style={styles.favoriteScrollView}>
          <Text style={styles.favouriteHeader}>Favorite Tracks</Text>
          {favoriteTracks.length > 0 ? (
            <FlatList
              data={favoriteTracks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSearchResultItem}
            />
          ) : (
            <Text style={styles.noFavouritesText}>No favorite tracks yet.</Text>
          )}
        </ScrollView>
      ) : (
        <View style={styles.resultsContainer}>
          {artistSuggestions.length > 0 && (
            <FlatList
              data={artistSuggestions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    setSearchQuery(item.name);
                    setArtistSuggestions([]);
                  }}
                >
                  <Text style={styles.suggestionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSearchResultItem}
            />
          ) : (
            <Text style={styles.noSearchResultsText}>No search results.</Text>
          )}
        </View>
      )}

      {/* Trash icon at the bottom (conditionally rendered) */}
      {favoriteTracks.length > 0 && searchQuery === '' && (
        <TouchableOpacity
          style={styles.trashIcon}
          onPress={clearFavoriteTracks}
        >
          <Icon name="trash" type="font-awesome" color="red" size={24} style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
      )}

      {/* Modal for Clearing Favorites */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={clearModalVisible}
        onRequestClose={() => setClearModalVisible(false)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Clear all favorite tracks?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.clearButton]}
                onPress={handleClearFavorites}
              >
                <Text style={styles.modalButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelClearFavorites}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  searchInput: {
    color: '#1E1E1E',
  },
  resultsContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  suggestionText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  musicCover: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  musicDetails: {
    flex: 1,
    marginLeft: 12,
    padding: 20,
  },
  musicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  musicArtist: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  musicLength: {
    fontSize: 14,
    color: '#999999',
  },
  musicAlbum: {
    fontSize: 14,
    color: '#999999',
  },
  playButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  playButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  deezerButton: {
    backgroundColor: '#fff', // Deezer blue color
  },
  appleMusicButton: {
    backgroundColor: '#fff',
  },
  heartButton: {
    position: 'absolute',
    right: 16,
    bottom: '10%',
    transform: [{ translateY: -12 }], // Adjust this value as needed
  },
  favoriteScrollView: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  clearButton: {
    backgroundColor: 'red',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favouriteHeader: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  noFavouritesText: {
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: '80%',
    fontWeight: 'bold',
    fontSize: 20,
  },
  noSearchResultsText: {
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  trashIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
  },
});

export default MusicScreen;
