import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Appearance,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth, useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const systemTheme = Appearance.getColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  useEffect(() => {
    // Load the user's preferred theme mode from AsyncStorage
    loadThemeMode();
  }, []);

  const loadThemeMode = async () => {
    try {
      const themeMode = await AsyncStorage.getItem('themeMode');
      if (themeMode === 'dark') {
        setDarkModeEnabled(true);
      }
    } catch (error) {
      console.error('Error loading theme mode:', error);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleDarkMode = async () => {
    setDarkModeEnabled(!darkModeEnabled);

    try {
      // Store the user's preferred theme mode in AsyncStorage
      await AsyncStorage.setItem('themeMode', darkModeEnabled ? 'light' : 'dark');
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const { getToken, signOut } = useAuth();
  const { user } = useUser();

  const onSignOutPress = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkModeEnabled ? '#000000' : '#FFFFFF' },
      ]}
    >
      <Text
        style={[
          styles.header,
          { color: darkModeEnabled ? '#FFFFFF' : '#000000' },
        ]}
      >
        Settings
      </Text>

      {/* Profile View */}
      <View style={styles.profileView}>
        <Image
          source={{ uri: user.profileImageUrl }}
          style={styles.profileImage}
        />
        <Text
          style={[
            styles.profileText,
            { color: darkModeEnabled ? '#FFFFFF' : '#000000' },
          ]}
        >
          {user.fullName}
        </Text>
        <Text
          style={[
            styles.profileText,
            { color: darkModeEnabled ? '#FFFFFF' : '#000000' },
          ]}
        >
          {user.email}
        </Text>
      </View>

      <View style={styles.setting}>
        <Text
          style={[
            styles.settingText,
            { color: darkModeEnabled ? '#FFFFFF' : '#000000' },
          ]}
        >
          Enable Notifications
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: '#E5E5E5', true: '#1DB954' }}
          thumbColor={notificationsEnabled ? '#FFFFFF' : '#E5E5E5'}
        />
      </View>

      <View style={styles.setting}>
        <Text
          style={[
            styles.settingText,
            { color: darkModeEnabled ? '#FFFFFF' : '#000000' },
          ]}
        >
          Dark Mode
        </Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#E5E5E5', true: '#1DB954' }}
          thumbColor={darkModeEnabled ? '#FFFFFF' : '#E5E5E5'}
        />
      </View>
      <Button
        style={[
          styles.signOutButton,
          { backgroundColor: darkModeEnabled ? '#1DB954' : '#000000' },
        ]}
        labelStyle={styles.signOutButtonLabel}
        mode="contained"
        onPress={onSignOutPress}
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 10,
  },
  settingText: {
    fontSize: 18,
  },
  signOutButton: {
    marginTop: 20,
  },
  signOutButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Profile View Styles
  profileView: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileText: {
    fontSize: 18,
    marginVertical: 10,
  },
});
