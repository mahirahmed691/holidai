import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
});

function Logo() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={require('../assets/images/clerk-logo-dark.png')}
      />
    </View>
  );
}

export default Logo;
