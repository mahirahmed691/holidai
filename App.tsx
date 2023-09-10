import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";
import { ThemeProvider } from './themeContext'; // Import the ThemeProvider

const publishableKey = "pk_test_cmVndWxhci1hZGRlci05MC5jbGVyay5hY2NvdW50cy5kZXYk";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return ( 
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <SafeAreaProvider>
          <ThemeProvider initialDarkMode={false}>
            <Navigation />          
            <StatusBar style="auto" />
            </ThemeProvider>
          </SafeAreaProvider>         
        </ClerkProvider>
      
    );
  }
}
