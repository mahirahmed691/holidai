import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Input, Text, Button, Searchbar } from 'react-native-elements'
import { useSignIn } from "@clerk/clerk-expo";
import { log } from "../logger";
import { RootStackScreenProps } from "../types";
import { OAuthButtons } from "../components/OAuth";
import { styles } from "../components/Styles";

export default function SignInScreen({
  navigation,
}: RootStackScreenProps<"SignIn">) {
  const { signIn, setSession, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setSession(completeSignIn.createdSessionId);
    } catch (err: any) {
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  const onSignUpPress = () => navigation.replace("SignUp");

  return (
    <View style={styles.signInContainer}>
      {/* <Logo/> */}
      <View>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../assets/images/logo.png')}
        ></Image>
      </View>

      <View style={styles.inputView}>
        <Input
          autoCapitalize="none"
          value={emailAddress}
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          placeholder="Email"
        />
      </View>

      <View style={styles.inputView}>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
        />
      </View>

      <View style={{ width: '80%' }}>
        <Button
          title="Sign In"
          type="solid"
          buttonStyle={{
            backgroundColor: "#111"
          }}
          onPress={onSignInPress}>
        </Button>
      </View>

      <View style={{ width: '80%' }}>
        <Text style={{ fontSize: 16, alignSelf: 'center', paddingTop: 20, paddingBottom: 20 }}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          type="solid"
          buttonStyle={{
            backgroundColor: "#111"
          }}
          onPress={onSignUpPress}>
        </Button>
      </View>

      <View>
        <Text style={{ fontSize: 16, alignSelf: 'center', paddingTop: 20 }}>Or</Text>
        <OAuthButtons />
      </View>
    </View>
  );
}
