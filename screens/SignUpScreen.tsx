import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { useSignUp } from '@clerk/clerk-expo';
import { log } from '../logger';
import { RootStackScreenProps } from '../types';
import { OAuthButtons } from '../components/OAuth';
import { styles } from '../components/Styles';

export default function SignUpScreen({
  navigation,
}: RootStackScreenProps<'SignUp'>) {
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    if (!firstName || !lastName || !emailAddress || !password) {
      // Handle input validation errors, e.g., show an error message
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // You can also add code here to handle a successful sign-up, e.g., navigate to a verification screen.
    } catch (error) {
      log('Error:', error);
      // Handle any errors that occur during sign-up, e.g., display an error message.
    }
  };

  const onSignInPress = () => {
    navigation.replace('SignIn');
  };

  return (
    <View style={styles.signInContainer}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />

      <View style={styles.inputView}>
        <Input
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          placeholder="First Name"
        />
      </View>

      <View style={styles.inputView}>
        <Input
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          placeholder="Last Name"
        />
      </View>

      <View style={styles.inputView}>
        <Input
          autoCapitalize="none"
          value={emailAddress}
          onChangeText={(email) => setEmailAddress(email)}
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          placeholder="Email"
        />
      </View>

      <View style={styles.inputView}>
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          secureTextEntry
          placeholder="Password"
        />
      </View>

      <Button
        title="Sign Up"
        type="solid"
        buttonStyle={styles.button}
        onPress={onSignUpPress}
        disabled={!isLoaded}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Have an account?</Text>
        <TouchableOpacity onPress={onSignInPress}>
          <Text style={styles.signInLink}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.oauthButtons}>
        <Text style={styles.footerText}>Or</Text>
        <OAuthButtons />
      </View>
    </View>
  );
}
