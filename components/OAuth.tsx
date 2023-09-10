import React from "react";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { styles } from "./Styles";
import { useWamUpBrowser } from "../hooks/useWarmUpBrowser";
import {SocialIcon} from 'react-native-elements'

WebBrowser.maybeCompleteAuthSession();

export function OAuthButtons() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWamUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
  
      <View>
        <SocialIcon
        style={{width:'100%', alignSelf:'center'}}
        title="Sign in with Google"
        type="google"
        button
        light
        onPress={onPress}
      />
      </View>
      

  );
}