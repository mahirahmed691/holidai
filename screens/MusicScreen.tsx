import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { Button, Icon } from "react-native-elements";
import { Searchbar } from 'react-native-paper';
import { Linking } from 'react-native';
import { musicData } from '../data/musicData';
import { useTheme } from '../themeContext';

const MusicScreen = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [musicList, setMusicList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMusicList(musicData);
  }, []);

  const refreshData = () => {
    setRefreshing(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredMusicList = musicData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setMusicList(filteredMusicList);
  };

  const openInSpotify = (trackURL) => {
    Linking.openURL(trackURL);
  };

  const renderMusicItem = ({ item }) => (
    <TouchableOpacity style={darkMode ? styles.darkMusicItem : styles.musicItem}>
      <Image source={{ uri: item.images[0]?.url }} style={styles.musicCover} />
      <View style={styles.musicDetails}>
        <Text style={darkMode ? styles.darkMusicTitle : styles.musicTitle}>
          {item.name}
        </Text>
        <Text style={darkMode ? styles.darkMusicArtist : styles.musicArtist}>
          {item.genres.join(', ')}
        </Text>
        <Text style={darkMode ? styles.darkMusicTrack : styles.musicTrack}>
          {item.tracks[0]?.trackName}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={darkMode ? styles.darkSpotifyButton : styles.spotifyButton}
            onPress={() => openInSpotify(item.tracks[0]?.trackURL)}
          >
            <Icon name="spotify" type="font-awesome-5" color="#fff" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#000' : '#f0f0f0' },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={darkMode ? styles.darkHeader : styles.header}>Music Library</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Icon
            name={darkMode ? 'lightbulb' : 'moon'}
            type="font-awesome-5"
            color={darkMode ? '#fff' : '#000'}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <Searchbar
        placeholder="Search for artists..."
        onChangeText={handleSearch}
        value={searchQuery}
        inputStyle={styles.searchBarInputStyle}
      />

      <FlatList
        data={musicList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMusicItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshData}
            colors={darkMode ? ['#1DB954'] : ['#9888ff']}
            tintColor={darkMode ? '#1DB954' : '#9888ff'}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  darkHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#122',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  darkMusicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#122',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  musicCover: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  musicDetails: {
    flex: 1,
    marginLeft: 12,
  },
  musicTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  darkMusicTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  musicArtist: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  darkMusicArtist: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 4,
  },
  musicTrack: {
    fontSize: 14,
    color: '#888',
    fontWeight: '700',
    marginTop: 4,
  },
  darkMusicTrack: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '700',
    marginTop: 4,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  searchBarInputStyle: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    padding: 0,
    borderRadius: 50,
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  darkSpotifyButton: {
    backgroundColor: '#333',
    padding: 0,
    borderRadius: 50,
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});

export default MusicScreen;
